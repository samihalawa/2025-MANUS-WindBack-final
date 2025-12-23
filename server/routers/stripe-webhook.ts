import { Request, Response } from "express";
import Stripe from "stripe";
import { ENV } from "../_core/env";
import { getDb } from "../db";
import { subscriptions } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

let stripe: any = null;
if (ENV.stripeSecretKey) {
  stripe = new Stripe(ENV.stripeSecretKey);
}

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    return res.status(400).send("Missing stripe-signature header");
  }

  if (!ENV.stripeWebhookSecret) {
    return res.status(500).send("Webhook secret not configured");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      ENV.stripeWebhookSecret
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : "Unknown error"}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        break;
      }

      default:
    }

    res.json({ received: true });
  } catch (error) {
    res.status(500).send("Webhook processing failed");
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {

  if (session.mode !== "subscription") {
    return;
  }

  const userId = session.metadata?.userId;
  if (!userId) {
    return;
  }

  const subscriptionId = session.subscription as string;
  if (!subscriptionId) {
    return;
  }

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    await handleSubscriptionUpdate(subscription, parseInt(userId));
  } catch (error) {
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription & { current_period_start?: number; current_period_end?: number }, userId?: number) {
  const db = await getDb();
  if (!db) {
    return;
  }

  const customerId = subscription.customer as string;
  const subscriptionId = subscription.id;
  const priceId = subscription.items.data[0]?.price.id || "";
  const status = subscription.status;

  const userIdToUse = userId || (subscription.metadata?.userId ? parseInt(subscription.metadata.userId) : null);

  if (!userIdToUse) {
    return;
  }

  try {
    const existing = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.stripeSubscriptionId, subscriptionId))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(subscriptions)
        .set({
          status: status as any,
          stripePriceId: priceId,
          currentPeriodStart: new Date((subscription.current_period_start || 0) * 1000),
          currentPeriodEnd: new Date((subscription.current_period_end || 0) * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end ? 1 : 0,
        })
        .where(eq(subscriptions.stripeSubscriptionId, subscriptionId));

    } else {
      await db.insert(subscriptions).values({
        userId: userIdToUse,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        stripePriceId: priceId,
        status: status as any,
                currentPeriodStart: new Date((subscription.current_period_start || 0) * 1000),
        currentPeriodEnd: new Date((subscription.current_period_end || 0) * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end ? 1 : 0,
      });

    }
  } catch (error) {
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const db = await getDb();
  if (!db) {
    return;
  }

  try {
    await db
      .update(subscriptions)
      .set({
        status: "canceled" as any,
      })
      .where(eq(subscriptions.stripeSubscriptionId, subscription.id));

  } catch (error) {
  }
}

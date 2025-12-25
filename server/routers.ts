import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { stripeRouter } from "./routers/stripe";
import { newsletterRouter } from "./routers/newsletter";
import { contactRouter } from "./routers/contact";
import { sumupRouter } from "./routers/sumup";
import { dashboardRouter } from "./routers/dashboard";
import { stripeMultiTenantRouter } from "./routers/stripe-multi-tenant";
import { organizationsRouter } from "./routers/organizations";
import { membersRouter } from "./routers/members";
import { subscriptionsRouter } from "./routers/subscriptions";
import { limitlessRouter } from "./routers/limitless";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  stripe: stripeRouter,
  stripeMultiTenant: stripeMultiTenantRouter,
  newsletter: newsletterRouter,
  contact: contactRouter,
  sumup: sumupRouter,
  dashboard: dashboardRouter,
  organizations: organizationsRouter,
  members: membersRouter,
  subscriptions: subscriptionsRouter,
  limitless: limitlessRouter,
});

export type AppRouter = typeof appRouter;

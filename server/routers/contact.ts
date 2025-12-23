import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { contactSubmissions } from "../../drizzle/schema";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  email: z.string().email("Invalid email address").max(320),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export const contactRouter = router({
  submit: publicProcedure
    .input(contactSchema)
    .mutation(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        await db.insert(contactSubmissions).values({
          name: input.name,
          email: input.email,
          message: input.message,
          status: "new",
        });


        return {
          success: true,
          message: "Thank you for your message. We'll get back to you soon!",
        };
      } catch (error) {
        throw new Error("Failed to submit contact form. Please try again.");
      }
    }),
});

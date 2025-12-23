import { describe, it, expect } from "vitest";
import { stripeRouter } from "./stripe";

describe("stripeRouter", () => {
  describe("getSubscriptionStatus", () => {
    it("should return subscription status for authenticated user", async () => {
      const mockUser = {
        id: 1,
        openId: "test-user",
        email: "test@example.com",
        name: "Test User",
        loginMethod: "manus",
        role: "user" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date()
      };

      const ctx = {
        user: mockUser,
        req: {} as any,
        res: {} as any
      };

      const caller = stripeRouter.createCaller(ctx);
      const status = await caller.getSubscriptionStatus();

      expect(status).toBeDefined();
      expect(status?.status).toBe("free");
      expect(status?.plan).toBe("Free");
    });

    it("should handle subscription status query", async () => {
      const mockUser = {
        id: 1,
        openId: "test-user",
        email: "test@example.com",
        name: "Test User",
        loginMethod: "manus",
        role: "user" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date()
      };

      const ctx = {
        user: mockUser,
        req: {} as any,
        res: {} as any
      };

      const caller = stripeRouter.createCaller(ctx);
      const status = await caller.getSubscriptionStatus();

      expect(status).toBeDefined();
      expect(status?.status).toBe("free");
      expect(status?.plan).toBe("Free");
    });
  });
});

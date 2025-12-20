import { describe, it, expect } from "vitest";
import { newsletterRouter } from "./newsletter";

describe("Newsletter Router", () => {
  it("should have subscribe endpoint", () => {
    expect(newsletterRouter).toBeDefined();
    expect(newsletterRouter._def.procedures.subscribe).toBeDefined();
  });

  it("should have unsubscribe endpoint", () => {
    expect(newsletterRouter).toBeDefined();
    expect(newsletterRouter._def.procedures.unsubscribe).toBeDefined();
  });

  it("subscribe endpoint should validate email", async () => {
    const caller = newsletterRouter.createCaller({} as any);
    
    await expect(
      caller.subscribe({ email: "invalid-email", source: "test" })
    ).rejects.toThrow();
  });

  it("subscribe endpoint should accept valid email", async () => {
    const caller = newsletterRouter.createCaller({} as any);
    
    const result = await caller.subscribe({
      email: "test@example.com",
      source: "test"
    });

    expect(result.success).toBe(true);
    expect(result.email).toBe("test@example.com");
  });

  it("unsubscribe endpoint should accept valid email", async () => {
    const caller = newsletterRouter.createCaller({} as any);
    
    const result = await caller.unsubscribe({
      email: "test@example.com"
    });

    expect(result.success).toBe(true);
  });
});

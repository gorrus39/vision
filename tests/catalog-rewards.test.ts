import { setup, fetch } from "@nuxt/test-utils";
import { describe, it, expect } from "vitest";

describe("login page", async () => {
  await setup();

  it("displays the email and password fields", async () => {
    const res = await fetch("/api/items");
    const data = await res.json();
    console.log("API response:", data); // Лог ответа от API
    expect(data).toEqual([]);
  });
});

import { test, expect } from "vitest";
import { query } from "../../src/infra/database";

test("Database Connection & Query Function", async () => {
  const respose = await query("SELECT 1 + 1 as result");

  expect(respose?.rows[0].result).toBe(2);
});

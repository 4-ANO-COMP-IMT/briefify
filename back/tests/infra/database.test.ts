import { test, expect } from "vitest";
import database from "../../src/infra/database";

test("Database Connection & Query Function", async () => {
  const respose = await database.query("SELECT 1 + 1 as result");

  expect(respose?.rows[0].result).toBe(2);
});

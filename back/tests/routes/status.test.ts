import { test, expect } from "vitest";

test("/status endpoint", async () => {
  const response = await fetch("http://localhost:3000/status");
  const resposeBody = await response.json();

  expect(response.status).toBe(200);
  expect(resposeBody.updated_at).toBeDefined();

  const parsedDate = new Date(resposeBody.updated_at).toISOString();
  expect(resposeBody.updated_at).toEqual(parsedDate);

  expect(resposeBody.dependencies.database.version).toEqual("16.3");
  expect(resposeBody.dependencies.database.max_connections).toEqual(100);
  expect(resposeBody.dependencies.database.open_connections).toEqual(1);
});

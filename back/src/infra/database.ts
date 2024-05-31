import "dotenv/config";
import { Client } from "pg";

export async function query(queryComand: string, values?: string[]) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT ?? "5432"),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    await client.connect();

    if (values) {
      const response = await client.query(queryComand, values);
      return response;
    } else {
      const response = await client.query(queryComand);
      return response;
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

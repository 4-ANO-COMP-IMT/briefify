import { Request, Response } from "express";
import database from "src/infra/database";
import { z } from "zod";

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const signIn = async (req: Request, res: Response) => {
  try {
    const bodyValidated = SignInSchema.parse(req.body);
    const response = await database.query(
      `SELECT id, name, email, company, role FROM "User" WHERE email = $1 AND password = $2`,
      [bodyValidated.email, bodyValidated.password],
    );

    const user = response?.rows[0];

    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default { signIn };

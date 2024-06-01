import { Request, Response } from "express";
import database from "src/infra/database";
import { z } from "zod";
import bcrypt from "bcrypt";

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const signIn = async (req: Request, res: Response) => {
  try {
    const bodyValidated = SignInSchema.parse(req.body);
    const response = await database.query(
      `SELECT * FROM "User" WHERE email = $1`,
      [bodyValidated.email],
    );

    const user = response?.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid email." });
    }

    const passwordMatch = await bcrypt.compare(
      bodyValidated.password,
      user.password,
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password." });
    }

    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      company: user.company,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default { signIn };

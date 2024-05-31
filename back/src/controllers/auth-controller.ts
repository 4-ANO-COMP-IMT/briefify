import { Request, Response } from "express";
import database from "src/infra/database";
import { z } from "zod";
import { v4 as uuid } from "uuid";

const SignUpSchema = z.object({
  name: z.string().min(3),
  cpf: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  company: z.string().optional(),
  role: z.string().optional(),
});

const signUpUser = async (req: Request, res: Response) => {
  try {
    const bodyValidated = SignUpSchema.parse(req.body);
    const response = await database.query(
      `INSERT INTO "User" (id, name, cpf, email, password, company, role)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, name, email, company, role;`,
      [
        uuid(),
        bodyValidated.name,
        bodyValidated.cpf,
        bodyValidated.email,
        bodyValidated.password,
        bodyValidated.company || null,
        bodyValidated.role || null,
      ],
    );
    console.log(response);
    const createdUser = response?.rows[0];
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default { signUpUser };

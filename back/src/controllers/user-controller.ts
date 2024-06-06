import { Request, Response } from "express";
import database from "src/infra/database";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const response = await database.query(`SELECT * FROM "User";`);

    const users = response?.rows;
    res.status(201).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { getAllUsers };

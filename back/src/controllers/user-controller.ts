import { Request, Response } from "express";
import database from "src/infra/database";
import { z } from "zod";

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

const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const response = await database.query(
      `SELECT * FROM "User" WHERE id = $1`,
      [userId], // what am i doing wrong here?
    );

    const user = response?.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid id." });
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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { getAllUsers, getUserById };

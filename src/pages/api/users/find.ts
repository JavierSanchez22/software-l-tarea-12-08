import { NextApiRequest, NextApiResponse } from "next";
import { SupabaseUserRepository } from "@/infrastructure/SupabaseUserRepository";
import { UserFinder } from "@/application/UserFinder";

const repository = new SupabaseUserRepository();
const finder = new UserFinder(repository);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid id" });
  }

  const user = await finder.run(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
}

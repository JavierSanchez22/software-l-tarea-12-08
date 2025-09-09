import { NextApiRequest, NextApiResponse } from "next";
import { SupabaseUserRepository } from "@/infrastructure/SupabaseUserRepository";
import { UserCreator } from "@/application/UserCreator";
import { User } from "@/domain/User";

const repository = new SupabaseUserRepository();
const creator = new UserCreator(repository);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id, email, dpi, name, age, valid } = req.body;

  const user = User.create(id, email, dpi, name, age, valid);
  await creator.run(user);

  res.status(201).json({ message: "User created", user: user.toDto() });
}

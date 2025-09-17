import { NextApiRequest, NextApiResponse } from "next";
import { SupabaseUserRepository } from "@/infrastructure/SupabaseUserRepository";
import { UserFinder } from "@/application/UserFinder";

const repository = new SupabaseUserRepository();
const finder = new UserFinder(repository);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { email } = req.query;
        
        if (!email || typeof email !== "string") {
            return res.status(400).json({ error: "Invalid email" });
        }

        const user = await finder.run(email);
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error finding user:", error);
        const errorMessage = error instanceof Error ? error.message : "Internal server error";
        res.status(500).json({ error: errorMessage });
    }
}
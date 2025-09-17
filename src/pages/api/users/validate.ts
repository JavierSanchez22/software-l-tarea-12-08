import { NextApiRequest, NextApiResponse } from "next";
import { SupabaseUserRepository } from "@/infrastructure/SupabaseUserRepository";
import { UserValidator } from "@/application/UserValidator";
import { EmailNotificationSender } from "@/infrastructure/interfaces/EmailNotificationSender";

const repository = new SupabaseUserRepository();
const notificationSender = new EmailNotificationSender();
const validator = new UserValidator(repository, notificationSender);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Invalid parameters" });
        }

        await validator.run(id);

        res.status(200).json({ message: "User validation processed successfully" });
    } catch (error) {
        console.error("Error validating user:", error);
        const errorMessage = error instanceof Error ? error.message : "Internal server error";
        res.status(500).json({ error: errorMessage });
    }
}
import { NextApiRequest, NextApiResponse } from "next";
import { InMemoryBookRepository } from "@/infrastructure/InMemoryBookRepository";
import { BookSearcher } from "@/application/BookSearcher";
import { SupabaseUserRepository } from "@/infrastructure/SupabaseUserRepository";
import { UserFinder } from "@/application/UserFinder";

const bookRepository = new InMemoryBookRepository();
const userRepository = new SupabaseUserRepository();
const userFinder = new UserFinder(userRepository);
const searcher = new BookSearcher(bookRepository, userFinder);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { email } = req.query;
        
        if (!email || typeof email !== "string") {
            return res.status(400).json({ error: "Email parameter required" });
        }

        const books = await searcher.run(email);
        res.status(200).json(books);
    } catch (error) {
        console.error("Error searching books:", error);
        const errorMessage = error instanceof Error ? error.message : "Internal server error";
        res.status(500).json({ error: errorMessage });
    }
}
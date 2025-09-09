import { NextApiRequest, NextApiResponse } from "next";
import { InMemoryBookRepository } from "@/infrastructure/InMemoryBookRepository";
import { BookSearcher } from "@/application/BookSearcher";

const repository = new InMemoryBookRepository();
const searcher = new BookSearcher(repository);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const books = await searcher.run();
  res.status(200).json(books);
}

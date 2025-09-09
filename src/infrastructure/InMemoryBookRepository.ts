import { BookRepository } from "../domain/BookRepository";

export class InMemoryBookRepository implements BookRepository {
  private books = ["Book 1", "Book 2", "Book 3"];

  async find(): Promise<string[]> {
    return this.books;
  }
}

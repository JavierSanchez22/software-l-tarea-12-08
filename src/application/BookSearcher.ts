import { BookRepository } from "../domain/BookRepository";

export class BookSearcher {
  constructor(private repository: BookRepository) {}

  async run() {
    return this.repository.find();
  }
}

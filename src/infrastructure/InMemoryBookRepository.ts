import { BookRepository } from "../domain/BookRepository";
import { BookDto } from "../domain/Book";

export class InMemoryBookRepository implements BookRepository {
    private books = [
        { id: "1", title: "El Quijote", userId: "user1" },
        { id: "2", title: "Cien años de soledad", userId: "user2" },
        { id: "3", title: "1984", userId: null },
        { id: "4", title: "Don Juan Tenorio", userId: null },
        { id: "5", title: "La sombra del viento", userId: "user1" }
    ];

    async find(): Promise<BookDto[]> {
        return this.books.map(book => ({ title: book.title }));
    }

    async findByUser(userId: string): Promise<BookDto[]> {
        return this.books
            .filter(book => book.userId === null || book.userId === userId)
            .map(book => ({ title: book.title }));
    }
}
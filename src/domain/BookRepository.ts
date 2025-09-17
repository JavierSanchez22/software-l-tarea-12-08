import { BookDto } from "./Book";

export interface BookRepository {
    find(): Promise<BookDto[]>;
    findByUser(userId: string): Promise<BookDto[]>;
}
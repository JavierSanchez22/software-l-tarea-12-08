import { BookRepository } from "../domain/BookRepository";
import { UserFinder } from "./UserFinder";

export class BookSearcher {
    constructor(
        private repository: BookRepository,
        private userFinder: UserFinder
    ) {}

    async run(email: string) {
        const userDto = await this.userFinder.run(email);
        
        if (!userDto) {
            throw new Error("User not found");
        }

        return this.repository.findByUser(userDto.id);
    }
}
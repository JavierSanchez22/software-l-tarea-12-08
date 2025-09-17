import { UserRepository } from "../domain/UserRepository";

export class UserFinder {
    constructor(private repository: UserRepository) {}

    async run(email: string) {
        const user = await this.repository.findByEmail(email);
        return user ? user.toPrimitives() : null;
    }
}
import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";

export class UserCreator {
    constructor(private repository: UserRepository) {}

    async run(user: User) {
        await this.repository.save(user);
    }
}
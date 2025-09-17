import { UserRepository } from "../domain/UserRepository";
import { NotificationSender } from "../domain/NotificationSender";

export class UserValidator {
    constructor(
        private repository: UserRepository,
        private sender: NotificationSender
    ) {}

    async run(id: string) {
        const user = await this.repository.find(id);
        if (user && user.getIsValid().value) {
            await this.sender.send(user.toPrimitives());
        }
    }
}
import { UserRepository } from "../domain/UserRepository";
import { NotificationSender } from "../domain/NotificationSender";

export class UserValidator {
  constructor(
    private repository: UserRepository,
    private sender: NotificationSender
  ) {}

  async run(id: string) {
    const user = await this.repository.findById(id);
    if (user && user.valid.value) {
      await this.sender.send(user.toDto());
    }
  }
}

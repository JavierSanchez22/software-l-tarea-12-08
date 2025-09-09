import { NotificationSender } from "../../domain/NotificationSender";
import { UserDto } from "../../domain/UserDto";

export class EmailNotificationSender implements NotificationSender {
  async send(user: UserDto): Promise<void> {
    console.log(`📧 Email enviado a ${user.email}`);
  }
}

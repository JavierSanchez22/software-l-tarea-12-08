import { NotificationSender } from "../../domain/NotificationSender";
import { UserDto } from "../../domain/UserDto";

export class WhatsappNotificationSender implements NotificationSender {
  async send(user: UserDto): Promise<void> {
    console.log(`💬 WhatsApp enviado a ${user.name}`);
  }
}

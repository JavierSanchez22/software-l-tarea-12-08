import { NotificationSender } from "../../domain/NotificationSender";
import { UserDto } from "../../domain/UserDto";

export class WhatsappNotificationSender implements NotificationSender {
    private client = "WhatsappClient";

    async send(user: UserDto): Promise<void> {
        console.log(`💬 WhatsApp enviado a ${user.name} usando ${this.client}`);
    }
}
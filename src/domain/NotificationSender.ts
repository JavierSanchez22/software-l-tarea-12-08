import { UserDto } from "./UserDto";

export interface NotificationSender {
    send(user: UserDto): Promise<void>;
}

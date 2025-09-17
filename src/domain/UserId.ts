export default class UserId {
    public value: string;

    constructor(value: string) {
        if (!value || value.trim() === "") {
            throw new Error("User ID cannot be empty");
        }
        this.value = value;
    }

    equals(other: UserId): boolean {
        return this.value === other.value;
    }
}
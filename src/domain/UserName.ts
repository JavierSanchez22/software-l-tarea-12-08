export default class UserName {
    public value: string;

    constructor(value: string) {
        if (!value || value.trim() === "") {
            throw new Error("User name cannot be empty");
        }
        if (value.length > 100) {
            throw new Error("User name is too long");
        }
        this.value = value;
    }

    equals(other: UserName): boolean {
        return this.value === other.value;
    }
}
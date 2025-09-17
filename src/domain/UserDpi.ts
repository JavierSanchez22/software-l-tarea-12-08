export default class UserDpi {
    public value: string;

    constructor(value: string) {
        if (!value || value.trim() === "") {
            throw new Error("DPI cannot be empty");
        }
        this.value = value;
    }

    equals(other: UserDpi): boolean {
        return this.value === other.value;
    }
}
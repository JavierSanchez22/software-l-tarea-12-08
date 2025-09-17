export default class UserAge {
    public value: number;

    constructor(value: number) {
        if (value < 0 || value > 150) {
            throw new Error("Invalid age value");
        }
        this.value = value;
    }

    equals(other: UserAge): boolean {
        return this.value === other.value;
    }
}
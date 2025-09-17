export default class UserIsValid {
    public value: boolean;

    constructor(value: boolean) {
        this.value = value;
    }

    equals(other: UserIsValid): boolean {
        return this.value === other.value;
    }
}
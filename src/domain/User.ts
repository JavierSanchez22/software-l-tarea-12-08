import UserEmail from "./UserEmail";
import UserId from "./UserId";
import UserDpi from "./UserDpi";
import UserName from "./UserName";
import UserAge from "./UserAge";
import UserIsValid from "./UserIsValid";
import { UserDto } from "./UserDto";

export class User {
    private id: UserId;
    private email: UserEmail;
    private dpi: UserDpi;
    private name: UserName;
    private age: UserAge;
    private isValid: UserIsValid;

    constructor(
        id: UserId,
        email: UserEmail,
        dpi: UserDpi,
        name: UserName,
        age: UserAge,
        isValid: UserIsValid
    ) {
        this.id = id;
        this.email = email;
        this.dpi = dpi;
        this.name = name;
        this.age = age;
        this.isValid = isValid;
    }

    static create(id: string, email: string, dpi: string, name: string, age: number, valid: boolean): User {
        return new User(
            new UserId(id),
            new UserEmail(email),
            new UserDpi(dpi),
            new UserName(name),
            new UserAge(age),
            new UserIsValid(valid)
        );
    }

    static fromPrimitives(primitives: {
        id: string;
        email: string;
        dpi: string;
        name: string;
        age: number;
        valid: boolean;
    }): User {
        return User.create(
            primitives.id,
            primitives.email,
            primitives.dpi,
            primitives.name,
            primitives.age,
            primitives.valid
        );
    }

    toPrimitives(): UserDto {
        return {
            id: this.id.value,
            email: this.email.value,
            dpi: this.dpi.value,
            name: this.name.value,
            age: this.age.value,
            valid: this.isValid.value
        };
    }

    getId(): UserId { return this.id; }
    getEmail(): UserEmail { return this.email; }
    getDpi(): UserDpi { return this.dpi; }
    getName(): UserName { return this.name; }
    getAge(): UserAge { return this.age; }
    getIsValid(): UserIsValid { return this.isValid; }

    setIsValid(isValid: UserIsValid): void {
        this.isValid = isValid;
    }
}
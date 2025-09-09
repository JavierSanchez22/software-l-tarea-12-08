import UserEmail from "./UserEmail";
import UserId from "./UserId";
import UserDpi from "./UserDpi";
import UserAge from "./UserAge";
import UserName from "./UserName";
import UserIsValid from "./UserIsValid";
import UserDto from "./UserDto";

export default class User {
    private id: UserId;
    private email: UserEmail;
    private dpi:UserDpi;
    private name: UserName;
    private age: UserAge;
    private isValid:UserIsValid;


    constructor(id:UserId, email: UserEmail, name: UserName, age: UserAge, isValid:UserIsValid, dpi:UserDpi) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.age = age;
        this.isValid = isValid;
        this.dpi = dpi;
    }
    public static create(): User {
        return User;
    }

    public fromPrimitives(): User {
        return User;
    }
        
    public toPrimitives(): UserDto{
        return UserDto;
    }
}



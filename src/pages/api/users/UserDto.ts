export default class UserDto {
    public id: string;
    public email: string;
    public dpi:string;
    public name: string;
    public age: number;
    public isValid: boolean;


    constructor(id:string, email: string, name: string, age: number, isValid:boolean, dpi:string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.age = age;
        this.isValid = isValid;
        this.dpi = dpi;
    }
    
        
    
}



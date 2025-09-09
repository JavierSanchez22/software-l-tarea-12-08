export class UserId {
  constructor(public value: string) {}
}

export class UserEmail {
  constructor(public value: string) {}
}

export class UserDpi {
  constructor(public value: string) {}
}

export class UserName {
  constructor(public value: string) {}
}

export class UserAge {
  constructor(public value: number) {}
}

export class UserValid {
  constructor(public value: boolean) {}
}

export class User {
  constructor(
    public id: UserId,
    public email: UserEmail,
    public dpi: UserDpi,
    public name: UserName,
    public age: UserAge,
    public valid: UserValid
  ) {}

  static create(id: string, email: string, dpi: string, name: string, age: number, valid: boolean) {
    return new User(
      new UserId(id),
      new UserEmail(email),
      new UserDpi(dpi),
      new UserName(name),
      new UserAge(age),
      new UserValid(valid)
    );
  }

  toDto() {
    return {
      id: this.id.value,
      email: this.email.value,
      dpi: this.dpi.value,
      name: this.name.value,
      age: this.age.value,
      valid: this.valid.value
    };
  }
}

import { UserRepository } from "../domain/UserRepository";

export class UserFinder {
  constructor(private repository: UserRepository) {}

  async run(id: string) {
    const user = await this.repository.findById(id);
    return user?.toDto() || null;
  }
}

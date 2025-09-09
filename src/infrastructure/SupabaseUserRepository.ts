import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";

export class SupabaseUserRepository implements UserRepository {
  private users: User[] = []; // simulación en memoria

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(u => u.id.value === id) || null;
  }
}

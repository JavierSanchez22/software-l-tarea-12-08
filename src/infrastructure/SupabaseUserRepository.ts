import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { Pool } from 'pg';

interface DatabaseUser {
  id: string;
  email: string;
  dpi: string;
  name: string;
  age: number;
  valid: boolean;
}

export class SupabaseUserRepository implements UserRepository {
  private pool;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    
    if (!connectionString) {
      throw new Error("DATABASE_URL not configured");
    }

    this.pool = new Pool({
      connectionString: connectionString,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }

  async save(user: User): Promise<void> {
    const userPrimitives = user.toPrimitives();
    
    const query = `
      INSERT INTO users (id, email, dpi, name, age, valid)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (id) 
      DO UPDATE SET 
        email = EXCLUDED.email,
        dpi = EXCLUDED.dpi,
        name = EXCLUDED.name,
        age = EXCLUDED.age,
        valid = EXCLUDED.valid
    `;

    const client = await this.pool.connect();
    
    try {
      await client.query(query, [
        userPrimitives.id,
        userPrimitives.email,
        userPrimitives.dpi,
        userPrimitives.name,
        userPrimitives.age,
        userPrimitives.valid
      ]);
    } finally {
      client.release();
    }
  }

  async find(id: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE id = $1';
    const client = await this.pool.connect();
    
    try {
      const result = await client.query(query, [id]);
      return result.rows.length > 0 ? User.fromPrimitives(result.rows[0] as DatabaseUser) : null;
    } finally {
      client.release();
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const client = await this.pool.connect();
    
    try {
      const result = await client.query(query, [email]);
      return result.rows.length > 0 ? User.fromPrimitives(result.rows[0] as DatabaseUser) : null;
    } finally {
      client.release();
    }
  }
}
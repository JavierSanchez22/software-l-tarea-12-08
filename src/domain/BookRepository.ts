export interface BookRepository {
  find(): Promise<string[]>; // simplificado
}

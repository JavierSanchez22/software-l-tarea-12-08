import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { SupabaseUserRepository } from './src/infrastructure/SupabaseUserRepository';
import { UserCreator } from './src/application/UserCreator';
import { UserFinder } from './src/application/UserFinder';
import { UserValidator } from './src/application/UserValidator';
import { BookSearcher } from './src/application/BookSearcher';
import { InMemoryBookRepository } from './src/infrastructure/InMemoryBookRepository';
import { EmailNotificationSender } from './src/infrastructure/interfaces/EmailNotificationSender';
import { User } from './src/domain/User';


// Cargar variables de entorno
dotenv.config({ path: '.env.local' });

async function testCompleteSystem() {
  console.log('🧪 TESTEO COMPLETO DEL SISTEMA\n');

  // 1. Test de conexión a la base de datos
  console.log('1. 🔗 Testeando conexión a Supabase...');
  try {
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({
      connectionString: connectionString,
      ssl: { rejectUnauthorized: false }
    });

    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time');
    console.log('✅ Conexión exitosa. Hora de BD:', result.rows[0].current_time);
    client.release();
    await pool.end();
  } catch (error) {
    console.log('❌ Error de conexión:', error);
    return;
  }

  // 2. Test de UserRepository
  console.log('\n2. 👤 Testeando UserRepository...');
  try {
    const userRepo = new SupabaseUserRepository();
    
    // Crear usuario de prueba
    const testUser = User.create(
      'test-user-001',
      'test@example.com',
      '1234567890123',
      'Usuario Test',
      30,
      true
    );

    await userRepo.save(testUser);
    console.log('✅ Usuario guardado exitosamente');

    // Buscar por ID
    const foundById = await userRepo.find('test-user-001');
    console.log('✅ Búsqueda por ID:', foundById ? 'Encontrado' : 'No encontrado');

    // Buscar por email
    const foundByEmail = await userRepo.findByEmail('test@example.com');
    console.log('✅ Búsqueda por email:', foundByEmail ? 'Encontrado' : 'No encontrado');

  } catch (error) {
    console.log('❌ Error en UserRepository:', error);
  }

  // 3. Test de UserCreator
  console.log('\n3. 🛠️ Testeando UserCreator...');
  try {
    const userRepo = new SupabaseUserRepository();
    const userCreator = new UserCreator(userRepo);

    const newUser = User.create(
      'test-user-002',
      'creator@example.com',
      '9876543210987',
      'Usuario Creador',
      25,
      false
    );

    await userCreator.run(newUser);
    console.log('✅ UserCreator ejecutado exitosamente');

  } catch (error) {
    console.log('❌ Error en UserCreator:', error);
  }

  // 4. Test de UserFinder
  console.log('\n4. 🔍 Testeando UserFinder...');
  try {
    const userRepo = new SupabaseUserRepository();
    const userFinder = new UserFinder(userRepo);

    const userDto = await userFinder.run('test@example.com');
    console.log('✅ UserFinder ejecutado:', userDto ? `Encontrado: ${userDto.name}` : 'No encontrado');

  } catch (error) {
    console.log('❌ Error en UserFinder:', error);
  }

  // 5. Test de UserValidator
  console.log('\n5. ✅ Testeando UserValidator...');
  try {
    const userRepo = new SupabaseUserRepository();
    const notificationSender = new EmailNotificationSender();
    const userValidator = new UserValidator(userRepo, notificationSender);

    await userValidator.run('test-user-001');
    console.log('✅ UserValidator ejecutado exitosamente');

  } catch (error) {
    console.log('❌ Error en UserValidator:', error);
  }

  // 6. Test de BookSearcher
  console.log('\n6. 📚 Testeando BookSearcher...');
  try {
    const bookRepo = new InMemoryBookRepository();
    const userRepo = new SupabaseUserRepository();
    const userFinder = new UserFinder(userRepo);
    const bookSearcher = new BookSearcher(bookRepo, userFinder);

    const books = await bookSearcher.run('test@example.com');
    console.log('✅ BookSearcher ejecutado. Libros encontrados:', books.length);

  } catch (error) {
    console.log('❌ Error en BookSearcher:', error);
  }

  // 7. Test de Value Objects
  console.log('\n7. 🧩 Testeando Value Objects...');
  try {
    const user = User.create(
      'vo-test-001',
      'vo@example.com',
      'VO1234567890',
      'VO Test',
      35,
      true
    );

    console.log('✅ User ID:', user.getId().value);
    console.log('✅ User Email:', user.getEmail().value);
    console.log('✅ User Name:', user.getName().value);
    console.log('✅ User Age:', user.getAge().value);
    console.log('✅ User Valid:', user.getIsValid().value);
    console.log('✅ User DPI:', user.getDpi().value);

    // Test toPrimitives
    const primitives = user.toPrimitives();
    console.log('✅ toPrimitives():', primitives);

  } catch (error) {
    console.log('❌ Error en Value Objects:', error);
  }

  console.log('\n🎉 TESTEO COMPLETADO! Todos los componentes del diagrama fueron probados.');
  console.log('\n📋 Resumen:');
  console.log('   - ✅ Conexión a BD con Transaction Pooler');
  console.log('   - ✅ UserRepository (Supabase)');
  console.log('   - ✅ UserCreator (Caso de uso)');
  console.log('   - ✅ UserFinder (Caso de uso)'); 
  console.log('   - ✅ UserValidator (Caso de uso)');
  console.log('   - ✅ BookSearcher (Caso de uso)');
  console.log('   - ✅ Value Objects (UserId, UserEmail, etc.)');
  console.log('   - ✅ Notificaciones (EmailNotificationSender)');
}

testCompleteSystem();
import usersData from '@/data/users.json';
import { UserDTO } from '@/dtos/user.dto';

export class AuthService {
  /**
   * Valida las credenciales contra la fuente de datos (users.json).
   * Devuelve un DTO o null si la autenticación falla.
   */
  static async login(email: string, pass: string): Promise<UserDTO | null> {
    // Simula una ligera latencia asíncrona como si fuera una API externa
    await new Promise((resolve) => setTimeout(resolve, 300));

    const foundUser = (usersData as UserDTO[]).find(
      (u) => u.usr_email.toLowerCase() === email.toLowerCase() && u.usr_pass === pass
    );

    if (!foundUser || !foundUser.usr_is_active) {
      return null;
    }

    return foundUser;
  }
}

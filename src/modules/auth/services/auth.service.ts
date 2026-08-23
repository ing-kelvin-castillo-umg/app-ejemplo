import usersData from '@/shared/data/users.json';
import { UserDTO } from '../dtos/user.dto';

export class AuthService {
  /**
   * Validates user credentials against data source.
   * Returns UserDTO or null if authentication fails.
   */
  static async login(email: string, pass: string): Promise<UserDTO | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const foundUser = (usersData as UserDTO[]).find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === pass
    );

    if (!foundUser || !foundUser.isActive) {
      return null;
    }

    return foundUser;
  }
}

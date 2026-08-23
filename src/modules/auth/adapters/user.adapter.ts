import { UserDTO } from '../dtos/user.dto';
import { UserModel } from '../models/user.model';

export class UserAdapter {
  static toModel(dto: UserDTO): UserModel {
    return {
      id: dto.usr_id,
      email: dto.usr_email,
      fullName: dto.usr_full_name,
      role: dto.usr_role_code,
      isActive: dto.usr_is_active,
    };
  }
}

export interface UserDTO {
  usr_id: string;
  usr_email: string;
  usr_pass: string;
  usr_full_name: string;
  usr_role_code: 'ADMIN' | 'LIMITED';
  usr_is_active: boolean;
}

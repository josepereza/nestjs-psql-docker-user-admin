import { UserRoles } from 'src/users-roles.enum';

export class CreateUserDto {
  full_name: string;

  email: string;

  password: string;

  phone: string;

  role: UserRoles;
}

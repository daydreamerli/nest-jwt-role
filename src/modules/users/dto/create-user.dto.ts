import { IsString } from 'class-validator';
import { Role } from 'src/modules/role/role.enum';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  readonly role: Role;
}

import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/common/role/role.enum";

export class CreateUserDto{
  @IsNotEmpty()
  @IsString()
  readonly  user: string;
  @IsNotEmpty()
  @IsString()
  readonly  password:string;
  @IsNotEmpty()
  readonly  role:Role;
}
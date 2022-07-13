import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/common/role/role.enum";

export class UserDto{
  @IsNotEmpty()
  @IsString()
  readonly  user: string;
  @IsNotEmpty()
  @IsString()
  readonly  password:string;
  @IsNotEmpty()
  readonly  roles:Role[];
}
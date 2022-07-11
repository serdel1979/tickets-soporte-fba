import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{
  @IsNotEmpty()
  @IsString()
  readonly  user: string;
  @IsNotEmpty()
  @IsString()
  readonly  password:string;
}
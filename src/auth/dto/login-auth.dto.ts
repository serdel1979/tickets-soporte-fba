import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginAuthDto {
    @IsNotEmpty()
    user: string;
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(12)
    password:string;
}

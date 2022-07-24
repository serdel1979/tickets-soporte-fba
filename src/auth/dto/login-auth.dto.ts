import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Role } from "src/common/role/role.enum";

export class LoginAuthDto {
    @IsNotEmpty()
    user: string;
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    password:string;
}

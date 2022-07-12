import { Role } from "../role/role.enum";

export interface IUser extends Document{
    user: string;
    password:string;
    role: Role[];
}
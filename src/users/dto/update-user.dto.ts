import { PartialType } from '@nestjs/mapped-types';
import { Role } from 'src/common/role/role.enum';
import { UserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(UserDto) {
    
        readonly  user: string;

        readonly  password:string;

        readonly  roles:Role[];
      
}

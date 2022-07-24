import { PartialType } from '@nestjs/mapped-types';
import { Role } from 'src/common/role/role.enum';
import { UserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(UserDto) {
}

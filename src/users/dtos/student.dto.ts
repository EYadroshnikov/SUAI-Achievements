import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class StudentDto extends UserDto {
  @ApiProperty()
  @Expose()
  instituteId: number;

  @ApiProperty()
  @Expose()
  groupId: number;
}

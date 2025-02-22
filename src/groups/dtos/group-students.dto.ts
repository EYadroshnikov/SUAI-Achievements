import { GroupDto } from './group.dto';
import { StudentDto } from '../../users/dtos/student.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class GroupStudentsDto extends GroupDto {
  @ApiProperty({ type: StudentDto, isArray: true })
  @Type(() => StudentDto)
  @Expose()
  students: StudentDto[];
}

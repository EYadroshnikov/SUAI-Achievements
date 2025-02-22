import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Capitalize } from '../../common/decorators/capitalize.decorator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Capitalize()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Capitalize()
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Capitalize()
  patronymic?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vkId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tgUserName?: string;
}

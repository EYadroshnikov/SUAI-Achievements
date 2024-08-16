import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserSettingsDto {
  @ApiProperty()
  @Expose()
  isVisibleInTop: boolean;

  @ApiProperty()
  @Expose()
  receiveTgAchievementNotifications: boolean;

  @ApiProperty()
  @Expose()
  receiveVkAchievementNotifications: boolean;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}

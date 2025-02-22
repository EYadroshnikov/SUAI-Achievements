import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AchievementType } from '../enums/achievement-type.enum';
import { AchievementCategory } from '../enums/achievement-category.enum';
import { AchievementRarity } from '../enums/achievement-rarity.enum';

@Entity('achievements')
export class Achievement {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'type', type: 'enum', enum: AchievementType })
  type: AchievementType;

  @Column({ name: 'category', type: 'enum', enum: AchievementCategory })
  category: AchievementCategory;

  @Column({
    name: 'rarity',
    type: 'enum',
    enum: AchievementRarity,
  })
  rarity: AchievementRarity;

  @Column({ name: 'reward', type: 'integer' })
  reward: number;

  @Column({ name: 'hidden_icon_path', type: 'varchar' })
  hiddenIconPath: string;

  @Column({ name: 'opened_icon_path', type: 'varchar' })
  openedIconPath: string;

  @Column({ name: 'sputnik_requirement', type: 'varchar' })
  sputnikRequirement: string;

  @Column({ name: 'student_requirement', type: 'varchar' })
  studentRequirement: string;

  @Column({ name: 'hint', type: 'varchar', nullable: true })
  hint?: string;

  @Column({ name: 'rofl_description', type: 'varchar', nullable: true })
  roflDescription?: string;
}

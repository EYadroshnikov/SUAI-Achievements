import { IssuedAchievementDto } from '../../achievements/dtos/issued-achievement.dto';

function generateIssueMessage(data: IssuedAchievementDto): string {
  const { achievement } = data;

  return `
🏆 Вы получили новое достижение <b>${achievement.name}</b>!
`.trim();
}

export default generateIssueMessage;

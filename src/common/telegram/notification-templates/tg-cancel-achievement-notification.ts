import { IssuedAchievementDto } from '../../../achievements/dtos/issued-achievement.dto';

function generateTgCancelMessage(data: IssuedAchievementDto): string {
  const { achievement, canceler } = data;

  return `
🚩 К сожалению, достижение <b>${achievement.name}</b> было отменено по причине <b>${data.cancellationReason}</b>
<b>Отменил:</b> ${canceler.firstName} ${canceler.lastName}
`;
}

export default generateTgCancelMessage;

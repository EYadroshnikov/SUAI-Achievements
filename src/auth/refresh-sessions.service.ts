import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshSession } from './entities/refresh-session.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CookieOptions, Request } from 'express';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RefreshSessionsService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(RefreshSession)
    private readonly refreshSessionRepository: Repository<RefreshSession>,
  ) {}
  private readonly logger: Logger = new Logger(RefreshSessionsService.name);

  COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/api/auth',
    maxAge: this.configService.get('app.refreshTokenExpiration') * 1000,
  };

  async generateRefreshToken(req: Request, user: User) {
    await this.refreshSessionRepository.delete({
      userAgent: req.headers['user-agent'] || '',
      fingerprint: req.body.fingerprint || '',
      user: { uuid: user.uuid },
    });

    const refreshSession = new RefreshSession();
    refreshSession.fingerprint = req.body['fingerprint'] || '';
    refreshSession.user = user;
    refreshSession.userAgent = req.headers['user-agent'] || '';
    const ipHeader = req.headers['x-real-ip'];
    if (Array.isArray(ipHeader)) {
      refreshSession.ip = ipHeader.join(', ');
    } else if (typeof ipHeader === 'string') {
      refreshSession.ip = ipHeader;
    } else {
      refreshSession.ip = '';
    }

    const expiresAt = new Date();
    expiresAt.setSeconds(
      expiresAt.getSeconds() +
        this.configService.get('app.refreshTokenExpiration'),
    );
    refreshSession.expiresAt = expiresAt;

    return this.refreshSessionRepository.save(refreshSession);
  }

  async findRefreshSession(refreshToken: string) {
    return this.refreshSessionRepository.findOne({
      where: { refreshToken },
      relations: ['user'],
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_1PM, {
    name: 'delete expired refresh session',
    timeZone: 'Europe/Moscow',
  })
  async deleteExpiredSession() {
    this.logger.log('Cron task: delete expired refresh session - has started');
    await this.refreshSessionRepository
      .delete({
        expiresAt: LessThanOrEqual(new Date()),
      })
      .catch((err) => console.error(err));
    this.logger.log('Cron task: delete expired refresh session - has finished');
  }
}

import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AchievementsModule } from './achievements/achievements.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import postgresConfig from './config/postres/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsModule } from './groups/groups.module';
import { InstitutesModule } from './institues/institutes.module';
import { VkModule } from './vk/vk.module';
import appConfig from './config/app/app.config';
import { LoggingMiddleware } from './common/middlewares/logging.middleware';
import { NodeEnv } from './config/app/enums/node-env.enum';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [postgresConfig, appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('postgres.host'),
        port: configService.get('postgres.port'),
        username: configService.get('postgres.username'),
        password: configService.get('postgres.password'),
        database: configService.get('postgres.database'),
        autoLoadEntities: true,
        synchronize: configService.get('app.nodeEnv') === NodeEnv.DEV,
        connectTimeoutMS: 15000,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    AchievementsModule,
    UsersModule,
    AuthModule,
    GroupsModule,
    InstitutesModule,
    VkModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'achievementIcons'),
      serveRoot: '/achievementIcons',
      serveStaticOptions: {
        dotfiles: 'deny',
      }, //TODO: catch not found exception
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}

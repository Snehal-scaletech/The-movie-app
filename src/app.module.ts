import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { MongooseModule } from '@nestjs/mongoose'
import { AccountModule } from './account/account.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './configuration/configuration.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/movie'),MovieModule, AccountModule, ConfigModule.forRoot({isGlobal: true,}), AuthModule, ConfigurationModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurveyModule } from './survey/survey.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      // `mongodb://${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`,
      `mongodb://${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`,
    ),
    SurveyModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log(
      'MongoDB Connection URI:',
      process.env.HOST,
      process.env.PORT,
      process.env.DATABASE,
    );
  }
}

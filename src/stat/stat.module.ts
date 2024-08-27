import { Module } from '@nestjs/common';
import { StatController } from './stat.controller';
import { StatService } from './stat.service';
import { SurveyModule } from 'src/survey/survey.module';
import { AnswerModule } from 'src/answer/answer.module';

@Module({
  imports: [SurveyModule, AnswerModule],
  controllers: [StatController],
  providers: [StatService],
})
export class StatModule {}

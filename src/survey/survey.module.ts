import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveySchema } from './schemas/survey.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Survey.name, schema: SurveySchema }]),
  ],
  controllers: [SurveyController],
  providers: [SurveyService],
  exports: [SurveyService],
})
export class SurveyModule {}

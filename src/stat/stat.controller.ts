import { Controller, Get, Param, Query } from '@nestjs/common';
import { StatService } from './stat.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('stat')
export class StatController {
  constructor(private readonly statService: StatService) {}
  @Public()
  @Get(':surveyId')
  async getSurveyStat(
    @Param('surveyId') surveyId: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.statService.getSurveyStatListAndCount(surveyId, {
      page,
      pageSize,
    });
  }
  @Public()
  @Get(':surveyId/:componentFeId')
  getComponentStat(
    @Param('surveyId') surveyId: string,
    @Param('componentFeId') componentFeId: string,
  ) {
    return this.statService.getComponentState(surveyId, componentFeId);
  }
}

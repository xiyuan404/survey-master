import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { SurveyService } from './survey.service';

@Controller('surveys')
export class SurveyController {
  // 依赖注入
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  create(@Request() req) {
    const { username } = req.user;
    return this.surveyService.create(username);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveyService.findOne(id);
  }

  @Get()
  async findAll(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    const list = await this.surveyService.findAll(keyword, page, pageSize);
    const count = await this.surveyService.countAll(keyword);

    return {
      list,
      count: count,
    };
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.surveyService.deleteOne(id);
  }

  // @Get('error')
  // mockError() {
  //   throw new HttpException('获取数据失败', HttpStatus.BAD_REQUEST);
  // }
}

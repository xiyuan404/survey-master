import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyDto } from './dto/survey.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('surveys')
export class SurveyController {
  // 依赖注入
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  create(@Request() req) {
    const { username } = req.user;
    return this.surveyService.create(username);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveyService.findOne(id);
  }

  @Get()
  async findAll(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('isStar') isStar: boolean = false,
    @Query('isDeleted') isDeleted: boolean = false,
    @Request() request,
  ) {
    const { username } = request.user;
    const list = await this.surveyService.findAll(
      keyword,
      page,
      pageSize,
      isStar,
      isDeleted,
      username,
    );
    const count = await this.surveyService.countAll(
      keyword,
      username,
      isStar,
      isDeleted,
    );

    return {
      list,
      count: count,
    };
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string, @Request() req) {
    const { username } = req.user;
    return this.surveyService.deleteOne(id, username);
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Request() req,
    @Body() updateSurveyDto: SurveyDto,
  ) {
    const { username } = req.user;
    return this.surveyService.updateOne(id, username, updateSurveyDto);
  }

  @Post('duplicate/:id')
  duplicate(@Param('id') id: string, @Request() req) {
    const { username } = req.user;
    console.log(req.user);
    return this.surveyService.duplicate(id, username);
  }
}

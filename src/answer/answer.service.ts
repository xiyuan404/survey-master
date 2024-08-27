import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer } from './schemas/answer.schema';
import { Model } from 'mongoose';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private readonly answerModel: Model<Answer>,
  ) {}

  async create(answerInfo) {
    if (answerInfo.surveyId == null) {
      throw new HttpException('缺少问卷id', HttpStatus.BAD_REQUEST);
    }

    const answer = new this.answerModel(answerInfo);
    return await answer.save();
  }

  async countAll(surveyId: string) {
    if (!surveyId) return 0;
    return await this.answerModel.countDocuments({ surveyId });
  }
  async findAll(surveyId: string, opt: { page: number; pageSize: number }) {
    if (!surveyId) return [];

    const { page, pageSize } = opt;
    return this.answerModel
      .find({
        surveyId,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 });
  }
}

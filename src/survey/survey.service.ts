import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Survey } from './schemas/survey.schema';
import { Model } from 'mongoose';

@Injectable()
export class SurveyService {
  // 依赖注入
  constructor(@InjectModel(Survey.name) private surveyModel: Model<Survey>) {}

  async create() {
    const survey = new this.surveyModel({
      title: 'title-' + Date.now(),
      desc: 'desc',
    });
    return await survey.save();
  }
  async findOne(id: string) {
    return await this.surveyModel.findById(id);
  }
  async findAll(keyword = '', page = 1, pageSize = 10) {
    const whereOpt: any = {};
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      whereOpt.title = { $regex: reg }; // 模糊查找
    }

    return await this.surveyModel
      .find(whereOpt)
      .sort({ _id: -1 }) //逆序排序，最新的最前面
      .skip((page - 1) * pageSize) // 分页
      .limit(pageSize);
  }

  async countAll(keyword: string) {
    const whereOpt: any = {};
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      whereOpt.title = { $regex: reg }; // 模糊查找
    }
    return await this.surveyModel.countDocuments(whereOpt);
  }

  async deleteOne(id: string) {
    return await this.surveyModel.findByIdAndDelete(id);
  }
  async updateOne(id: string, updateData) {
    return await this.surveyModel.updateOne({ _id: id }, updateData);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Survey } from './schemas/survey.schema';
import mongoose, { Model } from 'mongoose';
import { nanoid } from 'nanoid';

@Injectable()
export class SurveyService {
  // 依赖注入
  constructor(@InjectModel(Survey.name) private surveyModel: Model<Survey>) {}

  async create(username: string) {
    const survey = new this.surveyModel({
      title: '问卷标题-' + Date.now(),
      desc: '问卷描述',
      author: username,
      componentList: [
        {
          fe_id: nanoid(),
          type: 'surveyInfo',
          title: '问卷信息',
          props: { title: '组件标题', desc: '组件描述' },
        },
      ],
    });
    return await survey.save();
  }
  async findOne(id: string) {
    return await this.surveyModel.findById(id);
  }
  async findAll(
    keyword = '',
    page = 1,
    pageSize = 10,
    isStar: boolean,
    isDeleted: boolean,
    author = '',
  ) {
    const whereOpt: any = {
      author,
      isStar,
      isDeleted,
    };
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

  async countAll(
    keyword: string,
    author = '',
    isStar: boolean,
    isDeleted: boolean,
  ) {
    const whereOpt: any = {
      author,
      isStar,
      isDeleted,
    };
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      whereOpt.title = { $regex: reg }; // 模糊查找
    }
    return this.surveyModel.countDocuments(whereOpt);
  }

  async deleteOne(id: string, author: string) {
    return this.surveyModel.findOneAndDelete({ _id: id, author });
  }

  async deleteMany(ids: string[], author: string) {
    return this.surveyModel.deleteMany({
      _id: { $in: ids },
      author,
    });
  }

  async updateOne(id: string, author: string, updateData) {
    return this.surveyModel.updateOne({ _id: id, author }, updateData);
  }

  async duplicate(id: string, author: string) {
    console.log(author);
    const origin = (await this.surveyModel.findById(id)).toObject();
    const copy = new this.surveyModel({
      ...origin,
      _id: new mongoose.Types.ObjectId(),
      author,
      isDeleted: false,
      isPublished: false,
      isStar: false,
      title: origin.title + ' 副本',
      componentList: origin.componentList.map((item) => {
        return {
          ...item,
          fe_id: nanoid(),
        };
      }),
    });
    return await copy.save();
  }
}

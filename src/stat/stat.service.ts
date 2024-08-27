import { Injectable } from '@nestjs/common';
import { AnswerService } from 'src/answer/answer.service';
import { SurveyService } from 'src/survey/survey.service';

@Injectable()
export class StatService {
  constructor(
    private readonly surveyService: SurveyService,
    private readonly answerService: AnswerService,
  ) {}

  private _getRadioOptText(value, props: any = {}) {
    const { list = [] } = props;
    const length = list.length;

    for (let i = 0; i < length; i++) {
      const item = list[i];
      console.log('radio', item);

      if (item.value === value) {
        return item.label;
      }
    }
    return '';
  }

  private _getCheckboxOptText(value, props: any = {}) {
    const { opts = [] } = props;
    const length = opts.length;

    for (let i = 0; i < length; i++) {
      const item = opts[i];
      console.log('checkbox', item);

      if (item.value === value) {
        return item.text;
      }
    }
    return '';
  }
  private _getAnswersInfo(survey, answerList = []) {
    const res = {};

    const { componentList = [] } = survey;

    answerList.forEach((a) => {
      const { componentFeId, value = [] } = a;

      const cmp = componentList.filter((c) => c.fe_id === componentFeId)[0];
      const { type, props = {} } = cmp || {};
      if (type === 'surveyRadio') {
        res[componentFeId] = value
          .map((v) => this._getRadioOptText(v, props))
          .toString();
      } else if (type === 'surveyCheckbox') {
        res[componentFeId] = value
          .map((v) => this._getCheckboxOptText(v, props))
          .toString();
      } else {
        res[componentFeId] = value.toString();
      }
    });
    return res;
  }
  // 获取单个问卷的统计信息
  async getSurveyStatListAndCount(
    surveyId: string,
    opt: { page: number; pageSize: number },
  ) {
    const noData = { list: [], count: 0 };

    // 没传
    if (!surveyId) return noData;

    const survey = await this.surveyService.findOne(surveyId);
    // 没找到
    if (!survey) return noData;

    const total = await this.answerService.countAll(surveyId);
    if (total === 0) return noData;
    const answers = await this.answerService.findAll(surveyId, opt);

    const list = answers.map((a) => {
      return {
        _id: a._id,
        ...this._getAnswersInfo(survey, a.answerList),
      };
    });

    return {
      list,
      total,
    };
  }

  // 获取单个组件的统计数据
  async getComponentState(surveyId: string, componentFeId: string) {
    // 没传问卷id和组件id
    if (!surveyId || !componentFeId) return [];

    // 获取问卷
    const q = await this.surveyService.findOne(surveyId);
    // 不存在该问卷
    if (q == null) return [];

    const { componentList = [] } = q;

    const comp = componentList.filter((c) => c.fe_id === componentFeId)[0];
    // 该问卷中不存在该组件
    if (comp == null) return [];

    const { type, props } = comp;

    // 非单选和多选组件不需要统计
    if (type !== 'surveyRadio' && type !== 'surveyCheckbox') {
      return [];
    }
    // 获取答卷列表
    const total = await this.answerService.countAll(surveyId);
    // 没有对应答卷
    if (total === 0) return [];
    const answers = await this.answerService.findAll(surveyId, {
      page: 1,
      pageSize: total, //获取所有的不分页
    });

    // 聚合数据

    const countInfo = {};
    answers.forEach((a) => {
      const { answerList = [] } = a;
      answerList.forEach((a) => {
        if (a.componentId !== componentFeId) return;
        const v = a.value;
        if (countInfo[v] == null) countInfo[v] = 0;
        countInfo[v]++; // 累加
      });
    });

    // 整理数据
    const list = [];
    for (const val in countInfo) {
      let text = '';
      if (type === 'surveyRadio') {
        text = this._getRadioOptText(val, props);
      }
      if (type === 'surveyCheckbox') {
        text = this._getCheckboxOptText(val, props);
      }
      list.push({ name: text, count: countInfo[val] });
    }

    return {
      stat: list,
    };
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SurveyDocument = HydratedDocument<Survey>;

@Schema({
  timestamps: true, // record createdAt updatedAt timestamp
})
export class Survey {
  @Prop({ required: true })
  title: string;

  @Prop()
  desc: string;

  @Prop()
  js: string;
  @Prop()
  css: string;

  @Prop({ default: false })
  isPublish: string;

  @Prop({ default: false })
  isDeleted: boolean;
  @Prop({ default: false })
  isStar: boolean;

  @Prop({ required: true })
  author: string;

  @Prop()
  componentList: {
    fe_id: string;
    type: string;
    title: string;
    isHidden: boolean;
    isLocked: boolean;
    props: object;
  }[];
}

export const SurveySchema = SchemaFactory.createForClass(Survey);

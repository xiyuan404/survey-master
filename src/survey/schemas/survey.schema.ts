import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SurveyDocument = HydratedDocument<Survey>;

@Schema()
export class Survey {
  @Prop()
  title: string;

  @Prop()
  desc: string;
}

export const SurveySchema = SchemaFactory.createForClass(Survey);

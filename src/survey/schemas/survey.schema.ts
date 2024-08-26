import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SurveyDocument = HydratedDocument<Survey>;

@Schema({
  timestamps: true, // record createdAt updatedAt timestamp
})
export class Survey {
  @Prop()
  title: string;

  @Prop()
  desc: string;
}

export const SurveySchema = SchemaFactory.createForClass(Survey);

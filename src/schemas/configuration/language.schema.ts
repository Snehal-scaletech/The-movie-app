import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type LanguageDocument = Language & Document;

@Schema()
export class Language{
    @Prop()
    iso_639_1: string;

    @Prop()
    english_name: string;

    @Prop()
    name: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
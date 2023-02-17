import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CountryDocument = Country & Document;

@Schema()
export class Country{
    @Prop()
    iso_3166_1: string;

    @Prop()
    english_name: string;

    @Prop()
    native_name: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TimezoneDocument = Timezone & Document;

@Schema()
export class Timezone{
    @Prop()
    iso_3166_1: string;

    @Prop([String])
    zones: string[];
}

export const TimezoneSchema = SchemaFactory.createForClass(Timezone);
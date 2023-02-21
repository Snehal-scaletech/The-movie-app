import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ListsDocument = Lists & Document;

@Schema()
export class Lists{
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    language: string;

    @Prop()
    list_id: string;

    @Prop()
    created_by: string;

    @Prop()
    favorite_count: string;

    @Prop()
    item_count: string;

    @Prop()
    iso_639_1: string;

    @Prop()
    poster_path: string;

    @Prop({required:true})
    session_id: string;
}
  

export const ListsSchema = SchemaFactory.createForClass(Lists);
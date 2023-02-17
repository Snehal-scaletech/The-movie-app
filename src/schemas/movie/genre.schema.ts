import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type GenreDocument = Genre & Document;

@Schema()
export class Genre{
    @Prop()
    name: string;

    @Prop()
    genres_id: number
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
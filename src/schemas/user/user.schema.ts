import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop()
    full_name: string;

    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    phone: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
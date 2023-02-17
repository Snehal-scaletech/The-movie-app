import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AccountDetailDocument = Accountdetails & Document;

@Schema()
export class Accountdetails{
    @Prop()
    avatar_path: string;

    @Prop()
    account_id: number;

    @Prop()
    iso_639_1: string;

    @Prop()
    iso_3166_1: string;

    @Prop()
    name: string;

    @Prop()
    include_adult: boolean;

    @Prop()
    username: string;

}

export const AccountdetailsSchema = SchemaFactory.createForClass(Accountdetails);
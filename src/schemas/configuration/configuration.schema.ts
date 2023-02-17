import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ConfigurationDocument = Configuration & Document;

@Schema()
export class Configuration{
    @Prop()
    base_url: string;

    @Prop()
    secure_base_url: string;

    @Prop([String])
    backdrop_sizes: string[];

    @Prop([String])
    logo_sizes: string[];

    @Prop([String])
    poster_sizes: string[];

    @Prop([String])
    profile_sizes: string[];

    @Prop([String])
    still_sizes: string[];

    @Prop([String])
    change_keys: string[];
}

export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);
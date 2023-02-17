import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type MovieDocument = Movie & Document;

@Schema()
export class Movie{
    @Prop()
    adult: boolean;

    @Prop()
    backdrop_path: string;

    @Prop()
    belongs_to_collection: string;

    @Prop([Object])
    genres: object[];

    @Prop()
    homepage: string;

    @Prop()
    movie_id: number;

    @Prop()
    imdb_id: string;

    @Prop()
    original_title: string;

    @Prop()
    overview: string;

    @Prop()
    popularity: number;

    @Prop()
    poster_path: string;

    @Prop([Object])
    production_companies: object[];

    @Prop([Object])
    production_countries: object[];

    @Prop()
    release_date: string;


    @Prop()
    revenue: number;

    @Prop()
    runtime: number;

    @Prop([Object])
    spoken_languages: object[];

    @Prop()
    status: string;

    @Prop()
    tagline: string;

    @Prop()
    title: string;

    @Prop()
    video: boolean;

    @Prop()
    vote_average: number;

    @Prop()
    vote_count: number;
}
  

export const MovieSchema = SchemaFactory.createForClass(Movie);
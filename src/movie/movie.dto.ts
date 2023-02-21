import { IsBoolean, isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateListDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    language: string;
}

export class AddMovieDto{
    @IsString()
    @IsNotEmpty()
    session_id: string;

    @IsString()
    @IsNotEmpty()
    query: string
}

export class SearchMovieDto{
    @IsString()
    @IsNotEmpty()
    query: string;

    @IsString()
    @IsOptional()
    language: string;

    @IsNumber()
    @IsOptional()
    page: number;

    @IsBoolean()
    @IsOptional()
    include_adult: boolean;

    @IsString()
    @IsOptional()
    region: string;

    @IsNumber()
    @IsOptional()
    year: number;

    @IsNumber()
    @IsOptional()
    primary_release_year: number;

}

export class FavoriteMovieDto{
    @IsString()
    @IsNotEmpty()
    media_type: string;

    @IsNumber()
    @IsNotEmpty()
    media_id: number;

    @IsBoolean()
    @IsNotEmpty()
    favorite: boolean;
}

export class WatchlistMovieDto{
    @IsString()
    @IsNotEmpty()
    media_type: string;

    @IsNumber()
    @IsNotEmpty()
    media_id: number;

    @IsBoolean()
    @IsNotEmpty()
    watchlist: boolean;
}
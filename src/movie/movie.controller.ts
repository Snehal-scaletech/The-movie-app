import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { AddMovieDto, CreateListDto, SearchMovieDto } from './movie.dto';
import { MovieService } from './movie.service';

@Controller('movie')
@UseGuards(AuthGuard)
export class MovieController {
    constructor(private readonly movieService : MovieService){}


    @Get('movie-list')
    async getMovieList(){
        const result  = await this.movieService.getMovieList();
        return { data: result, message: "Movie list found successfully."};
    }

    @Post('create-list')
    async createList(@Query() session_id: any, @Body() params: CreateListDto){
        const result  = await this.movieService.createList(session_id, params);
        return { data: result, message: "List created successfully."};
    }

    @Get('list-details/:list_id')
    async getListDetailsById(@Param('list_id') list_id : string){
        const result  = await this.movieService.getListDetailsById(list_id);
        return { data: result, message: "List details found successfully."};
    }

    @Get('search-movie')
    async searchMovie(@Query() queryString: SearchMovieDto){
        const result  = await this.movieService.searchMovie(queryString);
        return { data: result, message: "Movie details successfully."};
    }

    @Post('add-movie/:list_id')
    async addMovie(@Query('session_id') session_id: string, @Param('list_id') list_id: string, @Body() media_id: string){
        const result  = await this.movieService.addMovie(session_id, list_id, media_id);
        return { data: result, message: "Movie added successfully."};
    }
}

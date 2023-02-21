import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { AddMovieDto, CreateListDto, FavoriteMovieDto, SearchMovieDto, WatchlistMovieDto } from './movie.dto';
import { MovieService } from './movie.service';

@Controller('movie')
@UseGuards(AuthGuard)
export class MovieController {
    constructor(private readonly movieService : MovieService){}

    @Post('create-list')
    async createList(@Query('session_id') session_id: string, @Body() params: CreateListDto){
        const result  = await this.movieService.createList(session_id, params);
        return { data: result, message: "List created successfully."};
    }

    @Get('created-list/:account_id')
    async getCreatedList(@Param('account_id') account_id: number, @Query('session_id') session_id: string,){
        const result = await this.movieService.getCreatedList(account_id, session_id);
        return {data : result, message: 'Created list found successfully.'}
    }

    @Get('list-details/:list_id')
    async getListDetailsById(@Param('list_id') list_id : string){
        const result  = await this.movieService.getListDetailsById(list_id);
        return { data: result, message: "List details found successfully."};
    }

    @Delete('delete-list/:list_id')
    async deleteList(@Param('list_id') id: string, @Query('session_id') session_id: string){
        const result = await this.movieService.deleteList(id, session_id);
        return { data: result, message: "List deleted successfully."};
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

    @Post('delete-movie/:list_id')
    async deleteMovie( @Query('session_id') session_id: string, @Param('list_id') list_id: string, @Body() media_id: string){
        const result = await this.movieService.deleteMovie( session_id,list_id, media_id);
        return { data: result, message: "Movie deleted successfully."};
    }

    @Post('delete-allmovie/:list_id')
    async deleteAllMovie( @Query('session_id') session_id: string, @Param('list_id') list_id: string, @Query('confirm') status: boolean){
        const result = await this.movieService.deleteAllMovie( session_id, list_id, status);
        return { data: result, message: "All movie in list has been deleted successfully."};
    }


    @Get('movie-details/:movie_id')
    async getMovieDetails(@Param('movie_id') movie_id: number){
        const result  = await this.movieService.getMovieDetails(movie_id);
        return { data: result, message: "Movie details found successfully."};
    }


    
    @Post('add-favorite/:account_id')
    async addFavorite(@Query('session_id') session_id: string, @Param('account_id') account_id: string, @Body() favoriteDto: FavoriteMovieDto){
        const result  = await this.movieService.addFavorite(session_id, account_id, favoriteDto);
        return { data: result, message: "Movie added into favorite successfully."};
    }

    @Post('add-watchlist/:account_id')
    async addWatchlist(@Query('session_id') session_id: string, @Param('account_id') account_id: string, @Body() watchlistDto: WatchlistMovieDto){
        const result  = await this.movieService.addWatchlist(session_id, account_id, watchlistDto);
        return { data: result, message: "Movie added into watchlist successfully."};
    }

    @Post('add-rating/:movie_id')
    async addRating(@Query('session_id') session_id: string, @Param('movie_id') movie_id: string, @Body() value: number){
        const result  = await this.movieService.addRating(session_id, movie_id, value);
        return { data: result, message: "Movie rating added successfully."};
    }

}

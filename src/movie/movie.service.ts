import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import {  InjectModel } from '@nestjs/mongoose';
import {  Model } from 'mongoose';
import axios from 'axios';
import { Genre, GenreDocument } from 'src/schemas/movie/genre.schema';
import { CreateListDto, FavoriteMovieDto, SearchMovieDto, WatchlistMovieDto } from './movie.dto';
import { Lists, ListsDocument } from 'src/schemas/movie/lists.schema';
import { Movie, MovieDocument } from 'src/schemas/movie/movie.schema';

@Injectable()
export class MovieService {
    constructor(
        @InjectModel(Genre.name)
        private genreModel : Model<GenreDocument>,

        @InjectModel(Lists.name)
        private listsModel : Model<ListsDocument>,
        
        @InjectModel(Movie.name)
        private movieModel : Model<MovieDocument>){}

    async createList(session_id: string, params: CreateListDto){
        
        const config = {
            method: 'POST',
            url: `${process.env.TMDB_BASE_URL}/3/list`,
            params: { api_key:  process.env.TMDB_API_KEY, session_id:  session_id},
            headers: { 
                'Content-Type': 'application/json'
                },
            data: params
        };
        
        try {
            const res = await  axios(config);
            
            if(res.data.success === true && res.data.status_code === 1){

                const getListData = await this.getListDetails(res.data.list_id)
            
                const lists_data = {
                    created_by: getListData.created_by,
                    favorite_count: getListData.favorite_count,
                    item_count: getListData.item_count,
                    iso_639_1: getListData.iso_639_1,
                    name : getListData.name,
                    description: getListData.description,
                    poster_path: getListData.language,
                    list_id: getListData.id,
                    session_id: session_id
                }
                await this.listsModel.create(lists_data);
                return getListData;
            }else{
                throw new NotFoundException('No data found');
            }
            
        } catch (error) {
            throw new UnauthorizedException('User session ID is invalid, please try again.');
        }
    }

    async getCreatedList(account_id: number, session_id: string){
      
        const config = {
            method: 'GET',
            url: `${process.env.TMDB_BASE_URL}/3/account/${account_id}/lists`,
            params: { api_key:  process.env.TMDB_API_KEY, session_id: session_id},
        };
    
        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            throw new NotFoundException('Sorry! No created list found.');
        }
    }

    async getListDetailsById(list_id : string){
        const list = await this.getListDetails(list_id);
   
        return list;
    }

    async getListDetails(list_id){
        const config = {
            method: 'GET',
            url: `${process.env.TMDB_BASE_URL}/3/list/${list_id}`,
            params: { api_key:  process.env.TMDB_API_KEY},
        };
        try {
            const res = await  axios(config);
            return res.data;
        } catch (error) {
            throw new NotFoundException('Sorry! List details is not found.');
        }
    }

    async deleteList(list_id: string, session_id){
        const config = {
            method: 'DELETE',
            url: `${process.env.TMDB_BASE_URL}/3/list/${list_id}`,
            params: { api_key:  process.env.TMDB_API_KEY, session_id:  session_id},
        };
     
        try {
            const qry = await this.listsModel.deleteOne({ list_id: list_id });
          
            const data = await axios(config);
            return data;
        } catch (error) {
            return 'success';
        }
    }

    
    async searchMovie(query: SearchMovieDto){
        const config = {
            method: 'GET',
            url: `${process.env.TMDB_BASE_URL}/3/search/movie`,
            params: { api_key:  process.env.TMDB_API_KEY, query:  query.query},
        };
       
        try {
            const res = await  axios(config)
            return res.data;
        } catch (error) {
            throw new NotFoundException('Sorry! No data found.');
        }
    }

    async addMovie(session_id: string, list_id: string, media_id: string){
      
        const config = {
            method: 'POST',
            url: `${process.env.TMDB_BASE_URL}/3/list/${list_id}/add_item`,
            params: { api_key:  process.env.TMDB_API_KEY, session_id:  session_id},
            headers: { 
                'Content-Type': 'application/json'
              },
            data: media_id
        };
      
        try {
            const res = await  axios(config)
          
            if(res.data.success === true && res.data.status_code === 12){
                const movieDetails = await this.movieDetails(media_id);
             
                if(movieDetails){
                    movieDetails.movie_id = movieDetails.id;
                    movieDetails.list_id = list_id;
                    movieDetails.favorite = 'unfavorite';
                    movieDetails.watchlist = 'no_watchlist_item';
                    movieDetails.rating = 0;
                   
                    await this.movieModel.create(movieDetails);
                  
                }
                return movieDetails;
            }else{
                throw new BadRequestException('No movie details found')
            }
            
        } catch (error) {
            throw new NotFoundException('Sorry! Movie is not added');
        }
    }

    async movieDetails(movie_id){
        const config = {
            method: 'GET',
            url: `${process.env.TMDB_BASE_URL}/3/movie/${movie_id.media_id}`,
            params: { api_key:  process.env.TMDB_API_KEY},
        };
      
        try {
            const res = await  axios(config)
           
            return res.data;
        } catch (error) {
            throw new NotFoundException('Sorry! Movie not added');
        }
    }

    async deleteMovie(session_id: string, list_id: string, media_id: string){
        const config = {
            method: 'POST',
            url: `${process.env.TMDB_BASE_URL}/3/list/${list_id}/remove_item`,
            params: { api_key:  process.env.TMDB_API_KEY, session_id: session_id },
            headers: { 
                'Content-Type': 'application/json'
              },
            data: media_id
        };
        
        try {
            const qry = await this.movieModel.findOneAndRemove({ media_id: media_id });
            console.log(qry)
            const res = await  axios(config)
           
            return res.data;
        } catch (error) {
            return 'success';
        }
    }

    async deleteAllMovie(session_id: string, list_id: string, status: boolean){
        const config = {
            method: 'POST',
            url: `${process.env.TMDB_BASE_URL}/3/list/${list_id}/clear`,
            params: { api_key:  process.env.TMDB_API_KEY, session_id: session_id, confirm:status },
        };
        
        try {
            await this.movieModel.deleteMany({list_id:list_id})
           
            const res = await  axios(config)
           
            return res.data;
        } catch (error) {
            return 'success';
        }
    }

    async getMovieDetails(movie_id: number){
        try {
            const res = await  this.movieModel.findOne({movie_id : movie_id})
            return res;
        } catch (error) {
            throw new NotFoundException('Sorry! Movie details not found');
        }
    }




    async addFavorite(session_id, account_id, favorite: FavoriteMovieDto){
        const config = {
            method: 'POST',
            url: `${process.env.TMDB_BASE_URL}/3/account/${account_id}/favorite`,
            params: { api_key:  process.env.TMDB_API_KEY, session_id:  session_id},
            data: favorite
        };
 
        try {
            const data = await  axios(config)
            .then(async (data) => {
                const update = await this.movieModel.findOne({ movie_id: favorite.media_id});
                update.favorite = 'favorite';

                await update.save();
                return data.data
            })
            .catch((err)=> {
                throw new NotFoundException('Sorry! Favorite movie not added');
            })
            return data;
        } catch (error) {
            throw new NotFoundException('Sorry! Movie is not marked as a favorite.');
        }
    }

    async addWatchlist(session_id, account_id, watchlistDto: WatchlistMovieDto){
        const config = {
            method: 'POST',
            url: `${process.env.TMDB_BASE_URL}/3/account/${account_id}/watchlist`,
            params: { api_key:  process.env.TMDB_API_KEY, session_id:  session_id},
            data: watchlistDto
        };
 
        try {
            const data = await  axios(config)
            .then(async (data) => {
                const update = await this.movieModel.findOne({ movie_id: watchlistDto.media_id});
                update.watchlist = 'watchlist_item';
                await update.save();
                return data.data
            })
            .catch((err)=> {
                throw new NotFoundException('Sorry! Favorite movie not added');
            })
            return data;
        } catch (error) {
            throw new NotFoundException('Sorry! Watchlist not added.');
        }
    }
    
    async addRating(session_id, movie_id, rating){
        const config = {
            method: 'POST',
            url: `${process.env.TMDB_BASE_URL}/3/movie/${movie_id}/rating`,
            params: { api_key:  process.env.TMDB_API_KEY, session_id:  session_id},
            data: rating
        };
 
        try {
            const data = await  axios(config)
            .then(async (data) => {
                const update = await this.movieModel.findOne({ movie_id: movie_id});
                update.rating = rating.value;
                await update.save();
                return data.data
            })
            .catch((err)=> {throw new NotFoundException('Sorry! Rating not added');})
            return data;
        } catch (error) {
            throw new NotFoundException('Sorry! Rating not added');
        }
    }

}

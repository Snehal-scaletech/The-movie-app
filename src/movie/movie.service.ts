import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {  InjectModel } from '@nestjs/mongoose';
import {  Model } from 'mongoose';
import axios from 'axios';
import { Genre, GenreDocument } from 'src/schemas/movie/genre.schema';
import { CreateListDto, SearchMovieDto } from './movie.dto';
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

    async getMovieList(){
        const config = {
            method: 'GET',
            url: `${process.env.TMDB_BASE_URL}/3/genre/movie/list`,
            params: { api_key:  process.env.TMDB_API_KEY },
        };

        try {
            const res = await  axios(config);
            res.data.genres.map(async (document) => { 
                await this.genreModel.create({genres_id : document.id, name: document.name})
            })
            
            return res.data;
        } catch (error) {
            throw new NotFoundException('Sorry! Movie list not found');
        }
    }

    async createList(session_id: any, params: CreateListDto){
        
        const config = {
            method: 'POST',
            url: `${process.env.TMDB_BASE_URL}/3/list`,
            params: { api_key:  process.env.TMDB_API_KEY, session_id:  session_id.session_id},
            headers: { 
                'Content-Type': 'application/json'
              },
            data: params
        };
        // console.log(config);
        try {
            const res = await  axios(config);
           
            if(res.data.success === true && res.data.status_code === 1){

                const getListData = await this.getListDetails(res.data.list_id)
                console.log(getListData)
                const lists_data = {
                    created_by: getListData.created_by,
                    favorite_count: getListData.favorite_count,
                    item_count: getListData.item_count,
                    iso_639_1: getListData.iso_639_1,
                    name : getListData.name,
                    description: getListData.description,
                    poster_path: getListData.language,
                    list_id: getListData.id
                }
                await this.listsModel.create(lists_data);
                return getListData;
            }else{
                throw new NotFoundException('No data found');
            }
          
        } catch (error) {
            throw new NotFoundException('Sorry! List is not created');
        }
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
            throw new NotFoundException('Sorry! List is not created');
        }
    }

    async getListDetailsById(list_id : string){
        const list = await this.getListDetails(list_id);
        console.log(list)
        return list;
    }

    async searchMovie(query: SearchMovieDto){
        const config = {
            method: 'GET',
            url: `${process.env.TMDB_BASE_URL}/3/search/movie`,
            params: { api_key:  process.env.TMDB_API_KEY, query:  query.query},
        };
        console.log(config);
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
        console.log(config)
        try {
            const res = await  axios(config)
            // console.log(res)
            if(res.data.success === true && res.data.status_code === 12){
                const movieDetails = await this.movieDetails(media_id);
                console.log(movieDetails);
                return movieDetails;
            }else{
                throw new BadRequestException('No movie details found')
            }
            
        } catch (error) {
            throw new NotFoundException('Sorry! Movie not added');
        }
    }

    async movieDetails(movie_id){
        const config = {
            method: 'GET',
            url: `${process.env.TMDB_BASE_URL}/3/movie/${movie_id.media_id}`,
            params: { api_key:  process.env.TMDB_API_KEY},
        };
        console.log(config)
        try {
            const res = await  axios(config)
            return res.data;
        } catch (error) {
            throw new NotFoundException('Sorry! Movie not added');
        }
    }

}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from 'src/schemas/movie/genre.schema';
import { Lists, ListsSchema } from 'src/schemas/movie/lists.schema';
import { Movie, MovieSchema } from 'src/schemas/movie/movie.schema';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';


const schemas = [
  {name: Genre.name, schema: GenreSchema}, 
  {name: Lists.name, schema: ListsSchema},
  {name: Movie.name, schema: MovieSchema},
];

@Module({
  imports: [MongooseModule.forFeature(schemas)],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService]
})
export class MovieModule {}

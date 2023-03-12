import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {getConnection} from 'typeorm';
import {Movie} from "./entities/movie.entity";

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private moviesRepository: Repository<Movie>,
    ) {
    }

    getAll(): Promise<Movie[]> {
        return this.moviesRepository.find();
    }

   /* searchYear(searchingYear: number): Promise<Movie[]> {
        return this.moviesRepository.find({where: year >= searchingYear})
    }*/

    findOne(id: string): Promise<Movie> {
        return this.moviesRepository.findOne({where: { id }});
    }

    async create(movie: Movie): Promise<void> {
        await this.moviesRepository.save(movie);
    }

    async remove(id: string): Promise<void> {
        await this.moviesRepository.delete(id);
    }

    async update(id: string, movie: Movie): Promise<void> {
        const existMovie = await this.moviesRepository.findOne({where: { id}});
        if (existMovie) {
            await getConnection()
                .createQueryBuilder()
                .update(Movie)
                .set({
                    title: movie.title,
                    year: movie.year,
                    genre: movie.genre
                })
                .where('id = :id', {id})
                .execute();
        }
    }

}

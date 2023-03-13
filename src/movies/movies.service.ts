import {Injectable, NotFoundException} from '@nestjs/common';
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
    };

    getAll(): Promise<Movie[]> {
        return this.moviesRepository.find();
    };

    /* searchYear(searchingYear: number): Promise<Movie[]> {
         return this.moviesRepository.find({where: year >= searchingYear})
     };*/

    findOne(id: string): Promise<Movie> {
        const movie = this.moviesRepository.findOne({where: {id}});
        if (!movie) {
            throw new NotFoundException(`Movie with id #${id} Not found.`);
        } else {
            return movie;
        } //if문 안타고 전부 다 리턴됨... 이율 모르겠다;;
    };

    async create(movieData: Movie): Promise<void> {
       //JSON.stringify(movieData.genre)
        await this.moviesRepository.save(movieData);
    };

    async deleteOne(id: string): Promise<void> {
        await this.findOne(id);
        await this.moviesRepository.delete(id);
    };

    async update(id: string, movieData: Movie): Promise<void> {
        const existMovie = await this.moviesRepository.findOne({where: {id}});
        if (existMovie) {
            await getConnection()   //여기서  Connection "default" was not found 에러나는데 모르겠음 ㅠㅠ
                .createQueryBuilder()
                .update(Movie)
                .set({
                    title: movieData.title,
                    year: movieData.year,
                    genre: movieData.genre
                })
                .where('id = :id', {id})
                .execute();
        }
    };

}

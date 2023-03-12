import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Query} from '@nestjs/common';
import {MoviesService} from "./movies.service";
import {Movie} from "./entities/movie.entity";

@Controller('movies')  //이 부분이 url의 entry point를 정함. 즉, express의 라우터 부분이 되는 것.
export class MoviesController {
    constructor(private moviesService: MoviesService) {
    };

    @Get()
    getAll() {
        return this.moviesService.getAll();
    }

    // @Get('/search')
    // searchYear(@Query('year') searchingYear: number) {
    //     this.moviesService.searchYear(searchingYear);
    //     return `We're searching for a movie made after: ${searchingYear}`
    // }

    @Get('/:id')
    getOne(@Param('id') movieId: string) {  //원하는게 있으면 요청을 해. 말을 하면 돼. id값을 원하면 파라미터 달라고 요청해. @Param이란 parameter의 decorator을 사용해서 말이지. movieId: string은 파람에 들어온 id를 movieId라는 string 타입으로 저장하는 것.
        return this.moviesService.findOne(movieId);
    }

    @Post()
    create(@Body() movieData: Movie) {  //네스트에서는 원하는게 있음 이렇게 다 요청을 하면 됨! 바디가 필요하면 바디를 달라고 하세욧~!
        return this.moviesService.create(movieData);
    }

    @Patch('/:id')  //put을 쓰면 movie 몽땅 다 업뎃해버림. patch 쓰면 하려는 애만 업뎃됨.
    // patch(@Param('id') movieId: string, @Body() updateData) {
    //     return {
    //         updatedMovie: movieId,
    //         ...updateData
    //     };
    update(@Param('id') movieId: string, @Body() updateData) {
        this.moviesService.update(movieId, updateData);
        return `This action will update a #${movieId} movie`;
    }

    @Delete('/:id')
    remove(@Param('id') movieId: string) {
        this.moviesService.remove(movieId);
        return `This action will remove a #${movieId} movie`;
    };

}

import {MiddlewareConsumer, Module, NestMiddleware, RequestMethod} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
// import {UsersModule} from './auth/users/users.module';
import {User} from './auth/entity/user.entity';
import {AuthMiddleware} from "./middleware/auth.middleware";
import {AuthModule} from './auth/auth.module';
import {MoviesController} from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import {Movie} from "./movies/entities/movie.entity";
import { MoviesModule } from './movies/movies.module';

//module 소스 - 모듈을 정의합니다.(controller와 service 정의)
//⭐앱 모듈(루트 모듈 비슷)에 우리가 하는 모든것 다 임포트 해야 함. 왜?! NestJS가 내 앱 만들기 위해 이용하는게 앱모듈임(main.ts 들어가보면 const app = await NestFactory.create(AppModule) 있음)
@Module({  //네스트 쓰려면 데코레이터에 익숙해져야 함. 데코레이터는 class에 function을 더해줌
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 13306,
            username: 'root',
            password: 'root',
            database: 'test',
            entities: [/*User,*/ Movie],
            synchronize: true,  //synchronize: true는 운영에서는 사용하지 마세요.
        }),
        // UsersModule,
        //AuthModule,
        MoviesModule],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule implements NestMiddleware {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes({path: 'users', method: RequestMethod.GET});
    }

    use(req: any, res: any, next: (error?: any) => void): any {
    }
}
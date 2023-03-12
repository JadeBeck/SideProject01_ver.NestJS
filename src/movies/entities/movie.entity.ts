//서비스로 보내고 받을 class(interface)(즉, movie를 구성하는것 그 자체)를 export.

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('movie')
export class Movie{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    year: number;

    @Column()
    genre: string;
}
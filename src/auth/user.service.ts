import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { FindOneOptions } from "typeorm";
import {UserRepository} from "./user.repository";
import {UserDTO} from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserRepository)
                private userRepository: UserRepository
    ) {}

    async findByFields(options: FindOneOptions<UserDTO>): Promise<UserDTO | undefined> {
        return await this.userRepository.findOne(options);
    }

    async save(userDTO: UserDTO) : Promise<UserDTO | undefined> {
        return await this.userRepository.save(userDTO);
    }
}
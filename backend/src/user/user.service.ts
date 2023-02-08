import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { HashService } from '../hash/hash.service'
import { SignupUserDto } from './dto/signup-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entity/user.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly hashService: HashService,
    ) {
    }

    public async signup(signupUserDto: SignupUserDto) {
        const { password } = signupUserDto

        return this.userRepository.save(await this.userRepository.create({
            ...signupUserDto,
            password: await this.hashService.create(password),
        }))
    }

    public async findOne(query: FindOneOptions<User>) {
        return this.userRepository.findOne(query)
    }

    public async findById(id: number) {
        return this.userRepository.findOneOrFail({ where: { id } })
    }

    public async update(id: number, updateUserDto: UpdateUserDto) {
        const { password } = updateUserDto

        return this.userRepository.save({
            id,
            ...updateUserDto,
            password: await this.hashService.create(password),
        } as User)
    }
}

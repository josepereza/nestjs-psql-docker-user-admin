import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from '../entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async createUser(user: User): Promise<User> {
        return this.userRepository.save(user)
    }

    async findAllUsers(): Promise<User[]> {
        return this.userRepository.find()
    }

    async findUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } })
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found.`)
        }
        return user
    }

    async updateUser(id: number, updateUserDto: Partial<User>): Promise<User> {
        const user = await this.findUserById(id)
        this.userRepository.merge(user, updateUserDto)
        return await this.userRepository.save(user)
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.findUserById(id)
        await this.userRepository.remove(user)
    }
}

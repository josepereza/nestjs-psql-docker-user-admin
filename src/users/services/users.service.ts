import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { User } from '../entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from '../dtos/create-user.dto'
import { UpdateUserDto } from '../dtos/update-user.dto'
import { Role } from 'src/roles/entities/role.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.findUserByEmail(createUserDto.email)

        if (existingUser)
            throw new ConflictException(
                `User with email ${createUserDto.email} is already registered.`,
            )

        const userRole = await this.roleRepository.save({ name: 'user' })
        const user = this.userRepository.create({
            ...createUserDto,
            roleId: userRole.id,
        })
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

    async findUserByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email } })
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findUserById(id)
        this.userRepository.merge(user, updateUserDto)
        return await this.userRepository.save(user)
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.findUserById(id)

        if (user.is_deleted)
            throw new ConflictException(`User with ID ${id} is already deleted.`)

        user.is_deleted = true
        await this.userRepository.save(user)
    }
}

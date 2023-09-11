import {
    BadRequestException,
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
        const role = await this.roleRepository.findOne({where: { id: user.roleId }})

        if (user.is_deleted)
            throw new ConflictException(`User with ID ${id} is already deleted`)

        this.userRepository.merge(user, updateUserDto)

        user.updated_at = new Date()
        role.updated_at = new Date()
        
        await this.roleRepository.save(role)
        return await this.userRepository.save(user)
    }

    async updateUserRole(id: number, role: string): Promise<User> {
        // check if the user exists
        const user = await this.findUserById(id)
        const userCurrentRole = await this.roleRepository.findOne({where: { id: user.roleId }})


        // check if the new role is either 'admin' or 'user'
        if (role !== 'admin' && role !== 'user') 
            throw new BadRequestException('Invalid role. Role must be either "admin" or "user".')

        // check if the user already has the given role
        if (role == userCurrentRole.name)
            throw new BadRequestException(`User already has the role "${role}".`)

        // update the user's role and the updated_at column
        user.updated_at = new Date()
        userCurrentRole.updated_at = new Date()

        await this.roleRepository.save(userCurrentRole)
        return await this.userRepository.save(user)
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.findUserById(id)

        if (user.is_deleted)
            throw new ConflictException(`User with ID ${id} is already deleted.`)

        const role = await this.roleRepository.findOne({where: { id: user.roleId }})

        user.is_deleted = true
        role.is_deleted = true

        await this.userRepository.save(user)
        await this.roleRepository.save(role)
    }
}

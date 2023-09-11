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
        // check whether user already exists
        const existingEmail = await this.findUserByEmail(createUserDto.email)
        const existingPhone = await this.findUserByPhone(createUserDto.phone)

        if (existingEmail)
            throw new ConflictException(
                `User with email ${createUserDto.email} is already registered.`,
            )

        if (existingPhone)
            throw new ConflictException(
                `User with phone ${createUserDto.phone} is already registered.`,
            )

        // create a brand new role for the brand new user, link them and create user
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

    async findUserByPhone(phone: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { phone } })
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        // check whether user already exists
        const existingEmail = await this.findUserByEmail(updateUserDto.email)
        const existingPhone = await this.findUserByPhone(updateUserDto.phone)
   
        if (existingEmail.id !== id)
            throw new ConflictException(
                `User with email ${updateUserDto.email} is already registered.`,
            )

        if (existingPhone.id !== id)
            throw new ConflictException(
                `User with phone ${updateUserDto.phone} is already registered.`,
            )


        // check if user exists and get the role
        const user = await this.findUserById(id)
        const role = await this.roleRepository.findOne({ where: { id: user.roleId } })

        if (user.is_deleted)
            throw new ConflictException(`User with ID ${id} is already deleted`)

        // update user's with given info and record update date
        this.userRepository.merge(user, updateUserDto)

        user.updated_at = new Date()
        role.updated_at = new Date()

        await this.roleRepository.save(role)
        return await this.userRepository.save(user)
    }

    async updateUserRole(id: number, role: string): Promise<User> {
        // check if the user exists
        const user = await this.findUserById(id)
        const userCurrentRole = await this.roleRepository.findOne({ where: { id: user.roleId } })


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
        // check whether user has been deleated already
        const user = await this.findUserById(id)

        if (user.is_deleted)
            throw new ConflictException(`User with ID ${id} is already deleted.`)

        // get user's role and update both 
        const role = await this.roleRepository.findOne({ where: { id: user.roleId } })

        user.is_deleted = true
        role.is_deleted = true

        await this.userRepository.save(user)
        await this.roleRepository.save(role)
    }
}

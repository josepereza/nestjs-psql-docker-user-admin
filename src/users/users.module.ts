import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolesModule } from 'src/roles/roles.module';
import { Role } from 'src/roles/entities/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User]), RolesModule],
    providers: [UsersService],
    controllers: [UsersController]
})

export class UsersModule { }

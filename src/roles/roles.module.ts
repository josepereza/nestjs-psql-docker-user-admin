import { Module } from '@nestjs/common'
import { RolesController } from './controllers/roles.controller'
import { RolesService } from './services/roles.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './entities/role.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    controllers: [RolesController],
    providers: [RolesService],
    exports: [TypeOrmModule],
})
export class RolesModule { }

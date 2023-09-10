import { Controller } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from 'src/users/entities/role.entity'
import { Repository } from 'typeorm'

@Controller('roles')
export class RolesController {
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    ) { }

    
}

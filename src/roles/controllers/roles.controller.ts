import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { Role } from '../entities/role.entity'
import { RolesService } from '../services/roles.service'
import { CreateRoleDto } from '../dtos/create-role.dto'
import { UpdateRoleDto } from '../dtos/update-role.dto'

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Post()
    async createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
        return this.rolesService.createRole(createRoleDto)
    }

    @Get()
    async findAllRoles(): Promise<Role[]> {
        return await this.rolesService.findAllRoles()
    }

    @Get(':id')
    async findRoleById(@Param('id') id: number): Promise<Role> {
        return await this.rolesService.findRoleById(id)
    }

    @Patch(':id')
    async updateRole(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
        return await this.rolesService.updateRole(id, updateRoleDto)
    }

    @Delete(':id')
    async deleteRole(@Param('id') id: number): Promise<void> {
        return await this.rolesService.deleteRole(id)
    }
}

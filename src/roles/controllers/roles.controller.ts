import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { Role } from '../entities/role.entity'
import { RolesService } from '../services/roles.service'

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Post()
    async createRole(@Body() createRoleDto: Role): Promise<Role> {
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
    async updateRole(@Param('id') id: number, @Body() updateRoleDto: Partial<Role>): Promise<Role> {
        return await this.rolesService.updateRole(id, updateRoleDto)
    }

    @Delete(':id')
    async deleteRole(@Param('id') id: number): Promise<void> {
        return await this.rolesService.deleteRole(id)
    }
}

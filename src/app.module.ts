import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { RolesController } from './users/controllers/roles/roles.controller';
import { RolesService } from './users/services/roles/roles.service';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'db',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'postgres',
            entities: [],
            synchronize: true,
            autoLoadEntities: true,
        }),
        UsersModule
    ],
    controllers: [AppController, RolesController],
    providers: [AppService, RolesService],
})
export class AppModule { }

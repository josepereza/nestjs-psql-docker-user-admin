import { Role } from 'src/roles/entities/role.entity'
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, ManyToOne, JoinColumn } from 'typeorm'

@Entity('users')
@Unique(['email', 'phone'])
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    full_name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ unique: true })
    phone: string

    @Column({ name: 'role_id' })
    roleId: number

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'role_id' })
    role: Role

    @Column({ default: false })
    is_deleted: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

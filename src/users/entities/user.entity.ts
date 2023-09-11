import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm'

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

    @Column({ default: 'user' })
    role: string

    @Column({ default: false })
    is_deleted: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

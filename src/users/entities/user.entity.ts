import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    full_name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    phone: string

    @Column()
    role: string

    @Column({ default: false })
    is_deleted: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

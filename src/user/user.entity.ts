import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: string

    @Column()
    last_name: string

    @Column()
    first_name: string
    
    @Column()
    address: string

    @Column()
    phone_number: string

    @Column({default: true})
    isActive: boolean
}
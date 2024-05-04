import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity({name: "users"})
export class User {
    @PrimaryColumn()
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
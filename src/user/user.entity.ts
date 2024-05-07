import { UUID } from "crypto";
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";

@Entity({name: "users"})
export class User {
    @PrimaryColumn('uuid')
    user_id: string

    @Column()
    last_name: string

    @Column()
    first_name: string
    
    @Column()
    address: string

    @Column()
    phone_number: string

    @PrimaryGeneratedColumn()
    isActive: boolean

    @Column()
    birth_day: Date
}

@Entity({name: "users_login_credentials"})
export class LoginCredentials {
    @PrimaryGeneratedColumn('uuid')
    credential_id: string

    @Column("uuid")
    user_id: string

    @Column()
    user_name: string

    @Column()
    password: string
    
} 
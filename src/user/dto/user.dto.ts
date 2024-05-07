import { UUID } from "crypto"

export class UserDTO {
    user_id: string
    last_name: string
    first_name: string
    address: string
    phone_number: string
    birth_day: Date
    isActive: boolean
    credential_id: string
    user_name: string
    password: string
}
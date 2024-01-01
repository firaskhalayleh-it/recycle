import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
export const ROLES = {
    USER : 'user',
    ADMIN: 'admin',
    COSTOMER: 'costomer',
    DRIVER: 'driver',
    SELLER: 'seller'

}
@Entity()
export class Roles extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({nullable: true ,type:'enum', enum: ROLES, default: ROLES.USER})
    name: string;

 
}
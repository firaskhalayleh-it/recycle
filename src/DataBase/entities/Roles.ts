import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { User } from "./user";
export const ROLES = {
    USER: 'user',
    ADMIN: 'admin',
    COSTOMER: 'costomer',
    DRIVER: 'driver',
    SELLER: 'seller'

}
@Entity()
export class Roles extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: true, type: 'enum', enum: ROLES, default: null })
    name: string;

    @OneToMany(() => User, user => user.role)
    users: User[];


}
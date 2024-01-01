import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";


@Entity()
export class UserAddress extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(()=> User, {cascade: true})
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    user: User;

    @Column({nullable: true})
    address: string;
    
    @Column({nullable: true})
    city: string;

    @Column({nullable: true})
    country: string;

    @Column({nullable: true})
    telephone: string;

    @Column({nullable: true})
    mobile: string;
}
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";

@Entity()
export class UserPayment extends BaseEntity{
    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @OneToOne(()=> User, {cascade: true})
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    user: User;

    @Column({nullable: true})
    card_number: string;
    
    @Column({nullable: true})
    provider: string;

    @Column({nullable: true})
    expire_date: string;

    @Column({nullable: true})
    cvv: string;


}

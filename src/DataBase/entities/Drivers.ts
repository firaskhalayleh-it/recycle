import { BaseEntity, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderItems } from "./order_items";
import { User } from "./user";


@Entity()
export class Drivers extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(()=>OrderItems , orderItems => orderItems.order)
    orderitems: OrderItems[];

    @OneToOne(()=>User, user => user.id)
    user: User;
}
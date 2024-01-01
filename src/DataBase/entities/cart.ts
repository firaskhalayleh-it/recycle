import { BaseEntity, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";


@Entity()
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(()=>Order, order => order.id)
   @JoinColumn({
        name: 'order_id',
        referencedColumnName: 'id'
   })
    orders: Order[];
}
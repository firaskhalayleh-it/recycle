import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";
import { Product } from "./product";

@Entity()
export class OrderItems extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(()=>Order , {cascade: true})
    @JoinColumn({
        name: 'order_id',
        referencedColumnName: 'id'
    })
    order: Order;

    @OneToOne(()=>Product , {cascade: true})
    @JoinColumn({
        name: 'product_id',
        referencedColumnName: 'id'
    })
    product: Product;

    @Column({nullable: true})
    quantity: number;

    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column()
    updated_at: Date;

}

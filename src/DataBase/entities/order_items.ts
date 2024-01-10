import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";
import { Product } from "./product";

@Entity()
export class OrderItems extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Order, order => order.id)
    @JoinColumn({
        name: 'order_id',
        referencedColumnName: 'id'
    })
    order: Order[];
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column()
    updated_at: Date;

}

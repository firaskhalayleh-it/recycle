import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Cart } from "./cart";
import { UserPayment } from "./user_payment";
import { OrderItems } from "./order_items";
import { Product } from "./product";

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    total: number;

    @Column({ nullable: true })
    status: string;


    @OneToOne(() => Product, { cascade: true })
    @JoinColumn()
    product: Product;

    @ManyToOne(() => OrderItems, { cascade: true ,nullable:true})
    @JoinColumn()
    order_items: OrderItems;

    

    @Column({ nullable: true })
    quantity: number;

    @ManyToOne(() => User)
    customer: User;

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    cerated_at: Date;

    @Column({ nullable: true, type: 'timestamp' })
    updated_at: Date;

    @Column({ nullable: true, type: 'timestamp' })
    deleted_at: Date;

}
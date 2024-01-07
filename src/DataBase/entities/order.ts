import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Cart } from "./cart";
import { UserPayment } from "./user_payment";
import { OrderItems } from "./order_items";
import { Product } from "./product";

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

   
    @Column({ nullable: true })
    total: number;

    @Column({ nullable: true })
    status: string;

    @OneToOne(() => User, { cascade: true })
    @JoinColumn({
        name: 'provider_id',
        referencedColumnName: 'id'
    })
    provider: User;

    @OneToOne(() => Product, { cascade: true })
    @JoinColumn({
        name: 'product_id',
        referencedColumnName: 'id'
    })
    product: Product;


    @OneToOne(() => User, { cascade: true })
    @JoinColumn({
        name: 'customer_id',
        referencedColumnName: 'id'
    })
    customer: User;

   @Column({ nullable: true })
   quantity: number;


    @OneToOne(() => UserPayment, { cascade: true })
    @JoinColumn({
        name: 'payment_id',
        referencedColumnName: 'id'
    })
    payment_id: UserPayment;

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    cerated_at: Date;

    @Column({ nullable: true, type: 'timestamp' })
    updated_at: Date;

    @Column({ nullable: true, type: 'timestamp' })
    deleted_at: Date;

}
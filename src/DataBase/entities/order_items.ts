import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";
import { Product } from "./product";
import { UserPayment } from "./user_payment";
import { User } from "./user";

@Entity()
export class OrderItems extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Order, order => order.orderItems)
    order: Order[];

    @OneToOne(() => User, { cascade: true })
    @JoinColumn()
    customer: User;

    @OneToOne(() => UserPayment, { cascade: true })
    @JoinColumn()
    user_payment: UserPayment;
    
    @Column({ nullable: true })
    total: number;

    @Column({ nullable: true })
    delevary_status: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column()
    updated_at: Date;

    

}

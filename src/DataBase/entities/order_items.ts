import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";
import { Product } from "./product";
import { UserPayment } from "./user_payment";
import { User } from "./user";
import { Drivers } from "./Drivers";

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

    @ManyToOne ( () => Drivers, drivers => drivers.orderitems)
    @JoinColumn()
    driver: Drivers;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;


    

}

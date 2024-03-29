import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderItems } from "./order_items";
import { User } from "./user";


@Entity()
export class Drivers extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => OrderItems, orderItem => orderItem.driver)
    @JoinColumn()
    orderitems: OrderItems[];

    @OneToOne(() => User, user => user.id)
    @JoinColumn()
    user: User;

    @Column({ nullable: true })
    status: string;


    isAvilable() {
        
        if (this.orderitems.length > 5) {
            this.status = 'busy';
        }
        else {
            this.status = `available, ${5 - this.orderitems.length} orders left.`;
        }
    }

}
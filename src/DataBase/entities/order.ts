import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Cart } from "./cart";

@Entity()   
export class Order extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
        id: number;
    
    @OneToOne(()=> User, {cascade: true})
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
        user: User;

    @Column({nullable: true})
    total: number;

    @Column({nullable: true,type:'boolean'})
    status: boolean;

    @OneToOne(()=> User, {cascade: true})
    @JoinColumn({
        name: 'provider_id',
        referencedColumnName: 'id'
    })
        provider: User;

        @ManyToOne(() => Cart, cart => cart.orders)
        cart: Cart;
        
    @Column({nullable: true})
    payment_id: number;

    @Column({nullable: true,type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    cerated_at: Date;   

    @Column({nullable: true,type:'timestamp'})
    updated_at: Date;

    @Column({nullable: true,type:'timestamp'})
    deleted_at: Date;

    }
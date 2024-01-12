import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ProductCategory } from "./product_category";
import { Discount } from "./discount";
import { User } from "./user";
import { Order } from "./order";


@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true, type: 'decimal' })
    price: number;

    @ManyToMany(() => ProductCategory, category => category.products)
    @JoinTable() 
    categories: ProductCategory[];

    @Column({ nullable: true })
    quantity: number;


    @OneToOne(() => Discount, { cascade: true })
    @JoinColumn({
        name: 'discount_id',
        referencedColumnName: 'id'
    })
    discount: Discount;

    @ManyToOne(()=>User, user=>user.id ,{ eager:true, nullable:true,})
    @JoinColumn({
        name: 'provider_id',
        referencedColumnName: 'id'
    })
    provider: User;

    @OneToOne(()=>Order,{ eager:true, nullable:true})
    @JoinColumn({
        name: 'order_id',
        referencedColumnName: 'id'
    })
    order: Order;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    getDiscountedPrice() {
        if (this.discount && this.discount.active) {
            const discountAmount = this.price * (this.discount.discount_percent / 100);
            return this.price - discountAmount;
        }
        return this.price; 
    }

    isOutOfStock() {
        return this.quantity <= 0;
    }

   
}
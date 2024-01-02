import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductCategory } from "./product_category";
import { ProductInventory } from "./product_inventory";
import { Discount } from "./discount";


@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true, type:'decimal' })
    price: number;

    @OneToOne(()=> ProductCategory, {cascade: true})
    @JoinColumn({
        name: 'category_id',
        referencedColumnName: 'id'
    })
    category: ProductCategory;
    
    @OneToOne(()=> ProductInventory, {cascade: true})
    @JoinColumn({
        name: 'inventory_id',
        referencedColumnName: 'id'
    })
    inventory: ProductInventory;

    @OneToOne(()=> Discount, {cascade: true})
    @JoinColumn({
        name: 'discount_id',
        referencedColumnName: 'id'
    })
    discount: Discount;

    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    deleted_at: Date;

}
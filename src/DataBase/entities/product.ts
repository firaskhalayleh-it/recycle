import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductCategory } from "./product_category";
import { Discount } from "./discount";


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


    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    deleted_at: Date;

}
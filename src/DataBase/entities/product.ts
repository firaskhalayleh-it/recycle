import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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
    image: Buffer;

    @Column({ nullable: true, type: 'decimal' })
    price: number;

    @ManyToMany(() => ProductCategory, category => category.products)
    @JoinTable({
        name: 'product_category',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'category_id',
            referencedColumnName: 'id'
        }
    })
    category: ProductCategory;

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
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";


export const productCategory = {
    plastic: 'plastic',
    wood: 'wood',
    metal: 'metal',
    glass: 'glass',
    paper: 'paper',
    other: 'other'
}

@Entity()
export class ProductCategory extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: true, type: 'enum', enum: productCategory, default: productCategory.other })
    name: string;

    @ManyToMany(() => Product, product => product.category)
    @JoinTable({
        name: 'product_category',
        joinColumn: {
            name: 'category_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'product_id',
            referencedColumnName: 'id'
        }
    })
    products: Product[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp'})
    updated_at: Date;

    


}
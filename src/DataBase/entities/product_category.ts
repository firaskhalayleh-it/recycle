import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";


export const productCategory = {
    plastic : 'plastic',
    wood : 'wood',
    metal : 'metal',
    glass : 'glass',
    paper : 'paper',
    other : 'other'
}

@Entity()
export class ProductCategory extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: true, type: 'enum', enum: productCategory, default: productCategory.other })
    name: string;

    @Column({ nullable: true })
    description: string;

    @ManyToMany(() => Product, product => product.category)
    @JoinTable()
    products: Product[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    deleted_at: Date;


}
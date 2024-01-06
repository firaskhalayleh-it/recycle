import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @Column({ nullable: true })
    name: string;

    @ManyToMany(() => Product, product => product.categories)
    products: Product[];
    

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;




}
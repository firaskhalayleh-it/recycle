import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";


@Entity()
export class ProductCategory extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => Product, product => product.category)
    products: Product[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    deleted_at: Date;


}
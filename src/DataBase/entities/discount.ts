import { 
    BaseEntity, 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    DeleteDateColumn,
    OneToOne
} from "typeorm";
import { Product } from "./product";

@Entity()
export class Discount extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true, type: 'decimal' })
    discount_percent: number;

    @Column({ type: 'boolean', default: true })
    active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToOne(() => Product)
    product: Product;

    isActive() {
        return this.active && !this.deleted_at;
    }
}

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


    @Column({ nullable: true })
    start_date: Date;

    @Column({ nullable: true })
    end_date: Date;

    @OneToOne(() => Product)
    product: Product;

    isActive() {
        return this.active;
    }
}

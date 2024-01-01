import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ProductInventory extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    quantity: number;

    @Column({ nullable: true, type:'timestamp' })
    created_at: Date;

    @Column({ nullable: true, type:'timestamp' })
    updated_at: Date;

    @Column({ nullable: true, type:'timestamp' })
    deleted_at: Date;
}
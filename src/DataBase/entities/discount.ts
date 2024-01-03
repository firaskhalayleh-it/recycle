import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Discount extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true, type: 'decimal' })
    discount_percent: number;


    @Column({ type: 'boolean', default: true })
    active: boolean;

    @Column({ nullable: true, type: 'timestamp' })
    created_at: Date;

    @Column({ nullable: true, type: 'timestamp' })
    updated_at: Date;

    @Column({ nullable: true, type: 'timestamp' })
    deleted_at: Date;

}
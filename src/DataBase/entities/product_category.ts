import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ProductCategory extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    description: string;

    

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    deleted_at: Date;

    
}
import { BaseEntity, BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';
import { Roles } from './Roles';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    username: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    first_name: string;

    @Column({ nullable: false })
    last_name: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    telephone: string;

    @OneToOne(() => Roles, { cascade: true ,eager:true,nullable:true})
    @JoinColumn({ name: 'role_id' }) 
    role: Roles;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({nullable:true}) 
    updated_at: Date;

    @BeforeInsert()
    encryptPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}

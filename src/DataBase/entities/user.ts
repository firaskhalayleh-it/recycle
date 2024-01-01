import  { BaseEntity, BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';
import { Roles } from './Roles';


@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: true})
    username: string;

    @Column({nullable: true})
    password: string;

    @Column({nullable: true})
    first_name: string;

    @Column({nullable: true})
    last_name: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    telephone: string;

  
    @OneToOne(()=> Roles, {cascade: true})
    @JoinColumn({
        name: 'role_id',
        referencedColumnName: 'id'
    })
    role: Roles;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({type: 'timestamp'})
    updated_at: Date;

    @BeforeInsert()
    encryptPassword(){
        this.password = bcrypt.hashSync(this.password, 10);
    }
}
import { BaseEntity, BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import bcrypt from 'bcrypt';
import { Roles } from './Roles';
import { UserAddress } from './user_address';
import { Product } from './product';
import { Order } from './order';
import { Drivers } from './Drivers';

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

  @OneToMany(() => Order, order => order.customer, { nullable: true })
  orders: Order[];

  @OneToMany(() => Product, product => product.provider)
  @JoinColumn({ name: 'products_id', referencedColumnName: 'id' })
  products: Product[];

  @ManyToOne(() => Roles, role => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Roles;

  @OneToOne(() => UserAddress, userAddress => userAddress.user, { nullable: true })
  @JoinColumn()
  userAddress: UserAddress;


  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;


  @BeforeInsert()
  encryptPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }



}

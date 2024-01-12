import typeorm, { BaseEntity, DataSource, Entity } from 'typeorm';
import { User } from './entities/user';
import { Roles } from './entities/Roles';
import { UserAddress } from './entities/user_address';
import { Discount } from './entities/discount';
import { Order } from './entities/order';
import { OrderItems } from './entities/order_items';
import { Product } from './entities/product';
import { ProductCategory } from './entities/product_category';
import { UserPayment } from './entities/user_payment';

const Datasource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'recycle',
    entities: [User, Roles, UserAddress, Discount, Order, OrderItems, Product, ProductCategory, UserPayment],
    synchronize: true,
    logging: false,
    dropSchema:false                                                                                                                                                                                                                                                                                                    
    

});



const initilizeDB = async () => {
    await Datasource.initialize().then(async () => {
        console.log('database is connected');
    }).catch((err) => {
        console.log(err);
    })
}

export default { Datasource, initilizeDB };

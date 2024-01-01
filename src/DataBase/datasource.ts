import typeorm, { BaseEntity, DataSource, Entity } from 'typeorm';
import { User } from './entities/user';
import { Roles } from './entities/Roles';
import { UserAddress } from './entities/user_address';

const Datasource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'recycle',
    entities: [User,Roles,UserAddress],
    synchronize: true,
    logging: false,

});

const initilizeDB = async () =>{
    await Datasource.initialize().then(async ()=>{
        console.log('database is connected');
    }).catch((err)=>{
        console.log(err);
    })
}

export default {Datasource, initilizeDB};
    
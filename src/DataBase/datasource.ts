import typeorm, { BaseEntity, DataSource, Entity } from 'typeorm';

const Datasource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: [],
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
    
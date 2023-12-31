import express from 'express';
import datasource from './DataBase/datasource.js';

const app = express();
const port = 3000;

app.get('/', (req,res)=>{
    res.send('this web server is working');
    console.log('this web server is working');
})

app.listen(port, ()=>{
    datasource.initilizeDB();
    console.log(`server is listening on port ${port}`);
})


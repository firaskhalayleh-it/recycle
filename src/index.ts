import express from 'express';
import datasource from './DataBase/datasource.js';
import router from './routes/UserRoutes.ts/UserRoute.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', router);

app.listen(port, ()=>{
    datasource.initilizeDB();
    console.log(`server is listening on port ${port}`);
})


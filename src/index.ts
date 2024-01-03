import express from 'express';
import datasource from './DataBase/datasource.js';
import router from './routes/UserRoutes/UserRoute.js';
import routerAddress from './routes/UserRoutes/UserAddressRoute.js';
import routerPayment from './routes/UserRoutes/userPaymentRoutes.js';
import ProductRoute from './routes/Product Routes/ProductRoute.js';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', router);
app.use('/api', routerAddress);
app.use('/api', routerPayment);
app.use('/api', ProductRoute)

app.listen(port, () => {
    datasource.initilizeDB();
    console.log(`server is listening on port ${port}`);
})


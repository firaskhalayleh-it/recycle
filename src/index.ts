import express from 'express';
import datasource from './DataBase/datasource';
import router from './routes/UserRoutes/UserRoute';
import routerAddress from './routes/UserRoutes/UserAddressRoute';
import routerPayment from './routes/UserRoutes/userPaymentRoutes';
import ProductRoute from './routes/Product Routes/ProductRoute';
import cookieParser from 'cookie-parser';
const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', router);
app.use('/api', routerAddress);
app.use('/api', routerPayment);
app.use('/api', ProductRoute);

app.listen(port, () => {
    datasource.initilizeDB();
    console.log(`server is listening on port ${port}`);
})


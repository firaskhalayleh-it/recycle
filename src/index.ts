import express from 'express';
import path from 'path';
import cors from 'cors';
import datasource from './DataBase/datasource';
import router from './routes/UserRoutes/UserRoute';
import routerAddress from './routes/UserRoutes/UserAddressRoute';
import routerPayment from './routes/UserRoutes/userPaymentRoutes';
import ProductRoute from './routes/Product Routes/ProductRoute';
import orderRouter from './routes/Order Routes/OrderItemRoute';
import orderITemsRouter from './routes/Order Routes/OrderItemsRoute';
import DiscountRouter from './routes/Discount Route/DiscountRoute';
import AdminRoute from './routes/RolesRoutes.ts/AdminRoute';
import SellerRoute from './routes/RolesRoutes.ts/SellerRoute';
import DriverRoute from './routes/RolesRoutes.ts/DriverRoute';

import cookieParser, { signedCookies } from 'cookie-parser';
const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(cors());
const publicPath = path.join("./public/");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));
app.use(cookieParser());
app.use(express.json());




app.use('/api', router);
app.use('/api', routerAddress);
app.use('/api', routerPayment);
app.use('/api', ProductRoute);
app.use('/api', orderRouter);
app.use('/api', orderITemsRouter);
app.use('/api', DiscountRouter);
app.use('/api', AdminRoute);
app.use('/api', SellerRoute);
app.use('/api', DriverRoute);



 app.listen (port, () => {
     datasource.initilizeDB();
    console.log(`server is listening on port ${port}`);
})



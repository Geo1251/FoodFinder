import express from 'express';
import sequelize from './database.js';
import router from './router.js';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Product from './product.js'; 
import productsData from './productsData.js';

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use(cookieParser());
app.use('/api', router);

async function startApp() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connected to DB');
        const productCount = await Product.count();
        if (productCount === 0) {
            await Product.bulkCreate(productsData);
            console.log('Products data has been added to the database');
        } else {
            console.log('Products data already exists in the database');
        }
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT', PORT));
    } catch (e) {
        console.log(e);
    }
}

startApp();
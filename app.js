const express = require('express');
const http=require('http')
const fs=require('fs');
const bodyParser = require('body-parser');

//const utils=require('./utils/task-schema.js')

const productController=require('./controller/productController');
const orderController=require('./controller/orderController');


const app=express();

const port=5000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//products api 
app.get('/products',productController.getProducts)

app.post('/products',productController.createProducts);

//Order APIs

app.get('/orders',orderController.getOrders)
app.post('/orders',orderController.createOrders);
app.get('/orders/:id',orderController.getOrdersByID)
app.get('/orders/users/:id',orderController.allUserDetails)

module.exports = app


app.listen(port,()=>{
console.log("Listening Port!! "+port);
})




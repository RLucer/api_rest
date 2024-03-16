const express = require("express");
const { readData, writeData } = require("./fuction");
require('dotenv').config()
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3001;

app.use(bodyParser.json());  //middleware  recibe lo que vienen el body y lo parsea a json


app.delete('/cars/:id',(req,res)=>{
    const data = readData();//leer archivo
    const id = parseInt(req.params.id)
    const carIndex = data.cars.findIndex(car => car.id === id)
    data.cars.splice(carIndex,1)
    writeData(data);
      res.json({message: 'Auto eliminado'});
});


app.delete('/dishes/:id',(req,res)=>{
    const data = readData();//leer archivo
    const id = parseInt(req.params.id)
    const dishIndex = data.dishes.findIndex(dish => dish.id === id)
    data.dishes.splice(dishIndex,1)
    writeData(data);
      res.json({message: 'plato eliminado'});
});


app.put('/cars/:id',(req,res)=>{
    const data = readData();//leer archivo
    const body = req.body; //obtendo el contenido del body
    const id = parseInt(req.params.id);
    const carIndex = data.cars.findIndex(car => car.id === id)
    data.cars[carIndex] = {
        id,
        ...body
    }
    writeData(data)
    res.json('car actualizado');
});


app.put('/dishes/:id',(req,res)=>{
    const data = readData();//leer archivo
    const body = req.body; //obtendo el contenido del body
    const id = parseInt(req.params.id);
    const dishIndex = data.dishes.findIndex(dish => dish.id === id)
    data.dishes[dishIndex] = {
        id,
        ...body
    }
    writeData(data)
    res.json('plato actualizado');
});


app.post('/dishes',(req,res)=>{
    const data = readData();//leer archivo
    const dish = req.body; //obtendo el contenido del body
    const newDish = {
        id:data.dishes.length + 1 , // creamos el id
        ...dish                     // juntamos la data con el ID en un new dishes

    }
    data.dishes.push(newDish);  //agregamos a la data con el push
    writeData(data);   //escribimos los cambios el archivo
    res.json(newDish);

});

app.post('/cars',(req,res)=>{
    const data = readData();//leer archivo
    const car = req.body; //obtendo el contenido del body
    const newCar = {
        id:data.cars.length + 1 , // creamos el id
        ...car                     // juntamos la data con el ID en un new dishes

    }
    data.cars.push(newCar);  //agregamos a la data con el push
    writeData(data);   //escribimos los cambios el archivo
    res.json(newCar);

});


app.get('/dishes',(req,res)=>{
    const data = readData();
    res.json(data.dishes);
});
app.get('/cars',(req,res)=>{
    const data = readData();
    res.json(data.cars);
});

app.get('/', (req, res)=>{
    res.send('Welcome to my api with NodeJs');
});

app.listen(port,()=>{
    console.log(`corriendo en el puerto`);
});
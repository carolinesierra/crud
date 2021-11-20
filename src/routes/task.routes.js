const { Router } = require('express');
const express = require('express');
const rutas = express.Router(); //objeto en el cual se pueden ingresar rutas


const Pedidos = require('../models/task'); //para poder hacer consultas a la bd

rutas.get('/', async (req, res) => {
    const pedidos = await Pedidos.find();  //para obtener todos los pedidos  
    res.json(pedidos);
});


rutas.get('/:id', async (req, res) => {
    const pedidos = await Pedidos.findById(req.params.id);
    res.json(pedidos);
});


//para guardar y listar pedidos
rutas.post('/', async (req, res)  => {
    const { title, description } = req.body;
    const pedidos = new Pedidos({
        title: title,
        description: description
    });
    await pedidos.save();
    res.json({status: 'Pedido guardado:)'});

});
//para eliminar pedidos
rutas.delete('/:id', async (req, res) => {
    await Pedidos.findByIdAndRemove(req.params.id);
    res.json({status: 'Pedido Eliminado:('}); 
 });



//para modificar/actualizar pedidos
rutas.put('/:id', async (req,res) => {
    const { title , description } = req.body;  
    
    const pedidoNuevo = {title, description};
    await Pedidos.findOneAndUpdate({_id:req.params.id}, pedidoNuevo);
    console.log(`${req.params.id} ${pedidoNuevo.title}`);
    res.json({status: 'actualizado'});
    
});
module.exports = rutas;
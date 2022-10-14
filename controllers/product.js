"use strict";
const { sequelize, DataTypes } = require("../config/database");
const Products = require('../models/product')(sequelize, DataTypes);
const router = require("express").Router();
const sh = require('./sharedFunc');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get('/products', async (req, res) => {

    const products = await Products.findAll({
        where:{
            [Op.or]:[
                {name:{[Op.like]:"%"+req.query.kw+"%"}},
                {dsc:{[Op.like]:"%"+req.query.kw+"%"}},
            ]
        },
        limit: Number(req.query.count) > 0? Number(req.query.count):50,
        offset: Number(req.query.skip),
    });

    res.status(200).json(products);

    // try{

    // }catch(e){
    //     res.status(404).json(e);
    // }
});

router.post('/product',sh.uploadImgFunc().single('img'), async (req, res) => {
    try{
        const addModel = await Products.create({
            name: req.body.name,
            dsc: req.body.dsc,
            img: req.file.filename,
            price: req.body.price,
            del: req.body.del,
        });

        res.status(200).json(addModel.id);

    }catch(e){
        res.status(404).json(e);
    }
});

router.delete('/product', async (req, res) => {
    try{
        const findItem = await Products.findOne({where: {id: req.query.id}});

        try {
            sh.deleteImgFunc(findItem.icon);
          } catch (err) {}
        
        const deleteItem = await Products.destroy({where:{id: req.query.id}});
        res.status(200).json(deleteItem[0]);
    }catch(e){
        res.status(404).json(e);
    }
});

router.put('/product',sh.uploadImgFunc().single('img') , async (req, res) => {
    try{
        const findItem = await Products.findOne({where: {id: req.body.id}});
        if(!findItem){ res.status(404).json('not foud'); return; }
         try { sh.deleteImgFunc(findItem.icon)} catch (err) {};
        findItem.name = req.body.name;
        findItem.dsc = req.body.dsc;
        findItem.img = req.file.filename;
        findItem.price = req.body.price;
        findItem.del = req.body.del;
    
        const updateModel = await Products.update(
            findItem.dataValues, {where:{id:req.body.id}}
        );
        res.status(200).json(updateModel);
    }catch(e){
        res.status(404).json(e);
    }
});


module.exports = router;
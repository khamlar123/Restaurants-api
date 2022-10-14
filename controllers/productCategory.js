"use strict";
const { sequelize, DataTypes } = require("../config/database");
const Productcategories = require('../models/productcategory')(sequelize, DataTypes);
const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get('/products/category', async (req, res) => {
    try{
        const filteritem = await Productcategories.findAll();
        res.status(200).json(filteritem)
    }catch(e){
        res.status(404).json(e);
    }
});

router.post('/products/category', async (req,res) => {    
    try{
        let i = 0;
        req.body.productIds.forEach(async itx => {
            i++;
            await Productcategories.create({
                categoryId:req.body.categoryId,
                productId: itx,
            });
        });
        res.status(200).json(i);
    }catch(e){
        res.status(404).json(e);
    }
});

router.delete('/products/category', async (req, res) => {
    try{
        const findItem = await Productcategories.findOne({
            where: {
                [Op.and]:[
                    {productId:req.body.productId},
                    {categoryId:req.body.categoryId},
                ]
            }
        });

        if(!findItem){res.status(404).json('not found'); return;} 

        const deleteItem = await Productcategories.destroy({
            where: {
                [Op.and]:[
                    {productId:req.body.productId},
                    {categoryId:req.body.categoryId},
                ]
            }
        });

        res.status(200).json(deleteItem);
    }catch(e){
        res.status(404).json(e);
    }
});

module.exports = router;

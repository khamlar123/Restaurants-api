"use strict";
const { sequelize, DataTypes } = require("../config/database");
const Catgories = require('../models/catgory')(sequelize, DataTypes);
const router = require("express").Router();
const sh = require('./sharedFunc');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get('/categories', async (req, res) => {
    try{
        const category = await Catgories.findAll({
            where:{
                [Op.or]:[
                    {name:{[Op.like]:"%"+req.query.kw+"%"}},
                ]
            },
        });
        res.status(200).json(category);
    }catch(e){
        res.status(404).json(e);
    }
});

router.post('/category',sh.uploadImgFunc().single('img') , async (req, res) => {
    try{
        const category = await Catgories.create({
            name: req.body.name,
            parrentId: req.body.parrentId,
            img: req.file.filename,
            active: req.body.active,
        });
        res.status(200).json(category.id);
    }catch(e){
        res.status(404).json(e);
    }
});

router.delete('/category', async (req, res) => {
    try{

        const findItem = await Catgories.findOne({where: {id: req.query.id}});

        if(!findItem){ res.status(404).json('not foud'); return;}

        const category = await Catgories.destroy({where: {id: req.query.id}});
        try {
            sh.deleteImgFunc(findItem.img);
          } catch (err) {}

        res.status(200).json(category.id);
    }catch(e){
        res.status(404).json(e);
    }
});

router.put('/category',sh.uploadImgFunc().single('img') , async (req, res) => {
    try{
        const findCategory = await Catgories.findOne({where:{id: req.body.id}});
        if(!findCategory){ res.status(404).json('not found'); return;}
        try {
            sh.deleteImgFunc(findCategory.img);
        } catch (err) {};
        findCategory.name = req.body.name;
        findCategory.parrentId = req.body.parrentId;
        findCategory.img = req.file.filename;
        findCategory.active = req.body.active;

        const category = await Catgories.update(findCategory.dataValues, {where:{id:req.body.id}});
        res.status(200).json(category[0]);
    }catch(e){
        res.status(404).json(e);
    }
});


module.exports = router;
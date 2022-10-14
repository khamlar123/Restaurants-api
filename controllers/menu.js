"use strict";
const { sequelize, DataTypes } = require("../config/database");
const Menu = require('../models/menu')(sequelize, DataTypes);
const router = require("express").Router();
const sh = require('./sharedFunc');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get('/menus', async (req, res) => {
    try{
        const menuList = await Menu.findAll({
            where:{
                [Op.or]:[
                    {name:{[Op.like]:"%"+req.query.kw+"%"}},
                ]
            },
        });
        res.status(200).json(menuList);
    }catch(e){
        res.status(404).json(e);
    }
});

router.post('/menu', sh.uploadImgFunc().single('icon'), async (req, res) => {
    try{
        const addModel = await Menu.create({
            name: req.body.name,
            parentId: req.body.parentId,
            icon: req.file.filename,
            active: req.body.active
        });
    
        res.status(200).json(addModel.id);
    }catch(e){
        res.status(404).json(e);
    }
});

router.delete('/menu', async (req, res) => {
    try{
        const findItem = await Menu.findOne({where: {id: req.body.id}});
        if(!findItem){ res.status(404).json('not foud'); return;}
        try {
            sh.deleteImgFunc(findItem.icon);
          } catch (err) {}

        const removeModel = await Menu.destroy({
            where:{id: req.query.id}
        });

        res.status(204).json(removeModel);
    }catch(e){
        res.status(404).json(e);
    }
});

router.put('/menu', sh.uploadImgFunc().single('icon'), async (req, res) => {
    try{
        const addModel = await Menu.update(
            {
                name: req.body.name,
                parentId: req.body.parentId,
                icon: req.file.filename,
                active: req.body.active
            },
            {where:{id: req.body.id}}
        );
    
        res.status(200).json(addModel.id);
    }catch(e){
        res.status(404).json(e);
    }
});

module.exports = router;
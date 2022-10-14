"use strict";
const { sequelize, DataTypes } = require("../config/database");
const Tables = require('../models/table')(sequelize, DataTypes);
const Invoice = require('../models/invoice')(sequelize, DataTypes);
const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

Tables.hasOne(Invoice, {foreignKey: 'tableId'});
Invoice.belongsTo(Tables, {foreignKey: 'tableId'});


router.get('/tables', async (req, res) => {
    try{
        const tablse = await Tables.findAll();
        res.status(200).json(tablse);
    }catch(e){
        res.status(404).json(e);
    }
});

router.post('/table', async (req, res) => {
    try{
        const tablse = await Tables.create({
            tableNumber: req.body.tableNumber,
            status: req.body.status,
        });
        res.status(200).json(tablse.id);
    }catch(e){
        res.status(404).json(e);
    }
});

router.delete('/table', async (req, res) => {
    try{
        const tablse = await Tables.destroy({where:{id: req.query.id}});
        res.status(200).json(tablse.id);
    }catch(e){
        res.status(404).json(e);
    }
});

router.get('/table/info', async (req, res) => {
    const tableInfo = await Tables.findOne({
        where:{tableNumber: req.query.tableNumber},
        include:[{model: Invoice}]
    });

    res.status(200).json(tableInfo.id);
});

module.exports = router;
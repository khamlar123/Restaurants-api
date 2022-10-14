"use strict";
const { sequelize, DataTypes } = require("../config/database");
const Invoices = require('../models/invoice')(sequelize, DataTypes);
const InvoicesTable = require('../models/invoicetable')(sequelize, DataTypes);
const InvoicesDetail = require('../models/invoicedetail')(sequelize, DataTypes);
const Table = require('../models/table')(sequelize, DataTypes);

const router = require("express").Router();
const sh = require('./sharedFunc');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get('/invoice', async (req, res) => {
    const filterItem = await Invoices.findAll({
        // where:{
        //     [Op.or]:[
        //         {createAt:{[Op.lt]:[]} }
        //     ],

        //     [Op.and]:[
        //         {}
        //     ]
        // }
    });

    res.status(200).json(filterItem);

});

router.post('/cutomer/singin', async (req, res) => {
    try{
        const leastId = await Invoices.findOne({
            order: [["id", "DESC"]],
        });
    
        const addinvoice = await Invoices.create({
            invoiceNo: leastId? (100000 + leastId.id + 1).toString() : "100000", 
            userId: req.body.userId,
            notes: req.body.notes,
            status: 0, // 0 pending 1 cancel 2 complete
            price: 0, 
        });
      
        if(addinvoice){
            let i = 0;
            req.body.tableids.forEach(async itx => {
                i++;
                await InvoicesTable.create({
                    invoiceId: addinvoice.id,
                    tableId: itx,
                    status: 0,
                });
                if(i > 1){
                    await Table.update( {status: 2} ,{where: {id:itx}});
                }
            });
        }
    
        if(req.body.menueList.length > 0){
            req.body.menueList.forEach(async itx => {
                await InvoicesDetail.create({
                    invoiceId: addinvoice.id,
                    productId: itx.productId,
                    remarks: itx.remarks,
                    qty: itx.qty,
                    status: 0, // 0 pending 1 cooking 2 complete 3 cancel
                });
            });
        }
    
        res.status(200).json({
            invoiceNo:addinvoice.invoiceNo,
            invoiceId:addinvoice.id
        });
    }catch(e){
        res.status(404).json(e)
    }
    
});

router.post('/more/products', async (req, res) => {
    try{
        let i = 0;
        req.body.menueList.forEach(async itx => {
            i++;
            await InvoicesDetail.create({
                invoiceId: itx.invoiceId,
                productId: itx.productId,
                remarks:itx.remarks,
                qty: itx.qty,
                status: 0,
            });
        });
    
        res.status(200).json(i);
    }catch(e){
        res.status(404).json(e);
    }
});

router.put('/cancel/product', async (req, res) => {
    try{
        const moveItem = await InvoicesDetail.update(
            {status: 3},
            {
                where:{
                    [Op.and]:[
                        {productId:req.body.productId},
                        {id:req.body.id}
                    ]
                }
            }
        );

        res.status(200).json(moveItem[0]);
    }catch (e){
        res.status(404).json(e);
    }
});

router.post('/checkout',sh.uploadImgFunc().single('img'),async (req, res) => {
   try{
    const invoice = await Invoices.update(
        {
            status: 2,
            img: req.file.filename,
            notes: req.body.notes,
            price: req.body.price,
        },
        { where:{id: req.body.invoiceId}}
    );

    await InvoicesTable.update(
        {status: 1},
        {where:{invoiceId: req.body.invoiceId}}
    );

    const tableIds = await InvoicesTable.findAll({
        where:{invoiceId: req.body.invoiceId}
    });

    const ids =  tableIds.map(m => m.id);
    ids.forEach(async itx => {
        await Table.update({status: 0}, {where:{id:itx}});
    });

    res.status(200).json(invoice.invoiceNo);

   }catch(e){
    res.status(404).json(e);
   }
});





module.exports = router;
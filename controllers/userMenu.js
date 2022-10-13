"use strict";
const { sequelize, DataTypes } = require("../config/database");
const UserMenu = require('../models/usermenu')(sequelize, DataTypes);
const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get('/user/menu', async (req, res) => {
    try{
        const userMenu = await UserMenu.findAll();
        res.status(200).json(userMenu);
    }catch(e){
        res.status(404).json(e);
    }
});

router.post('/user/menu', async (req, res) => {
    try{
        let i = 0;
        const { userId, menuIds } = req.body;
        UserMenu.destroy({where: {userId: userId}});  
        menuIds.forEach (async  itx  => {
            i++;
            await UserMenu.create({
                userId: userId,
                menuId: itx,
            });                                                                                                                                                                                             
        });
        res.status(200).json(i);
    }catch(e){
        res.status(404).json(e);
    }
});

router.delete('/user/menu', async (req, res) => {
    try{
        const deleteUserMenu = await UserMenu.destroy({
            where:{
                [Op.and]:[
                    {userId: req.query.userId},
                    {menuId: req.query.menuId}
                ]
            }
          
        });
    
        res.status(204).json(deleteUserMenu);
    }catch(e){
        res.status(404).json(e);
    }
});



module.exports = router;
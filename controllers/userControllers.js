"use strict";
const { sequelize, DataTypes } = require("../config/database");
const Users = require('../models/user')(sequelize, DataTypes);
const UserMenu = require('../models/usermenu')(sequelize, DataTypes);
const Menu = require('../models/menu')(sequelize, DataTypes);
const router = require("express").Router();
const sh = require('./sharedFunc');
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const Op = Sequelize.Op;

    Users.hasMany(UserMenu, {foreignKey: 'userId'});
    UserMenu.belongsTo(Users, {foreignKey: 'userId'});
    Menu.hasMany(UserMenu, { foreignKey: "menuId" });
    UserMenu.belongsTo(Menu, { foreignKey: "menuId" });

    router.get('/users', async (req, res) => {
        try{
            const users = await Users.findAll({
                where: {
                    [Op.or]:[
                        {userName:{[Op.like]:"%"+req.query.kw+"%"}},
                        {firstName:{[Op.like]:"%"+req.query.kw+"%"}},
                        {lastName:{[Op.like]:"%"+req.query.kw+"%"}},

                    ]
                },
                include: [
                    {model: UserMenu}
                ],
            });
            res.status(200).json(users);
        }catch(e){
            res.status(404).json(e);
        }
    });

    router.get('/users-id', async (req, res) => {
        try{
            const user = await Users.findOne({
                where:{id: req.query.id},
                include:[
                    {model: UserMenu}
                ]
            });
            res.status(200).json(user);
        }catch(e){
            res.status(404).json(e);
        }
    });

    router.post('/users',sh.uploadImgFunc().single('url') , async (req, res) => {
        try{
            const users = await Users.create(
                {  
                    userName:req.body.userName,
                    password:req.body.password,
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    url:req.file.filename,
                    status:req.body.status,
                }
            );
            res.status(200).json(users.id);
        }catch(e){
            res.status(404).json(e);
        }   
    });

    router.post('/user/login', async (req, res) => {
        try{
            const findUser = await Users.findOne({
                where:{
                    [Op.and]:[
                        {username:req.body.userName },
                        {password:req.body.password }
                    ]
                }
            });
    
            if(!findUser) { 
                res.json('User invalid');
                 return;
             }
    
            const menu = await UserMenu.findOne({
                where:{userId: findUser.id},
                include:[{model: Menu}]
            });
            
            const token  = jwt.sign(findUser.password, process.env.JWT_SECRET, {algorithm: 'HS256'});
            const expiresIn = dayjs().add(7, "days").toDate();
            res.cookie("api-auth", token, { secure: false, httpOnly: true, expires: expiresIn});
            res.status(200).json(
                {
                    authToken: token,
                    expiresIn,
                    menu: menu,
                }
            );
          
        }catch(e){
            res.status(404).json(e);
        }
    });

module.exports = router;
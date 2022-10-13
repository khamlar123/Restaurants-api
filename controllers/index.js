const router = require('express').Router();
const userControllers = require("./userControllers");
router.use(userControllers);
const menu = require("./menu");
router.use(menu);
const userMenu = require("./userMenu");
router.use(userMenu);


module.exports = router;
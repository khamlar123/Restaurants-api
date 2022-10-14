const router = require('express').Router();
const userControllers = require("./userControllers");
router.use(userControllers);
const menu = require("./menu");
router.use(menu);
const userMenu = require("./userMenu");
router.use(userMenu);
const Tables = require("./tables");
router.use(Tables);
const categories = require("./categories");
router.use(categories);
const products = require("./product");
router.use(products);
const productCategory = require("./productCategory");
router.use(productCategory);
const invoices = require("./invoice");
router.use(invoices);


module.exports = router;
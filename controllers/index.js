const router = require('express').Router();
const userControllers = require("./userControllers");
router.use(userControllers);


module.exports = router;
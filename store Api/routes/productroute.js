
const express = require("express")
const {getProduct, getProductStatic} = require("../controllers/productController.js")

const router = express.Router()

router.route("/").get(getProduct)
router.route("/static").get(getProductStatic)


module.exports = router
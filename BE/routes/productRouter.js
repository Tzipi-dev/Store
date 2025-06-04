const express=require("express")
const { getAllProducts,addProduct,deleteProduct,updateSale, getProductById } = require("../controllers/ProductController")
const verifyJWT = require("../middlewares/verifyJWT")

const router=express.Router()
router.get('/',getAllProducts)
router.post('/',addProduct)
router.delete('/:id',verifyJWT,deleteProduct)
router.put('/:id',verifyJWT,updateSale)
router.get('/:id',verifyJWT,getProductById)
module.exports=router
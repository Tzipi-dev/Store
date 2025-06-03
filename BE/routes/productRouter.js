const express=require("express")
const { getAllProducts,addProduct,deleteProduct,updateSale, getProductById } = require("../controllers/ProductController")

const router=express.Router()
router.get('/',getAllProducts)
router.post('/',addProduct)
router.delete('/:id',deleteProduct)
router.put('/:id',updateSale)
router.get('/:id',getProductById)
module.exports=router
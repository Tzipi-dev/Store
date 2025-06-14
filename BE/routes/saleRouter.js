const express=require("express")
const { getAllSales,addSale,deleteSale,updateSale, getSaleById } = require("../controllers/SaleController")
const verifyJWT = require("../middlewares/verifyJWT")
const router=express.Router()
router.get('/',getAllSales)
router.post('/',addSale)
router.delete('/:id',verifyJWT,deleteSale)
router.put('/:id',verifyJWT,updateSale)
router.get('/:id',verifyJWT,getSaleById)
module.exports=router
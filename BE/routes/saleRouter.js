const express=require("express")
const { getAllSales,addSale,deleteSale,updateSale, getSaleById } = require("../controllers/SaleController")
const router=express.Router()
router.get('/',getAllSales)
router.post('/',addSale)
router.delete('/:id',deleteSale)
router.put('/:id',updateSale)
router.get('/:id',getSaleById)
module.exports=router
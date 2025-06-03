const express=require("express")
const { getAllBuys,addBuy,deleteBuy,updateBuy, getBuyById } = require("../controllers/BuyController")
const router=express.Router()
router.get('/',getAllBuys)
router.post('/',addBuy)
router.delete('/:id',deleteBuy)
router.put('/:id',updateBuy)
router.get('/:id',getBuyById)
module.exports=router
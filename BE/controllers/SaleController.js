const Sale = require('../models/Sale')
exports.getAllSales = async (req, res) => {
    try {
        const sales = await Sale.find()
        res.json(sales)
    } catch (error) {
        console.error('Fail to get sales:', error)
        res.status(500).json({ message: 'Fail to get sales' })
    }
}
exports.getSaleById = async (req, res) => {
    const { id } = req.params
    try {
        const sale = await Sale.findById(id)
        if (!sale) {
            return res.status(404).json({ message: 'sale not found' })
        }
        res.json(sale)
    }
    catch (error) {
        console.error('Failed to get sale:', error);
        res.status(500).json({ message: 'Failed to get sale' });
    }
}
exports.addSale = async (req, res) => {
    try {
        const sale = await Sale.create(req.body)
        res.json(sale)
    } catch (error) {

    }
}
exports.updateSale=async(req,res)=>{
    const {id}=req.params
    const {precent,ParticipatingProducts}=req.body
    try{
        const updateSale=await Sale.findOneAndUpdate(
            {_id: id},
            {precent,ParticipatingProducts},
            {new: true}
        )
        if (!updateSale){
           return  res.status(404).json({message: 'sale not found'})
        }
        res.json(updateSale)
    }
    catch(error){
        console.error('Failed to update sale:', error);
        res.status(500).json({ message: 'Failed to update sale' });
    }
}
exports.deleteSale=async(req,res)=>{
    const {id}=req.params
    try{
        const idSale=await Sale.findOneAndDelete({id:id})
        if (!idSale){
           return  res.status(404).json({message: 'sale ost not find'})
        }
        res.json({message: 'sale delete successfully'})
    }
    catch(error){
        console.error('Fail to delete sale:',error)
        res.status(500).json({message: 'Fail to delete sale'})
    }
}

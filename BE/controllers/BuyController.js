const Buy=require('../models/Buy')
exports.getAllBuys = async (req, res) => {
    try {
        const buys = await Buy.find()
        res.json(buys)
    } catch (error) {
        console.error('Fail to get buys:', error)
        res.status(500).json({ message: 'Fail to get buys' })
    }
}
exports.getBuyById = async (req, res) => {
    const { id } = req.params
    try {
        const buy = await Buy.findById(id)
        if (!buy) {
            return res.status(404).json({ message: 'buy not found' })
        }
        res.json(user)
    }
    catch (error) {
        console.error('Failed to get buy:', error);
        res.status(500).json({ message: 'Failed to get buy' });
    }
}
exports.addBuy = async (req, res) => {
    try {
        const buy = await Buy.create(req.body)
        res.json(buy)
    } catch (error) {

    }
}
exports.updateBuy=async(req,res)=>{
    const {id}=req.params
    const {dateOfBuy,products,dateOfComming,owner}=req.body
    try{
        const updateBuy=await Buy.findOneAndUpdate(
            {_id: id},
            {dateOfBuy,products,dateOfComming,owner},
            {new: true}
        )
        if (!updateBuy){
           return  res.status(404).json({message: 'buy not found'})
        }
        res.json(updateBuy)
    }
    catch(error){
        console.error('Failed to update buy:', error);
        res.status(500).json({ message: 'Failed to update buy' });
    }
}
exports.deleteBuy=async(req,res)=>{
    const {id}=req.params
    try{
        const idBuy=await Buy.findOneAndDelete({id:id})
        if (!idBuy){
           return  res.status(404).json({message: 'buy ost not find'})
        }
        res.json({message: 'buy delete successfully'})
    }
    catch(error){
        console.error('Fail to delete buy:',error)
        res.status(500).json({message: 'Fail to delete buy'})
    }
}

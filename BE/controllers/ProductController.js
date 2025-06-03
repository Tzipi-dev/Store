const Product=require('../models/Product')
exports.getAllProducts = async (req, res) => {
    try {
        const Products = await Product.find()
        res.json(Products)
    } catch (error) {
        console.error('Fail to get Products:', error)
        res.status(500).json({ message: 'Fail to get Products' })
    }
}
exports.getProductById = async (req, res) => {
    const { id } = req.params
    try {
        const Product = await Product.findById(id)
        if (!Product) {
            return res.status(404).json({ message: 'buy not Product' })
        }
        res.json(Product)
    }
    catch (error) {
        console.error('Failed to get Product:', error);
        res.status(500).json({ message: 'Failed to get Product' });
    }
}
exports.addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.json(product)
    } catch (error) {

    }
}
exports.updateproduct=async(req,res)=>{
    const {id}=req.params
    const {name, price, rating,amountOfBuys,description,comments,category,color,sales,imageUrl,dateOfStart}=req.body
    try{
        const updateproduct=await Buy.findOneAndUpdate(
            {_id: id},
            {name, price, rating,amountOfBuys,description,comments,category,color,sales,imageUrl,dateOfStart},
            {new: true}
        )
        if (!updateproduct){
           return  res.status(404).json({message: 'buy not product'})
        }
        res.json(updateproduct)
    }
    catch(error){
        console.error('Failed to update buy:', error);
        res.status(500).json({ message: 'Failed to update buy' });
    }
}
exports.deleteProduct=async(req,res)=>{
    const {id}=req.params
    try{
        const idProduct=await Product.findOneAndDelete({id:id})
        if (!idProduct){
           return  res.status(404).json({message: 'product ost not find'})
        }
        res.json({message: 'product delete successfully'})
    }
    catch(error){
        console.error('Fail to delete product:',error)
        res.status(500).json({message: 'Fail to delete product'})
    }
}

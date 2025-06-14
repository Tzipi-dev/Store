const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const User = require('../models/User')

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({ message: "please fill all the required parameters" })
    const foundUser = await User.findOne({ email }).lean()
    if (!foundUser)
        return res.status(401).json({ message: "UnauthOrilized" })
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match)
        return res.status(401).json({ message: "UnauthOrilized" })
    const userInfo = {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        password: foundUser.password,
        address: foundUser.address,
        allBuys: foundUser.allBuys,
        FavoriteProducts: foundUser.FavoriteProducts
    }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken, user: userInfo })
}
const registerUser= async(req, res)=>{
      try {
        const result = await User.create(req.body);
        res.status(201).json({ message: 'User created successfully' });
        res.send(result);
        next();
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Internal server error' });
        next(error);
    }
}
const register=async(req,res)=>{
    const {name,email,phone,_id, password,address,allBuys,FavoriteProducts}=req.body
    if (!name||!password||!email||!phone||!address||!allBuys||!FavoriteProducts)
         return res.status(400).json({message: "please fill all the required parameters"})  
    const duplicate=await User.findOne({password}).lean()
    if (duplicate)
        return res.status(409).json({message: "duplicated user name"})
    const hashpwd=await bcrypt.hash(password,10)
    const userObject={name,email,phone,_id, password: hashpwd,address,allBuys,FavoriteProducts, }
    const user=await User.create(userObject)
    if (!user)
      return res.status(400).json({message: "invalid user received"})
   const userInfo = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        address: user.address,
        allBuys: user.allBuys,
        FavoriteProducts: user.FavoriteProducts
    }
    const accessToken=jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    return res.status(201).json({accessToken:accessToken, user:userInfo})
}
module.exports={login,registerUser,register}
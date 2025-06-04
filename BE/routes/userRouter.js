const express = require('express');
const router = express.Router();
const {addUser, getAllUsers,deleteUser,updateUser, getUserById}=require('../controllers/UserController')
const authController = require('../controllers/authController'); 
const verifyJWT = require('../middlewares/verifyJWT');
router.post('/', authController.register, addUser);
router.get('/', getAllUsers);
router.delete('/:id',verifyJWT, deleteUser);
router.put('/:id',verifyJWT, updateUser);
router.get('/:id',verifyJWT, getUserById);

module.exports = router;

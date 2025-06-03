const express = require('express');
const router = express.Router();
const {addUser, getAllUsers,deleteUser,updateUser, getUserById}=require('../controllers/UserController')
const authController = require('../controllers/authController'); 
router.post('/', authController.register, addUser);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);
router.get('/:id', getUserById);

module.exports = router;

const express = require('express');
const router = express.Router();
const citiesController = require('../controllers/CitiesController');

router.get('/', citiesController.getAllCitiesInIsrael);

module.exports = router;

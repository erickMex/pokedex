const express = require('express');
const router = express.Router();
var bluebird = require('bluebird');

var pokedexController = require('../controllers/pokedex.controller');
router.get('/pokedex', pokedexController.createReport);

module.exports = router;

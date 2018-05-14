const express = require('express');
const router = express.Router();
var bluebird = require('bluebird');

var YalsController = require('../controllers/yals.controller');
router.get('/pokedex', YalsController.createReport);

module.exports = router;

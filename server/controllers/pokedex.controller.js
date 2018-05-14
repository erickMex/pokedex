var async = require('asyncawait/async');
var await = require('asyncawait/await');
var path = require('path');

var Service = require('../services/pokedex.service');

exports.createReport = async (function (req, res, next) {
  var question = req.query.question ? req.query.question : 'Hi';
  var session_id = req.query.session_id ? req.query.session_id : '1';//'WEB_dbf8676b-670a-4e56-b0b2-b1ae7bdaf268';
  var key = req.key ? req.key : 'b434bbaf74aa5397b46c54947d564ba31484e8e0';
  var log = req.log ? req.log : 1;

  console.log(req.query.question);
  try {
    var data = await (Service.createReport(question, session_id, key, log));
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Consulta exitosa"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Error generando consulta: " + e
    });
  }
});

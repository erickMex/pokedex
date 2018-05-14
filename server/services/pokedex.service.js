var async = require('asyncawait/async');
var await = require('asyncawait/await');
var request = require('request');

var config = {
  url: '',
  encoding: null,
  headers: {
    'Content-Type': 'application/json'
  },
  json: {}
};

exports.createReport = async(function (question, session_id, key, log) {
  config.url = 'http://beta.soldai.com/bill-cipher/askquestion?question=' + question + '&session_id=' + session_id + '&key=' + key + '&log=' + log;
  console.log(config.url)
  var response = await(new Promise(function (resolve, reject) {
    request.get(config, function (error, response, body) {
      console.log(response.statusCode);
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  }));
  
  try {
    return response;
  } catch (e) {
    throw Error("Error: " + e);
  }
});

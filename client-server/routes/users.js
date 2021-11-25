var restify = require('restify-clients');
var assert = require('assert');
var express = require('express');
var router = express.Router();


//configurar conexão da restify 
var client = restify.createJsonClient({
  url: 'http://192.168.1.24:4000/'
})

/* GET users listing. */
router.get('/', function (req, res, next) {

  client.get('/users', function (err, request, response, obj) {
    assert.ifError(err);

    res.json(obj);
  });

});

router.get('/:id', function (req, res, next) {

  client.get(`/users/${req.params.id}`, function (err, request, response, obj) {
    assert.ifError(err);

    res.json(obj);
  });

});

router.put('/:id', function (req, res, next) {
  //                                    |req.body campos p/ edição 
  client.put(`/users/${req.params.id}`, req.body, function (err, request, response, obj) {
    assert.ifError(err);

    res.json(obj);

  });
});

router.delete('/:id', function (req, res, next) {
  //                                   
  client.del(`/users/${req.params.id}`, function (err, request, response, obj) {
    assert.ifError(err);

    res.json(obj);
  })
});

router.post('/', function (req, res, next) {
  //                     |req.body campos p/ inclusão
  client.post(`/users`, req.body, function (err, request, response, obj) {
    assert.ifError(err);

    res.json(obj);

  });
});



module.exports = router;

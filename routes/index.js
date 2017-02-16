/**
 * Created by emyr on 16/02/17.
 */
var express = require('express');
var router = express.Router();
var db = require('../data/datastore');
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
router.get('/', function(req, res) {
  if(req.session && req.session.hasData){
    db.findOne({session:req.session.id},function(err , doc){
      if(err){
        res.render('index', { title: 'HCL Number Dip', error : err.message});
      }else {
        res.render('index', { title: 'HCL Number Dip', attempts : doc.attempts})
      }
    });
  }else {
    var doc = {
      session : req.session.id,
      target : getRandomInt(100 , 999),
      attempts : 0,
      guesses:[]
    };
    db.insert(doc, function (err, newDoc) {
      if(err){
        res.render('error', {message:"Could not create session"});
      }else{
        req.session.attempts = 0;
        res.render('index',{title: 'HCL Number Dip', attempts : 0})
      }
      
    });
  }
});
router.post('/api/check', function(req,res){
  var guess = req.body.guess;
  if(req.session && req.session.attempts >= 3){
    var newTarget = getRandomInt(100,999);
    db.update({session: req.session.id},{ $set: { target: newTarget , attempts : 0} }, {});
    res.status(406);//bit harsh but a better code could be found
    res.send({message:"Maximum tries exceeded, new game started"});
  }else{
    db.findOne({session:req.session.id},function(err , doc){
      if(err){
        res.status(500);
      }else {
        req.session.attempts = req.session.attempts+1;
        db.update({session: req.session.id},{ $push:{guesses:guess},$set:{attempts:req.session.attempts} }, {});
        if(guess === doc.target){
          res.status(200);
          res.send({message:"congratulations! you won"});
        }else{
          res.status(200);
          res.send({message:"bad luck! try again"});
        }
      }
    });
  }
});

module.exports = router;

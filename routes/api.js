var express = require('express');
var router = express.Router();
var Note = require('../model/note').Note


/* GET notes */

router.get('/notes',function(req, res, next){
  var query = {raw: true}
  if(req.session.user){
    query.where = {
      uid: req.session.user.id
    }
  }
  Note.findAll(query).then(function(notes){
    res.send({status: 0, data: notes})
    console.log(notes)
  }).catch(function(){
    console.log('/notes')
    res.send({status: 1, errorMsg:'数据库出错'})
  })
})

router.post('/notes/add', function(req, res, next){
  if(!req.session.user){
    return res.send({status: 1, errorMsg:'请先登录'})
  }
  var note = req.body.note
  var uid = req.session.user.id
  var username = req.session.user.username
  Note.create({text:note, uid: uid, username: username}).then(function(note){
    var info = {
      username: note.username,
      createTime: note.createdAt
    }
    res.send({status: 0, data: info})
  }).catch(function(){
    console.log('/notes/add')
    res.send({status: 1, errorMsg:'数据库出错'})
  })
})

router.post('/notes/edit', function(req, res, next){
  if(!req.session.user){
    return res.send({status: 1, errorMsg:'请先登录'})
  }
  var note = req.body.note
  var uid = req.session.user.id
  Note.update({text:note},{where:{id: req.body.id, uid: uid}}).then(function(){
    res.send({status: 0})
  }).catch(function(){
    console.log('/notes/edit')
    res.send({status: 1, errorMsg:'数据库出错'})
  })
})

router.post('/notes/delete', function(req, res, next){
  if(!req.session.user){
    return res.send({status: 1, errorMsg:'请先登录'})
  }
  var uid = req.session.user.id
  Note.destroy({where:{id: req.body.id, uid: req.session.user.id}}).then(function(){
    res.send({status: 0})
  }).catch(function(){
    console.log('/notes/delete')
    res.send({status: 1, errorMsg:'数据库出错'})
  })
})



module.exports = router;
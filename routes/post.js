var express = require('express');
var router = express.Router();
var Post=require('../model/Post');
var User=require('../model/User');


router.get('/postadd',function (req,res) {
  User.find(function(err,rtn){
    if (err) throw err;
    res.render('post/postadd',{users:rtn});
  })
});
router.get('/postlist',function (req,res) {
  Post.find({}).populate('author').exec(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('post/postlist',{posts:rtn});
  })
})
router.get('/postdetail/:uid',function(req,res){
  Post.findById(req.params.uid).populate('author').exec(function (err,rtn) {
    if (err) throw err;
    console.log(rtn);
    res.render('post/post_detail',{post:rtn})
  })
})
router.get('/postupdate/:id',function(req,res){
  Post.findById(req.params.id,function (err,rtn) {
    if(err) throw err;
    User.find(function(err2,rtn2){
      if(err2) throw err2;
      res.render('post/post_update',{post:rtn,users:rtn2})
      })
})
})
router.post('/postupdate',function(req,res){
  var update={
    title:req.body.title,
    content:req.body.content,
    author:req.body.author
  }
  Post.findByIdAndUpdate(req.body.id,{$set:update},function (err,rtn) {
    if (err) throw err;
    res.redirect('/posts/postlist');

  })
})
router.get('/postdelete/:id',function (req,res) {
  Post.findByIdAndRemove(req.params.id,function (err,rtn) {
    if(err) throw err;
    res.redirect('/posts/postlist');

  })
})
  router.post('/postadd',function(req,res){
    var post=new Post();
    post.title=req.body.title;
    post.content=req.body.content;
    post.author=req.body.author;

    post.save(function(err,rtn){
      if(err) throw err;
      console.log(rtn);
      res.redirect('/posts/postlist');
    })

});
module.exports = router;

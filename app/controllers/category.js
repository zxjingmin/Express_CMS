var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');
var Category = mongoose.model('Category');

module.exports = function (app) {
  app.use('/category', router);
};

router.get('/list', function (req, res, next) {
  if(req.query.json){
    Category.find({},function(err,category){
        if(err){
          console.log(err)
        }
        res.send(category)
    });
  }else{
    res.render('category/list',{
       title: '类型列表',
    });
  }
})

router.post('/add', function (req, res, next) {
  console.log(req.body)
  var category=new Category(req.body.category);

  category.save(function(err){
      if(err){
        res.send({success:false})
      }else{
        res.send({success:true,data:category})
      }
  })
});

router.delete('/remove/:id', function (req, res, next) {
  if(req.params.id){
    Category.remove({_id:req.params.id},function(err){
      if(err){
        res.send({success:false})
      }else{
        res.send({success:true})
      }
    })
  }else{
     res.send({success:false})
  }
});
var express = require('express');
var router = express.Router();
var connection = require('../spare_config/spare_connection');

router.get('/',function(req,res){
  connection.query('SELECT * FROM spare_part_db',function(err,rows){
  
  
    if(err) throw err;

    console.log(rows);
    res.render('main_spare_part',{users:rows});
    

  });

  });

  router.get('/get_part/:item_code',function(req,res){

    var itemC = req.params.item_code;

    connection.query("SELECT * FROM spare_part_db WHERE item_code = ?",[itemC],function (err,rows){


      if(err) throw err;
      res.redirect('/');
      
    
    
    });
  });
  
    console.log('itemC');


module.exports = router;
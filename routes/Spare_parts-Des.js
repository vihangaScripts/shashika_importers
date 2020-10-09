var express = require('express');
var router = express.Router();
var connection = require('../spare_config/spare_connection');



router.get('/:item_code',function(req,res){

    var itemC = req.params.item_code;

    connection.query("SELECT * FROM spare_part_db WHERE item_code = ?",[itemC],function (err,rows){


      if(err) throw err;
      res.render('main_spare_part',{

        res:rows
      });
      
    
    
    });
  });
  
    

  module.exports = router;
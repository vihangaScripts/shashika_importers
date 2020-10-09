const { query } = require('express');
var express = require('express');
var router = express.Router();
var connection = require('../spare_config/spare_connection');

const spareparts = 'SELECT * FROM spare_part_db';
const add1 = 'SELECT * FROM add1';
const add2 = 'SELECT * FROM add2';
const add3 = 'SELECT * FROM add3';

router.get('/',function(req,res){
  connection.query(spareparts,function(err,rows){
    if(err) throw err;
    console.log(rows);
    
            connection.query(add3,function(err,results){
              if(err)throw err;  
              console.log(results);
              connection.query(add1,function(err,results1){
                if(err)throw err;  
                console.log(results1);
                connection.query(add2,function(err,results2){
                  if(err)throw err;  
                      console.log(results2);
                      res.render('feed',{users:results,spare:rows,users1:results1,users2:results2});
            });

          });

        });

     });

  });

  router.get('/get_part/:item_code',function(req,res){

    var itemC = req.params.item_code;

    connection.query("SELECT * FROM spare_part_db WHERE item_code = ?",[itemC],function (err,rows){


      if(err) throw err;
      
      console.log('Run');
      res.redirect('/');
      
    
    
    });

  });

  router.get('/search', (req,res)=>{
    let sql = "SELECT * FROM spare_part_db where item_name LIKE '% "+ 
    req.query.titlesearch + "%'"
    conn.query(sql, (err,results)=>{
    if (err) throw err
        res.render('feed',spare,results)
    });
});

module.exports = router;
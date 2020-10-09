var express = require('express');
var router = express.Router();
var connection = require('../spare_config/spare_connection');

/* GET home page. */
router.get('/', function(req, res, next) {

  connection.query('SELECT * FROM spare_part_db',function(err,rows){


    if(err) throw err;

    console.log(rows);
    res.render('spare_parts',{users:rows});
    

  });

  console.log('Run');
});
router.post('/addSpareparts',function(req,res){

  var file = req.files.uploaded_image;



var item_name=req.body.item_name;
var price=req.body.price;
var brand_model=req.body.brand_model;
var quantity=req.body.quantity;
var availability=req.body.availability;
var description=req.body.description;
var images=file.name;

file.mv('public/img/'+file.name, function(err) {

  var sql = "INSERT INTO `spare_part_db`(`item_name` ,`price`,`brand_model` ,`quantity`,`availability`,`description`,`photo`) VALUES ('" + item_name + "','" +price+ "','" +brand_model+ "','" +quantity+ "','" +availability+ "','" +description+ "','" +images+ "')"

  
 
    var query = connection.query(sql, function(err, ress) {


if(err) throw err;

res.redirect('/');



});
});

});


router.get('/deletePart/:item_code',function(req,res){


  var itemC = req.params.item_code;

connection.query("DELETE FROM spare_part_db WHERE item_code = ?",[itemC],function (err,rows){


  if(err) throw err;
  res.redirect('/')
  


})


});

router.get('/editPart/:item_code', function(req,res){


  var editId = req.params.item_code;

  connection.query("SELECT * FROM spare_part_db WHERE item_code = ?",[editId],function(err,rows){

    if(err) throw err;
    res.render('update_part',{spareData:rows});
    

  })


});

router.post('/updateSpare/:item_code',function(req,res){

  var item_name = req.body.item_name;
  var price = req.body.price;
  var brand_model = req.body.brand_model;
  var quantity = req.body.quantity;
  var availability=req.body.availability;
  var description = req.body.description;

  var updateItem = req.params.item_code;

  connection.query("UPDATE spare_part_db SET item_name=?,price = ?,brand_model =?,quantity=?,availability =?,description =? WHERE item_code =?",[item_name,price,brand_model,quantity,availability,description,updateItem],function (err,respond){


    if(err) throw err;
    res.redirect('../../');




  });


});

module.exports = router;
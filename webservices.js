'use strict';

var mysql = require("mysql");
// First you need to create a connection to the db
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});
connection.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection to databse established');
});

/*connection.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});
*/

module.exports = {

  getMenuList: function (req, res) {
    var response = {"statuscode":  null, "rows": 0 , "results": [] } ;
  	var menu_list = [];
    connection.query('SELECT id, name, available FROM faviosmom.Menu',function(err,rows) {
	    if(!err) {
		     console.log('Data received from Db:\n');
		     console.log('Number of rows ' + rows.length);
		     var menu_list = new Array;
		     for (var i = 0,  l = rows.length; i < l; i++) {
		        //menu_list.push(rows[i].name);
		        menu_list.push({"id": rows[i].id, "name": rows[i].name, "available": rows[i].available});
		     };
		     response.rows = rows.length;
		     response.statuscode = 200;
		     response.results = menu_list;
	         console.log('value of menu_list in callback ' + menu_list);
   		     //response +=  '"results"' + ':' + JSON.stringify(menu_list) + "}";
		 }
	     else {
	    	 console.log( err );
	    	 response.statuscode = 500;
	     }
	     //response = JSON.parse(response);
	     //response = JSON.parse(response);
	     res.send(response);
    });
  },
  getMenuItem: function ( req, res) {
  	  var menu_name = req.params.menuitem;
  	  var response = {"statuscode":  null, "rows": 0 , "menu_name": menu_name , "results": [] };
  	  var menu_portions = Array();
  	  var sql = "select m.name,mp.name as size ,mp.unit_price as price, m.available from faviosmom.Menu m, faviosmom.MenuPortions mp where m.name = '" + menu_name +  "' and m.id = mp.menu_id";
  	  connection.query(sql,function(err,rows) {
  	    if(!err) {
  	    	 response.statuscode = 200;
  	    	 response.rows = rows.length;
		     console.log('Data received from Db:\n');
		     console.log('Number of rows ' + rows.length);
		     for (var i = 0,  l = rows.length; i < l; i++) {
                 menu_portions.push({"menu_id": rows[i].menu_id,"size": rows[i].size, "unit_price": rows[i].price,"available": rows[i].available})
		     };
             response.results = menu_portions;
		 } else {
	    	 console.log( err );
	    	 response.statuscode = 500;
	     }		 	
	     res.send(response);
  	  });
  	  /*var menuitem = { 
         "menuitem": "black beans",
         "portions": 
               [
                {"size": "bowl", "price": "5.00", "available":"true"},
                {"size": "cup", "price": 3.00, "available":"true"},
                {"size": "pot", "price": 33.00, "available":"true"},

               ]
         };
       return menuitem; */
  }
};

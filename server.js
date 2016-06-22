'use strict';

var express = require('express');
var webservices = require('./webservices');

// Constants
var PORT = 8090;

// App
var  app = express();
app.use(require('morgan')('combined'));

app.get('/v1/getmenuitem/:menuitem', function (req, res) {
/*  var menuitem = { 
         "menuitem": "black beans",
         "portions": 
               [
                {"size": "bowl", "price": "5.00", "available":"true"},
                {"size": "cup", "price": 3.00, "available":"true"}
               ]
         };*/
     console.log(req.params);    
     webservices.getMenuItem(req,res);    
  //res.send(menuitem);
});

app.get('/v1/getfullmenu/*', function (req, res) {

	var cb = function callback(err1,menu1) {
        var err = err1;
        var menu = menu1;
        //this.err = err;
        //this.menu = menu;
        console.log('value of menu_list in callback CB ' + menu);
	}
	webservices.getMenuList(req,res);
	//console.log('from server.js' + cb.menu);	

/*  var menu: = [ 
                {"name": "black beans", "available":"true"},
                {"name": "Cuban Sandwich","available":"true"},
                {"name": "Pastelitos","available":"false"}
              ]
              */

  //res.send(cb.menu);
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

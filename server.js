const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const session    = require('express-session');
const flash      = require('express-flash');
// const bcrypt     = require('bcrypt');
const path       = require('path');
const PORT = 8000;

const app = express();
//
// app.use(express.static(__dirname + './client/static'));

app.use(express.static(__dirname + './static'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.use(session({
  secret: 'codingmojo',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

// app.set('views'), path.join(__dirname, '/client/views');
// app.set(__dirname + '/client/views');
app.set(__dirname + '/views');

app.set('view engine', 'ejs');

require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);


app.listen(PORT, function() {
  console.log("Listening on PORT:"+PORT);
});

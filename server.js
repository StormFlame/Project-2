var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// session middleware
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');

// load the env vars
require('dotenv').config();

// create the Express app
var app = express();

// connect to the MongoDB with mongoose
require('./config/database');
// configure Passport
require('./config/passport');

// require our routes
const indexRoutes = require('./routes/index');
const postRoutes = require('./routes/posts');
const accountRoutes = require('./routes/accounts');
const commentRoutes = require('./routes/comments');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser());



var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });


var imgModel = require('./models/image');

app.post('/images', upload.single('image'), (req, res) => {
 
  var obj = {
      img: {
          data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
          contentType: 'image/png'
      }
  }
  imgModel.create(obj, (err, item) => {
      if (err) {
          console.log(err);
      }
      else {
          // item.save();
          res.redirect('/');
      }
  });
});








// mount the session middleware
app.use(session({
  secret: 'SEI Rocks!',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize()); // straight from the docs
app.use(passport.session());


// to make sure req.user is accessible in every view
app.use(function(req, res, next){
  // attached to locals is what the property/variable that will be availible throughout our application 
  // in ejs
  res.locals.user = req.user; // if we are not logged in req.user will be undefined
  next();
})

// mount all routes with appropriate base paths
app.use('/', indexRoutes);
app.use('/', postRoutes);
app.use('/', accountRoutes);
app.use('/', commentRoutes);

// invalid request, send 404 page
app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});

module.exports = app;

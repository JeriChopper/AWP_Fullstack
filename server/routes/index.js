/// Jericho Koskinen
/// 0607024
/// Project started 14.2.2024
/// Sources and references will be linked near the code
/// This code is done by me all the way through out. I am using old exercises from the course for the structure of this project


var express = require('express');
const { validationResult, body } = require('express-validator');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const User = require('../models/User');
//const Todo = require('../models/Todo');
//const multer = require("multer");
//const storage= multer.memoryStorage();
//const upload = multer({storage});



// Initialize the connection to the database.
const mongoDB = 'mongodb://127.0.0.1:27017/projectdb';
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: ')); // Error handling
db.once('open', () => {
  console.log('Connected to MongoDB');
});


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET || 'defaultSecret',
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);



/* Routes */

//index route to the main page. 
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});


/// Register get route to render registration page.
router.get('/register', (req,res,next) => {
  res.render('register');
})


//Post route to register page to post registration information. 
router.post('/register',
async (req,res) => {

  // Validation Errors
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  /// try-loop to make new mail and password which is hashed
  try {
    const existingEmail = await User.findOne({ email: req.body.email });

    if (existingEmail) { // if email exists inform user.
      return res.status(403).json({ email: 'Email already in use.' });
    }

    const salt = await bcrypt.genSalt(10); // crypt the password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
    }); // New User is in the database and the password is hashed. 

    return res.json('ok'); 


  } catch (error) { //error handling
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


/// Register get route to render registration page.
router.get('/login', (req,res,next) => {
  res.render('login');
})


router.post('/login',
 async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Wrong password' });
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
  };

  jwt.sign(
    jwtPayload,
    process.env.SECRET || 'defaultSecret',
    {
      expiresIn: 360,
    },
    (err, token) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      // Set the JWT token as a cookie in the response
      res.json({success: true, token}); 
    }
  );
});

module.exports = router;

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

    return res.json('Registration OK'); 


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
      expiresIn: 3600,
    },
    (err, token) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      // Set the JWT token as a cookie in the response
      res.cookie('connect.sid', token, { httpOnly: true });


      res.json({token, user: {email: user.email}}); 
    }
  );
});

router.get('/listx', async (req, res) => {
  try {
    const users = await User.find({}, { _id: 0, password: 0 }); // Exclude sensitive information
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/like', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { likedUserId } = req.body;
  const userId = req.user.id; 
  try {
    
    // Find the user by email 
    const likedUser = await User.findOne({ email: likedUserId });

    if (!likedUser) {
      return res.status(404).json({ success: false, message: 'Liked user not found.' });
    }

    // Update the likedUsers array 
    await User.findByIdAndUpdate(userId, { $addToSet: { likedUsers: likedUser._id } });

    // Check if there's a match
    if (likedUser.likedUsers.includes(userId)) {
      // it's a match
      await User.findByIdAndUpdate(userId, { $addToSet: { matches: likedUser._id } });
      await User.findByIdAndUpdate(likedUser._id, { $addToSet: { matches: userId } });
    }

    res.json({ success: true, message: 'User liked successfully.' });
  } catch (error) {
    console.error('Error liking user:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

router.get('/matches', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const userId = req.user.id;
  
  try {
    // Find the user by ID and populate the 'matches' array
    const user = await User.findById(userId).populate('matches', 'email'); 

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Use a Set to ensure unique matches
    const uniqueMatches = new Set();

    // Iterate over user's matches 
    user.matches.forEach((match) => {
      uniqueMatches.add({
        id: match._id,
        email: match.email,
      });
    });
 
    // Convert the Set back to an array
    const matches = Array.from(uniqueMatches);


    res.json({ success: true, matches });
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});


router.get('/messages/:matchId/all', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const userId = req.user.id;
  const matchId = req.params.matchId;

  try {
    const userChats = await User.findById(userId)
      .select('chats')
      .populate([
        {
          path: 'chats',
          match: { user: matchId },
          populate: { path: 'messages.sender', select: 'email' }
        },
        {
          path: 'chats.user',
          select: 'email'
        }
      ]);

    const matchChats = await User.findById(matchId)
      .select('chats')
      .populate([
        {
          path: 'chats',
          match: { user: userId },
          populate: { path: 'messages.sender', select: 'email' }
        },
        {
          path: 'chats.user',
          select: 'email'
        }
      ]);

    const userChatWithMessages = userChats.chats.find(c => c.user.id === matchId);
    const matchChatWithMessages = matchChats.chats.find(c => c.user.id === userId);

    // Ensure that messages is defined, otherwise return an empty array
    const userMessages = userChatWithMessages?.messages || [];
    const matchMessages = matchChatWithMessages?.messages || [];

    const messages = userMessages.concat(matchMessages);

    res.json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

router.post('/messages/:matchId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const userId = req.user.id;
  const matchId = req.params.matchId;
  const { content } = req.body;


  console.log('UserId:', req.user.id);
  console.log('MatchId:', req.params.matchId);
  console.log('Content:', req.body.content);

  try {
    // Check if the user has a match with the given ID
    const user = await User.findById(userId).populate('matches');
    const match = user.matches.find(match => match.id === matchId);

    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found.' });
    }

    // Find or create the chat for the given match
    let chat = await User.findById(userId).populate({
      path: 'chats',
      match: { user: match.id },
    });

    if (!chat || !chat.chats || chat.chats.length === 0) {
      // Create a new chat for both users
      chat = await User.findByIdAndUpdate(userId, {
        $push: { chats: { user: match.id } },
      }, { new: true }).populate({
        path: 'chats',
        match: { user: match.id },
      });

      // Update the chat for the other user as well
      await User.findByIdAndUpdate(match.id, {
        $push: { chats: { user: userId } },
      });
    }

    // Add the new message to the chat for both users
    chat.chats[0].messages.push({
      sender: userId,
      content,
    });

    await chat.save();

    res.json({ success: true, message: chat.chats[0].messages});
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});


///Post route to put profile data in the mongodb
router.put('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const userId = req.user.id;
  const { displayName, bio, gender } = req.body;

  try {
    // Update user profile fields
    await User.findByIdAndUpdate(userId, { displayName, bio, gender });

    res.json({ success: true, message: 'Profile updated successfully.' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});


module.exports = router;

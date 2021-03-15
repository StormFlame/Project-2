const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Account = require('../models/account');

// This function happens when the user logs in
// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) { // verify callback
    // a user has logged in via OAuth!
    // console.log(profile, "<----- Profile")
    // Fetch the User from the database and provide them back to passport 
    Account.findOne({'googleId': profile.id}, function(err, account){
      if(err) return cb(err);

      if(account){

        // cb(error, documentFromMongoose)
        return cb(null, account);
      } else {
        // if we didn't find the studnet(user) go ahead create them
        const newAccount = new Account({
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.avatar,
          handle: '',
          googleId: profile.id
        })

        // save it 
        newAccount.save(function(err){
          if(err) return cb(err);
          return cb(null, newAccount)
        })
      }
    })

      // or we want to create a usre // and provide them back to passport 
  }
));


// Set up our session
passport.serializeUser(function(AccountDocument, done){
  // studentDocument is coming from above the cb(null, newStudent) or the cb(null, student)
  // What do we want to store in the session
  done(null, AccountDocument.id) // null is for the error if there is one, 
  // studentDocument.id is the mongo id that we're storing in our session
})

// Is called on every single request after the user is logged in 
// that is a form submission, Going to another page, etc
passport.deserializeUser(function(id, done){
  Account.findById(id, function(err, account) {
    done(err, account);// this assings our student document to req.user, which we can use 
    // in our controller functions to figure who is logged in
  })
})









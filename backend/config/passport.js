const passport=require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const PassportUser=require('../models/passportUserModel.js');
const dotenv=require('dotenv');

dotenv.config({path:"config/config.env"})

// Create an app at https://console.cloud.google.com/projectcreate?previousPage=%2Fapis%2Fcredentials%2Foauthclient%3FpreviousPage%3D%252Fapis%252Fcredentials%253Fproject%253Dhrapp-392516%26project%3Dhrapp-392516&organizationId=0 . Retrieve google client id, google client secret and googlr callback url from there.

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
  },
function(request, accessToken, refreshToken, profile, done) {
    PassportUser.findOrCreate({name:profile.displayName,email:profile.email,provider:profile.provider,provider_id:profile.id}, function (err, user) {
        return done(err, user);
      });
}));



// Create an app at https://developers.facebook.com/apps/ . Retrieve facebook app id, facebook app secret and facebook callback url from there.
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'email']
},
function(accessToken, refreshToken, profile, cb) {
    // console.log(profile)
    const { displayName } = profile;
    
    PassportUser.findOrCreate({name: displayName,provider:profile.provider,provider_id:profile.id}, function (err, user) {
      return cb(err, user);
    });
  }
))



// Create an app at https://www.linkedin.com/developers/apps/ . Retrieve linkedin client id, linkedin client secret and linkedin callback url from there.
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_KEY,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: process.env.LINKEDIN_CALLBACK_URL,
    scope: ['r_emailaddress', 'r_liteprofile'],
  }, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
 }
));


passport.serializeUser(function(user,done){
    done(null,user);
})

passport.deserializeUser(function(user,done){
    done(null,user);
})

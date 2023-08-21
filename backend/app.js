const express=require('express');
const cookieParser=require('cookie-parser')
const session = require('express-session');
const passport = require('passport');
const dotenv=require('dotenv');
require('./config/passport');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const fileUpload=require('express-fileupload');

dotenv.config({path:"config/config.env"})

const app=express();

app.use(bodyParser.json());

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(fileUpload({
    useTempFiles:true
}));

const user=require('./routes/userRoutes.js')
app.use("/api",user);

const job=require('./routes/jobRoutes.js')
app.use("/api",job);

const resume=require('./routes/resumeRoutes.js')
app.use("/api/buildResume",resume);

const portal=require('./routes/portalRoutes.js')
app.use("/api",portal);

const meeting=require('./routes/meetingRoutes.js')
app.use("/api/schedule",meeting);

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}
  
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
  
app.get('/', (req, res) => {
res.send('<a href="/auth/google">Authenticate with Google</a><br><a href="/auth/facebook">Authenticate with Facebook</a><br><a href="/auth/linkedin">Authenticate with LinkedIn</a>');
});
  

  
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }
));
  
app.get('/auth/facebook',
    passport.authenticate('facebook')
);
  
app.get('/auth/linkedin',
  passport.authenticate('linkedin', { scope: [ 'email' ] }
));
  
  
  
  
app.get( '/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/google/protected',
      failureRedirect: '/auth/google/failure'
    })
  );
  
app.get( '/facebook/callback',
  passport.authenticate( 'facebook', {
    successRedirect: '/facebook/protected',
    failureRedirect: '/auth/facebook/failure'
  })
);
  
app.get('/linkedin/callback', 
passport.authenticate('linkedin', {
successRedirect: '/linkedin/protected',
failureRedirect: '/auth/linkedin/failure'
}));
  
  
  
  
app.get('/google/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.name} by google auth`);
});
  
app.get('/facebook/protected', isLoggedIn, (req, res) => {
res.send(`Hello ${req.user.name} by facebook auth`);
});
  
app.get('/linkedin/protected', isLoggedIn, (req, res) => {
res.send(`Hello ${req.user.name} by linkedin auth`);
})
  
  
  
  
app.get('/logout', function(req, res) {
    req.logout(function(err) {
    if (err) {
        console.log(err);
        res.status(400).send({ message: 'Failed to sign out user' });
    }
    else{
        console.log('session destroyed.');
    }
    });
    res.redirect("/")
});
  
  
  
  
app.get('/auth/google/failure', (req, res) => {
res.send('Failed to authenticate by google..');
});
  
app.get('/auth/facebook/failure', (req, res) => {
res.send('Failed to authenticate by facebook..');
});
  
app.get('/auth/linkedin/failure', (req, res) => {
res.send('Failed to authenticate by linkedin..');
})


module.exports=app;

//https://console.cloud.google.com/
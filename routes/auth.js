var express = require('express');
var router = express.Router();
var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy;


passport.serializeUser(function(user, done) {
  // console.log('--------serializeUser--------')
  // console.log(user)
  done(null, user);
});
 
passport.deserializeUser(function(obj, done) {
  // console.log('--------deserializeUser--------')
  // User.findById(id, function (err, user) {
  //   done(err, user);
  // });
  done(null, obj)
});


passport.use(new GitHubStrategy({
  clientID: 'f89b28319b48cd3b389f',
  clientSecret: 'ebd8aa7125a7f5622483d54eae9a29955026951b',
  callbackURL: "http://localhost:3000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  // User.findOrCreate({ githubId: profile.id }, function (err, user) {
  //   return cb(err, user);
  // });
  done(null, profile)
}
));


router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    }
    
    // Successful authentication, redirect home. 
    res.redirect('/');
});

router.get('/logout', function(req, res){
  req.session.destroy()
  res.redirect('/')
})


module.exports = router;
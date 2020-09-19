import db from "./config/database.js";
import passport from 'passport';
import passportLocal from 'passport-local';
import JWT from 'passport-jwt';
import Extract from 'passport-jwt';


var localStrategy = passportLocal.Strategy;
const JWTstrategy=JWT.Strategy;
const ExtractJWT=Extract.ExtractJwt;
  // JSON WEB TOKENS STRATEGY
passport.use(new JWTstrategy({
    jwtFromRequest: ExtractJWT.fromHeader('authorization'),
    secretOrKey: 'secret_token',
  }, async ( payload, done) => {
    try {
      // Find the user specified in token
      console.log(payload.sub);
      const user = await db.userModel.findById(payload.sub);
  
      // If user doesn't exists, handle it
      if (!user) {
        return done(null, false);
      }
      // Otherwise, return the user
      done(null, user);
    } 
    catch(error) 
    {
      done(error, false);
    }
  }));


  // LOCAL STRATEGY
passport.use(new localStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    try 
    {
      // Find the user given the email
      const user = await db.userModel.findOne({email });
      // If not, handle it
      if (!user) {
        return done(null, false);
      }
      // Check if the password is correct
      const isMatch = await user.isValidPassword(password);
    
      // If not, handle it
      if (!isMatch) {
        return done(null, false);
      }
    
      // Otherwise, return the user
      done(null, user);
    } 
    catch(error) {
      done(error, false);
    }
  }));

  export default passport;
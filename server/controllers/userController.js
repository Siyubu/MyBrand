
import db from "../config/database.js";
import JWT from 'jsonwebtoken';
import userValidation from "../validation/user_validation.js"


const signToken = user => {
  return JWT.sign({
    iss: 'CodeWorkr',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, 'secret_token');
}

export default class UserController {

  static async signUp (req, res, next)  {
    
    const auth = userValidation(req.body);
    if (auth.error){
      res.send({error:auth.error.details[0].message});
   }
    const { email, password } = auth.value;
    
    let foundUser = await db.userModel.findOne({email});
    if (foundUser) { 
      return res.status(403).json({ error: 'Email is already in use'});
    }
    else
    {
      try 
      {
        const newUser = new db.userModel({
        email: email,
        password: password,
        });
       
        await newUser.save();
        
      const token = signToken(newUser);
      res.status(200).json({token});
      
      } 
      catch (err) 
      {
         res.status(500).json(err);
      }


    }

}

static async signIn (req, res, next)  {
  // Generate token
  const user=db.userModel;
  const token = signToken(req.user);
  res.status(200).json({token });
}


}
















//     passport.use('signup', new localStrategy({
//         usernameField : 'email',
//         passwordField : 'password'
//       }, async (email, password, done) => {
//           try {
//             const user = await db.userModel.create({ email, password });
//             return done(null, user);
//           } catch (error) {
//             done(error);
//           }
//       }));

//       //Create a passport middleware to handle User login
//     passport.use('login', new localStrategy({
//     usernameField : 'email',
//     passwordField : 'password'
//   }, async (email, password, done) => {
//     try {
//       const user = await db.userModel.findOne({ email });
//       if( !user ){
//         return done(null, false, { message : 'User not found'});
//       }
//       const validate = await user.isValidPassword(password);
//       if( !validate ){
//         return done(null, false, { message : 'Wrong Password'});
//       }
//       return done(null, user, { message : 'Logged in Successfully'});
//     } catch (error) {
//       return done(error);
//     }
//   }));

// //This verifies that the token sent by the user is valid
// passport.use(new JWTstrategy({
//   secretOrKey : 'top_secret',
//   jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
// }, async (token, done) => {
//   try {
//     return done(null, token.user);
//   } catch (error) {
//     done(error);
//   }
// }))

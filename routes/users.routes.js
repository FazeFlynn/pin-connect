console.log('came in user.routes.js');
import express from 'express';

import bcrypt from 'bcryptjs';
import {User} from '../models/users.model.js';
import {Post} from '../models/post.model.js';



const router = express.Router();
import { ensureAuthenticated } from '../middlewares/auth.middleware.js';
// const router = express();

router.get('/', async function(req, res) {
  // res.render('index', { title: 'Express' });
  res.render('top');
});

router.get('/users', async (req, res) => {
  const allusers = await User.find().select("-password");
  res.send(allusers);
});


router.get('/posts', async (req, res) => {
  const allPosts = await Post.find();
  res.send(allPosts);
});



router.get('/profile', ensureAuthenticated ,(req,res) => {
  res.render('profile');

});

router.post('/failed', async (req,res) =>{
  res.send('login failed');
});


router.post('/signup', async (req, res) => {
  console.log("ran signup");
  const { username, email, password } = req.body;    
  const lowerCaseUsername = username.toLowerCase();
  let checkExistingUser = await User.findOne({ username : lowerCaseUsername});
  const lowerCaseEmail = email.toLowerCase();
  let checkExistingEmail = await User.findOne({ email : lowerCaseEmail});


  console.log(username, password, email);

  
  if(checkExistingUser){
    return res.status(400).json({message : 'Username Already exists '});
  }
  else if (checkExistingEmail){
    res.status(401).json({ message : 'Email already exists'});
  }
  else{
    try{
      const hashedPassword = await bcrypt.hash(password,10);
      console.log("signup ruunning");
      const newUser = await User.create ({
        username: lowerCaseUsername,
        email: lowerCaseEmail,
        password: hashedPassword
      });
      // await newUser.save();
      // res.send({ newUser, message : 'Account created'});
      // res.redirect('/profile');
      const user = await User.findOne({ username : username});
      // console.log("user this : ", user);

      req.session.userId = user._id;
      res.status(201).json({ message : 'Account Created'});
      console.log("user created")
      // isAuthenticated = true;
      
    }
    catch(error){
      console.log("signup not  ruunning error - ", error);
      // res.send({error, message : 'try again'});
    }
  }
});

router.post('/login', async (req, res) => {
  const { username , password} = req.body;  
  const user = await User.findOne({ username : username});
  if(!user){
    return res.status(400).json({ message : 'user not found'});
  }
  else{
    // why the fuck this exception handling have to tag along with every single piece of code
    try {
      if (await bcrypt.compare(password, user.password)) {

        req.session.userId = user._id;
        return res.status(201).json({ message : 'user found'});
      }
      else{
        return res.status(401).json({ message : 'wrong password'});
      }
    }
    catch(error){
      return error;
    }      
  }  
});

export default router;
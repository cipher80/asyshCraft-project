const user = require('../models/user.js');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.resister = async(req,res)=>{
  const {name,email,password , phone }= req.body;
  try {
    
  let newUser = await user.findOne({email});
  if(newUser){
    return res.status(400).json({msg:'User already exist'});
  }
  newUser = new user({ name,email,password,phone});
  await newUser.save();
  return res.status(200).json({
    message:'User created successfully',
    user:newUser
  })
  } catch (err) {
    if (err.name === 'ValidationError') {
        const errors = {};
        for (let field in err.errors) {
            errors[field] = err.errors[field].message;
        }
        return res.status(400).json({ errors }); 
     }
        res.status(500).json({ msg: 'Server error' });
    }
}
exports.Userlogin = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ msg: 'Email and password are required' });
    }

    try {
        // Check if the user exists
        let userIndb = await user.findOne({ email });
        if (!userIndb) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

        // Validate the password
        const isMatch = await bcrypt.compare(password, userIndb.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

        // Generate JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.SECKRET_KEY,
            { expiresIn: '1h' }, // Token expiration time
            (err, token) => {
                if (err) throw err;
                res.json({ token:token,
                    message:'User logged in successfully',
                 });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

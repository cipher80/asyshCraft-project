const mongoose = require('mongoose');
const validator = require ('validator');
const bcrypt = require ('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required Field '],
        trim:true
    },
    email:{
        type:String,
        required:[true,'email is required Field '],
        trim:true,
        unique:true,
        lowercase:true,
        validate:{
            validator:validator.isEmail,
            message:'Invalid Email format  '
        }
    },
    password:{
        type:String,
        required:[true,'password is required Field '],
        trim:true,
    },
    phone:{
        type:String,
        required:[true,'phone is required Field '],
        trim:true,
        unique:true,
        validate:{
            validator:function(v){
                return /^\d{10}$/.test(v);
            },
            message:'Invalid phone number format'
        }
    },

});
        userSchema.pre('save',async function(next){
            if(!this.isModified('password')) return next();
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password,salt);
            next();
        })
   const User = mongoose.model('User',userSchema);
   module.exports = User ;



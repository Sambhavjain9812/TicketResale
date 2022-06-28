import { Schema, model, connect } from 'mongoose';
import validator from 'validator';
import populate from 'mongoose-autopopulate';
import unique from 'mongoose-unique-validator';
import bcrypt from 'bcryptjs'
import { IUser } from '../types/global';

   
const userSchema = new Schema<IUser>({
name: { 
    type: String, 
    required: true
 },
email: { 
    type: String, 
    required: [true, 'Please provide a valid email!'], 
    unique:true, 
    lowercase: true,
    validate: [validator.isEmail, 'Not a valid email!']
 },
password: { 
    type: String, 
    required: [true, 'Please provide a valid password!'],
    minlength: 8
},
role:{
    type: String,
    enum: ['user','admin'],
    default: 'user'
}
},
{
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            delete ret.__v;
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

userSchema.plugin(populate);
userSchema.plugin(unique);

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 13);
    next();
});


export default model<IUser>('User', userSchema);
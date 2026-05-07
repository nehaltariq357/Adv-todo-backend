import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 🔐 HASH PASSWORD BEFORE SAVE
UserSchema.pre("save",async function(){
    const user = this
    if (!user.isModified("password")) return 

    try{
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password,salt)
        user.password = hash
        
    }catch(err){
        throw err
    }
  
})


const User = mongoose.model("User", UserSchema);

export default User;

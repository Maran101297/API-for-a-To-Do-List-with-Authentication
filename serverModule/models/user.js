const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  otp:{
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false, // User is not verified until OTP is verified
},
  tasks: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Task'
  }]
}, { timestamps: true });


userSchema.pre('save', async function (next) {
  const modelExsits = mongoose.models[this.constructor.modelName]
  if(!modelExsits){
    mongoose.model(this.constructor.modelName, userSchema)
  }
  next();
  
  });

module.exports = mongoose.model('User', userSchema);

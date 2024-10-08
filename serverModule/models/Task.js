const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { 
      type: String, 
      required: true 
  },
  description: { 
      type: String,
  },
  priority: { 
      type: String, 
      default: 'Normal' 
  },
  status: {
      type: String,
      enum: ['Pending', 'Completed']
  },
  action: {
      type: Boolean,
      default: false
  },
  user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true
  },
}, { timestamps: true });

// pre-save hook is a middleware function that runs before a document is saved to the database.
taskSchema.pre('save', async function (next) {
  const modelExsits = mongoose.models[this.constructor.modelName]
  if(!modelExsits){
    mongoose.model(this.constructor.modelName, taskSchema)
  }
  next();
  
  });


module.exports = mongoose.model('Task', taskSchema);

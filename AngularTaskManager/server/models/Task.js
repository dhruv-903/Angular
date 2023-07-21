const mongoose = require('mongoose');
const {Schema} = mongoose;

const taskSchema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user',
    },
    title:{
        type:String,
        required:[true,"Task must have a title"]
    },
    description:{
        type:String,
        required:[true,"Task must have the description"]
    },
    status:{
        type:Boolean,
        default:false
    }
})

const Task =  mongoose.model('Task',taskSchema);
module.exports = Task;
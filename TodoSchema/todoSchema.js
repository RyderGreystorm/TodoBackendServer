import mongoose from "mongoose"
const{Schema,model}=mongoose

const todoSchema= Schema({
    title:{
        type:String,
    },
    description:{
        type: String,
        required:false
    },
isCompleted: {
    type: Boolean,
    default:false
},
date:{
    type:Date,
    default:Date.now
}

})

const TodoModel=model("Todo", todoSchema)
export default TodoModel
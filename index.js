import express from "express"
import mongoose from"mongoose"
import dotenv from "dotenv"
import cors from "cors"
import TodoModel from "./TodoSchema/todoSchema.js"

// import { param } from "express/lib/request"
const app=express()



dotenv.config()
app.use(cors())

const port= process.env.PORT|| 3000

const url=process.env.DB_URL
//Connection method to database
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology : true,
    
}).then(()=>{

    ///if database is connected successfully
console.log("Database connected successfully.......................")
}).catch((error)=>{

    //if an error occurs
    console.log(error)
})

//home route
app.get("/",(req,res)=>{
    res.send("Welcome to Ryer Greystorm Todo API")
})
//Get all Todo 
app.get("/getAllTodos", async(req,res)=>{
    const todo= await TodoModel.find({});
    if (todo){
       return res.status(200).json({
            message: "Fetch all todos from database",
            model:todo
        })
    }else{
        return res.status(400).json({
            message: "Failed to fetch todos from database"
        })
    }
})


//update
app.patch("/updateTodos/:id",async(req,res)=>{
    const {id}=req.params;
    const isCompleted =req.body
    const updateTodo= await TodoModel.updateOne({isCompleted:isCompleted}).where({_id:id})


    if(updateTodo){
        return res.status(200).json({
            status:true,
            message: "Todo updated Succssfully",
            data : updateTodo
        })
    }else{
        return res.status(400).json({
            message: "Todo not Updated, Please try again"
        })
    }
})

//Create  a new Todo into database

// app.post("/create",async(req,res)=>{
//     const {title, description,isCompleted}=req.body
//     const createTodo= await TodoModle.create({
//         title,
//         description,
//         isCompleted

//     })

// if (createTodo){
//     return res.status(201).json({
//         message: "Todo  created successfully",
//         data:createTodo
//     })
// }else{
//     return res.status(400).json({
//         message: "Failed to create a Todo"
//     })
// }


// })
app.post("/createTodo",async(req,res)=>{
    const title=req.body
    const description=req.body
    const isCompleted=req.body

    const createTodo=TodoModel.create({
        title,
        description,
        isCompleted
    })
    if(createTodo){
        return res.status(201).json({
            message:"Todo Created successfully......",
            data:createTodo
        })
    }else{
        return res.status(400).json({
            message:"Error occured"
        })
    }

})
//Delete from database

app.delete("/deleteTodo/:id",async(req,res)=>{
    const {id}=req.params;
    const deleteTodo= await TodoModel.findOneAndDelete({_id:id})
    if(deleteTodo){
      
        return res.status(200).json({
          
            message:"Todo Deleted Sucessfully",
             data:deleteTodo
            })
    }
})

app.listen(port,()=>{
    console.log(`Todo server running at ${port}`)
})
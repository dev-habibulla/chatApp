require("dotenv").config()
const express = require("express")
const http = require("http")
const cors = require("cors")
const mongoose = require("mongoose")

const authRoutes = require("./routes/authRoutes")



const PORT = process.env.PORT || 8000

const app = express()


// Middleware Start 

app.use(express.json())
app.use(cors())

app.use("/api/auth",authRoutes)


// 
// Middleware End 

const server = http.createServer(app)


mongoose.connect(process.env.DATABASE_URL).then(()=>{
    server.listen(PORT, () => {
        console.log(`server is listen to ${PORT} And Database Connect`);
    })
}).catch((err)=>{
    console.log("database err",err);
})




// mongodb+srv://chatApp:mFYPLjEBjc2SQGY1@cluster0.hyck63b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
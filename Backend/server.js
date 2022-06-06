require('./db/mongoose.js')
const express=require('express')
const cors = require('cors');
const app=express()
require("dotenv").config();
const PORT=process.env.PORT || 5000
app.use(express.json())
app.use(cors())

const userRoute=require('./routes/user')
app.use(userRoute)

app.listen(PORT,()=>{
    console.log('Backend server is listening on port '+PORT)
})
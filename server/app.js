const express = require('express')
const cors =  require('cors')
const { connect, connection }  = require('mongoose')
require('dotenv').config()
const  userRoutes = require('./routes/userRoutes')
const  postRoutes = require('./routes/postRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const fileUpload = require('express-fileupload')

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({credentials: true, origin: "http://localhost:5017"}))
app.use(fileUpload())

app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/uploads", express.static(__dirname + "/uploads"))

app.use(notFound)
app.use(errorHandler)



connect(process.env.MONGODB_URL).then(()=> {
    console.log("DB connected successfully");
    connection.on("disconnected", ()=> {
        console.log("DB disconnected");
    });

    app.listen(process.env.PORT || 5001, ()=> console.log( `server running on http://localhost:${process.env.PORT || 5001}`))

}).catch(error => console.log(error))



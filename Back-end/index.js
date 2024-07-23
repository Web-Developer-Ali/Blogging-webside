import app from "./app.js";
import dataBase from "./models/DbConnection.js";
dataBase()
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on:${process.env.PORT}`)
})

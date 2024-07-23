import mongoose from "mongoose";
const dataBase = ()=>{
    mongoose 
    .connect(`${process.env.DB_URL}`)
    .then(console.log("MongoDB connect Successfully"))
    .catch((err)=>console.log(`Error in Data Base connection:${err}`))
   }
export default dataBase
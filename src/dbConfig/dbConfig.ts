import mongoose from 'mongoose'
export async function connect(){
    try{
        mongoose.connect("mongodb://localhost:27017/next-auth")
        const connection = mongoose.connection

        connection.on('connected', ()=>{
            console.log("Mongodb Connected Successfully!")
        })

        connection.on('error', ()=>{
            console.log("MongoDB connection Error")
        })

    }catch(e){
        console.log('Something goes wrong')
        console.log(e)
    }
}
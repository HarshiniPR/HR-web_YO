const app=require('./app');
const dotenv=require('dotenv');
const connectDB=require('./config/db')

process.on("uncaughtException" , err=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to uncaught Exception`);
    process.exit(1);
});

dotenv.config({path:"config/config.env"})

connectDB();

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port: ${process.env.PORT}`) //Provide your localhost port here
})

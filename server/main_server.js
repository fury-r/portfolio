const express=require('express')
const cors=require('cors')
const bodyparser=require('body-parser')
const app=express()
app.use(express.json())
app.use(bodyparser.json())
var corsOptions={
    origin:'http://localhost:3000'
}
app.use(cors(corsOptions))
const {MongoClient}=require('mongodb')


const url = "mongodb+srv://admin:netflix1011@portfolio.qmqe2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url)
async function run(){  try {
    // Connect to the MongoDB cluster
     await client.connect();

    // Make the appropriate DB calls
     await database(client);

} catch (e) {
    console.error(e);
} finally {
     client.close();
}}

const database=async(client)=>{
    const databaselist=await client.db().admin().listDatabases();
    console.log(databaselist.databases.forEach(db=>{
        console.log(db)
    }) )
} 
run()
app.listen(8080,()=>{
    console.log('server running at port 8080')
})

 
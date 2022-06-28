import express from "express";

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Ticket Server!");
});

app.use((_req,res,_next)=>{
    res.send('Not found on the server!');
})

app.listen(3002, ()=>{
    console.log("Ticket server running on port 3002!");
});
import express from 'express'
import usersRouter from './routers/users.js';


const app = express()
const port = 3000 

app.use(express.json())

app.use('/users',usersRouter)
app.use('/agents',agentsRouter)



app.get('/health',(req,res) => {
    res.json({ ok: true })
})



app.listen(port, ()=>{
    console.log("server run.. ; http://localhost:3000");
})
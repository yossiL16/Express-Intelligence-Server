import express from "express";
import {readFromFile} from './io/read.js'
import {writeToFile} from './io/write.js'

const agentsRouter = express()

agentsRouter.get('/', async (req,res) => {
    try {
        const data = await readFromFile();
        res.json(data)
    } catch (err) {
        console.error(err);
        
    }
})








export default agentsRouter;
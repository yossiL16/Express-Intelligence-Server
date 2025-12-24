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


agentsRouter.get('/:id', async (req,res) => {
    const id = req.params.id
    try {
        const data = await readFromFile();
        for(const agent of data) {
            if(agent.id === id) {
                res.json(agent)
            }
        }
    } catch (err) {
        console.error(err);
    }
})


agentsRouter.post('/',async (req,res) => {
      let data = await readFromFile();
    const newAgent = req.body
    try {
        if(!newAgent) {
            res.status(400).json({'Bad Request': "not found user to appending"})
        } else {
            data.push(newUser)
            writeToFile(data)
        }
    } catch (err) {
        res.json({err:err})
    }
})


agentsRouter.put('/:id', async (req,res) => {
    const id = req.params.id
    const change = req.body
    try {
        const data = await readFromFile();
        data.forEach(agent => {
            if(agent.id === id) {
                for(const key in change) {
                    agent[key] = change[key]
                } 
            }
        });
        writeToFile(data)
        res.json({msg:"The update was successful"})
    } catch(err) {
        console.error(err);
    }
})


agentsRouter.delete('/:id', async (req,res) => {
    const id = req.params.id
    try {
        const data = await readFromFile();
        for(const indexAgent in data) {
            if (data[indexAgent].id === id) {
                data.splice(indexAgent,1)
            }
        }
        writeToFile(data)
        res.json({msg: "The deletion was successful."})
    } catch (err) {
        console.error(err);
    }
})



export default agentsRouter;
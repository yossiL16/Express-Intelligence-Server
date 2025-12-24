import express from "express";
import {readFromFile} from './io/read.js'
import {writeToFile} from './io/write.js'


const usersRouter = express();


usersRouter.get('/', async (req,res) => {
    try {
        const data = await readFromFile();
        res.json(data)
    } catch (err) {
       console.error(err);
        
}})


usersRouter.post('/',async (req,res) => {

    let data = await readFromFile();
    const newUser = req.body
    try {
        if(!newUser) {
            res.json({err: "not found user to appending"})
        } else {
            data.push(newUser)
            writeToFile(data)
        }
    } catch (err) {
        res.json({err:err})
    }
})


usersRouter.put('/:username', async (req,res) => {

    
    const username = req.params.username
    const change = req.body
    try {
        const data = await readFromFile();
        data.forEach(user => {
            if(user.username === username) {
                for(const key in change) {
                    user[key] = change[key]
                } 
            }
        });
        writeToFile(data)
        res.json({msg:"The update was successful"})
    } catch(err) {
        console.error(err);
    }
})


usersRouter.delete('/:username',async (req,res) => {
    const username = req.params.username
    try {
        const data = await readFromFile();
        for(const user in data) {
            if (data[user].username === username) {
                data.splice(user,1)
            }
        }
        writeToFile(data)
        res.json({msg: "The deletion was successful."})
    } catch (err) {
        console.error(err);
    }
})


export default usersRouter;
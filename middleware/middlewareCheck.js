import {readFromFile} from './io/read.js'
const locaionUsers = './data/users.json'


export function check(req,res,next){
    const header = req.headers
    const data = readFromFile(locaionAgent)
    for(const user of data) {
        if (user.username === header['x-username'] && user.password['x-password'])
            next()
    } 
    res.status(400).json({err:err})
    
} 

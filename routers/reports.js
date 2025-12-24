import express from "express";
import {readFromFile} from './io/read.js'
import {writeToFile} from './io/write.js'

const locationReport = './data/report.json'
const locaionAgent = './data/agents.json'


const reportsRouter = express();

reportsRouter.get('/', async (req,res) => {
    try {
        const data = await readFromFile(locationReport);
        res.json(data)
    } catch (err) {
        console.error(err);
        res.send(err)
    }
})


reportsRouter.get('/:id', async (req,res) => {
    const id = req.params.id
    try {
        const data = await readFromFile(locationReport);
        for(const report of data) {
            if(report.id === id) {
                res.json(report)
            }
        }
    } catch (err) {
        console.error(err);
        res.send(err)
    }
})


reportsRouter.post('/',async (req,res) => {
      let data = await readFromFile(locationReport);
    const newReports = req.body
    try {
        if(!newReports) {
            res.status(400).json({'Bad Request': "not found report to appending"})
        } else {
            data.push(newReports)
            writeToFile(data)
        }
    } catch (err) {
        res.json({err:err})
    }
})


import 'dotenv/config'

import express from 'express'
import Auth from '../../controllers/auth.js'

const router = express.Router()

router.get('/', (req,res) => {
    if(Auth(req)){
        res.json(Auth(req))
    } else {
        res.json({err: 'no go'})
    }  
})

router.get('/id', (req,res) => {
    fetch('http://localhost:8080/users')
})

export default router
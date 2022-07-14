import {isAuth} from '../../controllers/auth.js'
import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()

router.get('/', isAuth, (req,res) => {

    const username =  req.cookies.token?.split('+')[1]

    fetch('http://localhost:8080/users/')
    .then(res => res.json())
    .then (data => {
        const user = data.filter(user => user.email === username)
        res.status(200).send( user
        )
    })
    .catch(err => res.status(400).send({err: err}))
})

export default router;
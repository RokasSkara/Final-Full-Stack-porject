import { isAuth } from '../../controllers/auth.js'
import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()

router.get('/:id?', (req, res) => {
    if (req.params.id) {
        fetch(`http://localhost:8080/Posts/${req.params.id}`)
            .then(res => res.json())
            .then(data => res.send(data))
            .catch(err => res.send(err))
    } else {
        fetch('http://localhost:8080/Posts')
            .then(res => res.json())
            .then(data => res.send(data))
            .catch(err => res.send(err))
    }
})




router.post('/', isAuth, (req, res) => {
    const { title, content } = req.body

    const id = req.cookies.token?.split('+')[2]
    const user = req.cookies.token?.split('+')[1]

    if (title && content) {
        fetch('http://localhost:8080/Posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                content: content,
                postTime: new Date().toLocaleString(),
                posterId: id,
                posterName: user,
                postStatus: {
                    eddited: false,
                    edditDate: null,
                    answered: false,
                    votes: 0,
                    answers: 0,
                    views: 0
                }
            }),
        })
            .then(res => res.json())
            .then(data => {
                res.status(200).send({ msg: "All good!" })
            })
            .catch(err => res.status(400).send({ err: err }))
    } else {
        return res.send({ err: 'Title or Content missing' })
    }
})

export default router;
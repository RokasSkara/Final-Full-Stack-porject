import { isAuth } from '../../controllers/auth.js'
import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()

router.get('/:id?', (req, res) => {
    console.log(req.params.id)
    if (req.params.id) {
        fetch(`http://localhost:8080/Answers`)
            .then(res => res.json())
            .then(data => {

                let data2 = data.filter(item => item.questionID === req.params.id)
                console.log(data2)
                res.send(data2)
            })
            .catch(err => res.send(err))
    } else {
        fetch('http://localhost:8080/Answers')
            .then(res => res.json())
            .then(data => res.send(data))
            .catch(err => res.send(err))
    }
})

router.post('/', isAuth, (req, res) => {
    const { questionID, answer } = req.body

    const UserId = req.cookies.token?.split('+')[2]
    const user = req.cookies.token?.split('+')[1]

     if (questionID && answer) {
        fetch('http://localhost:8080/Answers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                answerOwner: user,
                answerOwnerID: UserId,
                answerContent: answer,
                questionID: questionID,
                answerTime: new Date().toLocaleString(),
            }),
        })
            .then(res => res.json())
            .then(data => {
                res.status(200).send({ msg: "All good!" })
            })
            .catch(err => res.status(400).send({ err: err }))
    } else {
        return res.send({ err: 'Content missing' })
    } 
})

export default router;
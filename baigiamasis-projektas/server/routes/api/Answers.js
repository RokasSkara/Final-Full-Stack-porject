import { isAuth } from '../../controllers/auth.js'
import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()


const QuestionAddAnswer = (id) => {
    fetch(`http://localhost:8080/Posts/${id}`)
        .then(res => res.json())
        .then(data => {
            fetch(`http://localhost:8080/Posts/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    answer: data.answer + 1
                })
            })
        })

}

const QuestionRemoveAnswer = (id) => {
    fetch(`http://localhost:8080/Posts/${id}`)
        .then(res => res.json())
        .then(data => {
            fetch(`http://localhost:8080/Posts/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    answer: data.answer - 1
                })
            })
        })

}

router.get('/:id?', (req, res) => {
    if (req.params.id) {
        fetch(`http://localhost:8080/Answers`)
            .then(res => res.json())
            .then(data => {
                const data2 = data.filter(item => item.questionID === req.params.id)
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
                eddited: false,
                edditDate: null,
                votes: 0
            }),
        })
            .then(res => res.json())
            .then(data => {
                QuestionAddAnswer(questionID)
                res.status(200).send({ msg: "All good!" })
            })
            .catch(err => res.status(400).send({ err: err }))
    } else {
        return res.send({ err: 'Content missing' })
    }
})

router.delete('/delete/:id/:questionID', isAuth, (req, res) => {
    const { id, questionID } = req.params
    QuestionRemoveAnswer(questionID)
    fetch(`http://localhost:8080/Answers/${id}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(data => {
            res.status(200).send({ msg: "Answer Deleted" })
        })
        .catch(err => res.status(400).send({ err: err }))
}
)

router.patch('/:id', isAuth, (req, res) => {
    console.log('inside')
    const { id } = req.params
    const { content } = req.body
    if (content.length >= 1) {

        fetch(`http://localhost:8080/Answers/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answerContent: req.body.content,
                eddited: true,
                edditDate: new Date().toLocaleString()

            }),
        })
            .then(res => res.json())
            .then(data => res.send({ msg: 'Data updated' }))
    } else {
        res.send({ msg: 'Content too short, if you want to remove the comment select Delete' })
    }

})

export default router;
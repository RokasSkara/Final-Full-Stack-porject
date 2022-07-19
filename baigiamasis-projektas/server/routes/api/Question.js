import { isAuth } from '../../controllers/auth.js'
import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()


const deleteAnswers = (id) => {
    let temp = []
    fetch(`http://localhost:8080/Answers`)
        .then(res => res.json())
        .then(data => {
            data.filter(item => item.questionID === id ? temp.push(item.id) : '')
            if (temp.length > 0) {
                temp.map(item => {
                    fetch(`http://localhost:8080/Answers/${item}`, {
                        method: 'DELETE',
                    })
                })
            }
        })
}


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
                },
                answered: false,
                votes: 0,
                answer: 0,
                views: 0
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

router.delete('/delete/:id', isAuth, (req, res) => {
    const { id } = req.params

    fetch(`http://localhost:8080/Posts/${id}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(data => {
            res.status(200).send({ msg: "Post Deleted" })
            deleteAnswers(id)
        })
        .catch(err => res.status(400).send({ err: err }))
}

)

router.patch('/:id', isAuth, (req, res) => {
    const { title, content } = req.body
    console.log(title.length)
    if (title && content && title.length > 1 && content.length > 1) {
        fetch(`http://localhost:8080/Posts/${req.params.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                content: content,
                postTime: new Date().toLocaleString(),
                postStatus: {
                    eddited: true,
                    edditDate: new Date().toLocaleString(),
                }
            }),
        })
            .then(res => res.json())
            .then(data => {
                res.status(200).send({ msg: "Question updated!" })
            })
            .catch(err => res.status(400).send({ err: err }))
    } else {
        return res.send({ msg: 'Title or Content missing' })
    }
})

router.patch('/answered/:id', isAuth, (req, res) => {
    fetch(`http://localhost:8080/Posts/${req.params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            answered: true,
        }),
    })
        .then(res => res.json())
        .then(data => {
            res.status(200).send({ msg: "Question updated!" })
        })
        .catch(err => res.status(400).send({ err: err }))

})

router.patch('/views/:id', (req, res) => {
    const { views } = req.body
    if (views) {
        fetch(`http://localhost:8080/Posts/${req.params.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                views: views,
            }),
        })
            .then(res => res.json())
            .then(data => {
                res.status(200).send({ msg: "Question updated!" })
            })
            .catch(err => res.status(400).send({ err: err }))
    }
})

export default router;
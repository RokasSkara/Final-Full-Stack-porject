import { isAuth } from '../../controllers/auth.js'
import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()

const UpdateVote = (id, type, vote) => {
    fetch(`http://localhost:8080/${type}/${id}`)
        .then(res => res.json())
        .then(data => {
            fetch(`http://localhost:8080/${type}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    votes: data.votes + vote
                })
            })
        })
}


router.get('/:id?', (req, res) => {
    const { id } = req.params
    if (id) {
        fetch(`http://localhost:8080/Votes/${id}`)
            .then(res => res.json())
            .then(data => res.send(data))
        
    } else {
        fetch(`http://localhost:8080/Votes`)
            .then(res => res.json())
            .then(data => res.send(data))
        
    }

})

export default router;
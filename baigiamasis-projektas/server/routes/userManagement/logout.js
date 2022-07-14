import express from 'express'

const router = express.Router();

router.get("/", (req, res) => {
    return res
        .clearCookie("token")
        .status(200)
        .send({msg: 'logged out'})
});

export default router;
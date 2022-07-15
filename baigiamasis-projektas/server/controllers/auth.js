import jwt from 'jsonwebtoken'

let Auth = (req, res) => {
    let x = false;
    const privateKey = process.env.SECRET
    const token = req.cookies.token?.split('+')[0]
    jwt.verify(token, privateKey, (err, decoded) => {
        if (err) {
            x = false
        } else {
            x = decoded;
        }
    })
    return x;
}

let isAuth = (req, res, next) => {
    try {
        const privateKey = process.env.SECRET
        const token = req.cookies.token?.split('+')[0]
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err) {
                return res.status(400).send({ err: 'Verification failed, please relog and try again' })
            } else {

                return next();
            }
        })
    } catch (err) {
        return res.status(400).send({ err: 'Verification failed, please relog and try again' })
    }
}



export default Auth;

export {isAuth};
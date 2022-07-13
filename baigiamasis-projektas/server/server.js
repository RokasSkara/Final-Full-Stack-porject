import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//user management helper
import userVerify from './routes/userManagement/userVerify.js'

//pages
import registration from './routes/userManagement/register.js'
import login from './routes/userManagement/login.js'

import user from './routes/api/user.js'

const PORT = 5000;
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}))
app.use(cookieParser(), express.json(), express.urlencoded({extended: false}));

app.use('/register', registration);
app.use('/login', login);
app.use('/userVerify', userVerify)
app.use('/user', user)

app.all('*', (req,res) => {
    res.status(404).send({error: 'Page not found'})
});

app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
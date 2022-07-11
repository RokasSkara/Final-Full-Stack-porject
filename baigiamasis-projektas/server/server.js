import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import registration from './routes/userManagement/register.js'
import login from './routes/userManagement/login.js'

const PORT = 5000;
const app = express();

app.use(cors(), express.json(), express.urlencoded({extended: false}), cookieParser());

app.use('/register', registration);
app.use('/login', login);

app.all('*', (req,res) => {
    res.status(404).send({error: 'Page not found'})
});

app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
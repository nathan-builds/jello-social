const express = require('express');
const { PrismaClient } = require('@prisma/client')

const app = express();
const PORT = 5000;
const morgan = require('morgan')
const authRouter = require('./routes/authRouter')
const feedRouter = require('./routes/feedRouter')
const postRouter = require('./routes/postRotuer')
const groupRouter = require('./routes/groupRouter')

const globalErrorHandler = require('./controllers/errorController');


app.use(morgan('dev'));
// app.use('*', (req, res) => console.log( req.protocol + '://' + req.get('host') + req.originalUrl))
app.use(express.json({ limit: '10kb' }));


app.listen(PORT, (error) => {
        if (!error)
            console.log("Server is Successfully Running,and App is listening on port " + PORT)
        else
            console.log("Error occurred, server can't start", error);
    }
);

app.get('/', (req, res) => {
    return res.status(200).json({
        msg: 'Hello',
        status: 'Test'
    })
})


app.use('/auth', authRouter)
app.use('/feed', feedRouter)
app.use('/post', postRouter)
app.use('/group', groupRouter)

app.use(globalErrorHandler);



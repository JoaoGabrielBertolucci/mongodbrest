import  express  from "express";

const app = express()
const port = 4000

app.use(express.json())

app.use('/', express.static('public'))

import rotasPoliticos from './routes/politicos.js'

app.use('/favicon.icon', express.static('public/images/brazil.png'))

app.use('/api/politicos', rotasPoliticos)

app.get('/api', (req, res) => {
    res.status(200).json({
        message:'Uau! API 100% funcional.',
        version: '1.0.0'
    })
})

app.use(function (req, res) {
    res.status(404).json({
        errors: [{
            value: `${req.originalUrl}`,
            msg: `A rota ${req.originalUrl} não existe nesta API!`,
            param: 'invalid route'
        }]
    })
})

app.listen(port, function(){
    console.log(`Servidor rodando na porta ${port}`)
})
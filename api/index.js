import  express  from "express";

import cors from 'cors'
//import das rotas da app


const app = express()
const port = 4000

// import das rotas da app 
import rotasPoliticos from './routes/politicos.js'
import rotasUsuarios from './routes/usuarios.js'

//Habilita o CORS Cross-Origin resource sharing
app.use(cors({
    origin: ['http://127.0.0.1:5500','http://localhost:4000'] //informe outras URL´s se necessário
  }));

app.use(express.json()) // irá fazer o parse de arquivos JSON
// rotas de conteúdo público
app.use('/', express.static('public'))

//configura o favicon
app.use('/favicon.icon', express.static('public/images/brazil.png'))

// rotas da api
app.use('/api/politicos', rotasPoliticos)
app.use('/api/usuarios', rotasUsuarios)

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
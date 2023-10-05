import  express  from "express";

const app = express()
const port = 2002

app.use(express.json()) 

app.use('/', express.static('public'))

//Rotas api
app.get('/api', (req, res) => {
    res.status(200).json({
        message:'UAU API Fatec 100% funcional',
        version: '1.0.0'
    })

})

app.listen(port, function(){
    console.log(`Servidor Rodando na porta ${port}`)
})
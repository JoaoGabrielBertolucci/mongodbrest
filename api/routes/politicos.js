import express from 'express';
import { connectToDatabase} from '../utils/mongodb.js';
import { check, validationResult } from 'express-validator'

const router = express.Router()
const {db, ObjectId} = await connectToDatabase()
const nomeCollection = 'politicos'

const validaPolitico = [
    check('nome')
    .not().isEmpty().trim().withMessage('É obrigatório informar o nome'),
    check('partido')
    .not().isEmpty().trim().withMessage('É obrigatório informar o partido'),
    check('cargo')
    .not().isEmpty().trim().withMessage('É obrigatório informar o cargo'),
    check('data_filiação')
    .not().isEmpty().trim().withMessage('É obrigatório informar a data de filiação'),
    check('valor_ajuda_mensal')
    .isNumeric().withMessage('O valor da ajuda mensal deve ser um número'),
    check('numerourna')
    .isNumeric().withMessage('O número da urna deve ser um número'),
]

/**
 * GET /api/politicos
 * Lista todos os políticos
 */
router.get('/', async(req, res) => {
    try{
        db.collection(nomeCollection).find().sort({nome: 1})
        .toArray((err, docs)=> {
            if(!err){
                res.status(200).json(docs)
            }
        })
    }catch(err){
        res.status(500).json({
            errors: [{
                value: `${err.message}`,
                msg: 'Erro ao obter a listagem dos políticos.',
                param: '/'
            }]
        })
    }
})

/**
 * GET /api/prestadores/id/:id
 * Lista um político pelo id
 */
router.get('/id/:id', async(req, res)=> {
    try{
        db.collection(nomeCollection).find({'_id': {$eq: ObjectId(req.params.id)}})
        .toArray((err, docs) => {
            if(err){
                res.status(400).json(err) // bad request
            } else {
                res.status(200).json(docs) // retorna o documento
            }
        })
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
})

/**
 * DELETE /api/politicos/:id
 * Apaga o político pelo id
 */
router.delete('/:id', async(req, res) => {
    await db.collection(nomeCollection)
    .deleteOne({"_id": { $eq: ObjectId(req.params.id)}})
    .then(result => res.status(200).send(result))
    .catch(err => res.status(400).json(err))
})

/**
 * POST /api/politicos
 * Insere um novo político
 */
router.post('/', validaPolitico, async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json(({
            errors: errors.array()
        }))
    } else {
        await db.collection(nomeCollection)
        .insertOne(req.body)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).json(err))
    }
})

/**
 * PUT /api/politicos
 * Altera um político
 */
router.put('/', validaPolitico, async(req, res) => {
    let idDocumento = req.body._id //armazenando o id do documento
    delete req.body._id //iremos remover o id do body
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json(({
            errors: errors.array()
        }))
    } else {
        await db.collection(nomeCollection)
        .updateOne({'_id': {$eq : ObjectId(idDocumento)}},
                   { $set: req.body})
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).json(err))
    }
})

export default router
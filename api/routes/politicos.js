import express from 'express';
import { connectToDatabase} from '../utils/mongodb.js';

const router = express.Router()
const {db, ObjectId} = await connectToDatabase()
const nomeCollection = 'politicos'


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

router.post('/', async(req, res) => {
    
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
});

export default router

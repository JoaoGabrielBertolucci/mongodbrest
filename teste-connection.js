import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://prjMongoDB:Fatec@2023@prjmongodb.qgqvkyb.mongodb.net/';

async function testConnection() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('Conectado com sucesso ao MongoDB');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
    } finally {
        client.close();
    }
}

testConnection();

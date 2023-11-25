
//const urlBase = 'https://projeto.vercel.app/api'
const urlBase = 'http://localhost:4000/api'
const resultadoModal = new bootstrap.Modal(document.getElementById("modalMensagem"))
const access_token = localStorage.getItem("token") || null

//evento submit do formulário
document.getElementById('formPolitico').addEventListener('submit', function (event) {
    event.preventDefault() // evita o recarregamento
    const idPolitico = document.getElementById('id').value
    let politico = {}

    if (idPolitico.length > 0) { //Se possuir o ID, enviamos junto com o objeto
        politico = {
            "_id": idPolitico,
            "nome": document.getElementById('nome').value,
            "partido": document.getElementById('partido').value,
            "cargo": document.getElementById('cargo').value,
            "numerourna": document.getElementById('numerourna').value,
            "valor_ajuda_mensal": document.getElementById('valor_ajuda_mensal').value,
            "data_filiação": document.getElementById('inicio').value,
        }
    } else {
        politico = {
            "_id": idPolitico,
            "nome": document.getElementById('nome').value,
            "partido": document.getElementById('partido').value,
            "cargo": document.getElementById('cargo').value,
            "numerourna": document.getElementById('numerourna').value,
            "valor_ajuda_mensal": document.getElementById('valor_ajuda_mensal').value,
            "data_filiação": document.getElementById('inicio').value
        }
    }
    salvaPolitico(politico)
    async function salvaPolitico(politico) { 
    if (politico.hasOwnProperty('_id')) { //Se o politico tem o id iremos alterar os dados (PUT)
        // Fazer a solicitação PUT para o endpoint dos politicos
        await fetch(`${urlBase}/politicos`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "access-token": access_token //envia o token na requisição
            },
            body: JSON.stringify(politico)
        })
            .then(response => response.json())
            .then(data => {
                // Verificar se o token foi retornado        
                if (data.acknowledged) {
                    alert('✔ politico alterado com sucesso!')
                    //Limpar o formulário
                    document.getElementById('formPolitico').reset()
                    //Atualiza a UI
                    carregaPoliticos()
                } else if (data.errors) {
                    // Caso haja erros na resposta da API
                    const errorMessages = data.errors.map(error => error.msg).join("\n");
                    // alert("Falha no login:\n" + errorMessages);
                    document.getElementById("mensagem").innerHTML = `<span class='text-danger'>${errorMessages}</span>`
                    resultadoModal.show();
                } else {
                    document.getElementById("mensagem").innerHTML = `<span class='text-danger'>${JSON.stringify(data)}</span>`
                    resultadoModal.show();
                }
            })
            .catch(error => {
                document.getElementById("mensagem").innerHTML = `<span class='text-danger'>Erro ao salvar o politico: ${error.message}</span>`
                resultadoModal.show();
            });

    } else { //caso não tenha o ID, iremos incluir (POST)
        // Fazer a solicitação POST para o endpoint dos politicos
        await fetch(`${urlBase}/politicos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "access-token": access_token //envia o token na requisição
            },
            body: JSON.stringify(politico)
        })
            .then(response => response.json())
            .then(data => {
                // Verificar se o token foi retornado        
                if (data.acknowledged) {
                    alert('✔ politico incluído com sucesso!')
                    //Limpar o formulário
                    document.getElementById('formPolitico').reset()
                    //Atualiza a UI
                    carregaPoliticos()
                } else if (data.errors) {
                    // Caso haja erros na resposta da API
                    const errorMessages = data.errors.map(error => error.msg).join("\n");
                    // alert("Falha no login:\n" + errorMessages);
                    document.getElementById("mensagem").innerHTML = `<span class='text-danger'>${errorMessages}</span>`
                    resultadoModal.show();
                } else {
                    document.getElementById("mensagem").innerHTML = `<span class='text-danger'>${JSON.stringify(data)}</span>`
                    resultadoModal.show();
                }
            })
            .catch(error => {
                document.getElementById("mensagem").innerHTML = `<span class='text-danger'>Erro ao salvar o politico: ${error.message}</span>`
                resultadoModal.show();
            });
    }}

    async function carregaPoliticos() {
    
        const tabela = document.getElementById('dadosTabela');
        tabela.innerHTML = '';
    
        try {
            let url = `${urlBase}/politicos`;
    
            console.log(url);
    
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "access-token": access_token
                }
            });
    
            const data = await response.json();
            console.log(url);
            console.log("Resposta da API:", data);
    
            data.forEach(politico => {
                tabela.innerHTML += `
                    <tr>
                        <td>${politico.nome}</td>
                        <td>${politico.partido}</td>
                        <td>${politico.cargo}</td>
                        <td>${politico.numerourna}</td>                   
                        <td>${politico.valor_ajuda_mensal}</td> 
                        <td>${politico.data_filiação}</td> 
                        <td>
                            <button class='btn btn-danger btn-sm' onclick='removepolitico("${politico._id}")'>🗑 Excluir </button>
                            <button class='btn btn-warning btn-sm' onclick='buscapoliticoPeloId("${politico._id}")'>📝 Editar </button>
                        </td>           
                    </tr>
                `;
            });
        } catch (error) {
            console.error(`Erro na chamada da API: ${error.message}`);
            res.status(500).json({ 'error': error.message });
            console.error('Erro ao carregar os politicos:', error.message);
            document.getElementById("mensagem").innerHTML = `<span class='text-danger'>Erro ao carregar os politicos: ${error.message}</span>`;
            resultadoModal.show();
        }
    }

})

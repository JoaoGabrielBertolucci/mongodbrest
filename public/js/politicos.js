//const urlBase = 'https://projeto.vercel.app/api'
const urlBase = 'http://localhost:4000/api'
const resultadoModal = new bootstrap.Modal(document.getElementById("modalMensagem"))
const access_token = localStorage.getItem("token") || null

//evento submit do formulário
document.getElementById('formPolítico').addEventListener('submit', function (event) {
    event.preventDefault() // evita o recarregamento
    const idPolitico = document.getElementById('id').value
    let politico = {}

    // Dados do usuário para registro
    const dadosRegistro = {
        nome: nome,
        email: email,
        senha: senha
    };

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

    if (politico.hasOwnProperty('_id')) { //Se o politico tem o id iremos alterar os dados (PUT)
        // Fazer a solicitação PUT para o endpoint dos politicoes
        await fetch(`${urlBase}/politicoes`, {
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
                    document.getElementById('formpolitico').reset()
                    //Atualiza a UI
                    carregapoliticoes()
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
        // Fazer a solicitação POST para o endpoint dos politicoes
        await fetch(`${urlBase}/politicoes`, {
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
                    document.getElementById('formpolitico').reset()
                    //Atualiza a UI
                    carregapoliticoes()
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

})

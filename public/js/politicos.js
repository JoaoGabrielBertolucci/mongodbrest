//const urlBase = 'https://projeto.vercel.app/api'
const urlBase = 'http://localhost:4000/api'
const resultadoModal = new bootstrap.Modal(document.getElementById("modalMensagem"))
const access_token = localStorage.getItem("token") || null

//evento submit do formulário
document.getElementById('formPolítico').addEventListener('submit', function (event) {
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
    salvaPrestador(politico)
})

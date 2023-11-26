const urlBase = 'https://mongodbrest.vercel.app/api'
//const urlBase = 'http://localhost:4000/api';

document.getElementById("registroForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const resultadoModal = new bootstrap.Modal(document.getElementById("modalMensagem"));

    // Dados do usuário para registro
    const dadosRegistro = {
        nome: nome,
        email: email,
        senha: senha
    };

    fetch(`${urlBase}/usuarios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosRegistro)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Response from server:", data);
    
            // Verificar se o registro foi bem-sucedido
            if (data.acknowledged) {
                // Exibir a mensagem de sucesso no modal
                document.getElementById("mensagem").innerHTML = `<span class='text-success'>${data.message}</span>`;
                // Adicionar um evento ao botão "Fechar" do modal
                const fecharBotao = document.getElementById("fecharBotao");
                fecharBotao.addEventListener("click", () => {
                    window.location.href = "index.html";
                });
                // Mostrar o modal
                resultadoModal.show();
            } else if (data.errors) {
                // Caso haja erros na resposta da API
                const errorMessages = data.errors.map(error => error.msg).join("\n");
                // alert("Falha no login:\n" + errorMessages);
                document.getElementById("mensagem").innerHTML = `<span class='text-danger'>${errorMessages}</span>`
                resultadoModal.show();
            } else {
                document.getElementById("mensagem").innerHTML = `<span class='text-danger'>Não foi possível efetuar o registro. Verifique suas informações.</span>`
                resultadoModal.show();
            }
        })
        .catch(error => {
            console.error("Erro durante o registro:", error);
        });
});
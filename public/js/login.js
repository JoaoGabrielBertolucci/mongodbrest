//const urlBase = 'https://backend-mongodb-pi.vercel.app/api'
const urlBase = 'http://localhost:4000/api'
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault()
    const login = document.getElementById("login").value
    const senha = document.getElementById("senha").value
    const resultadoModal = new bootstrap.Modal(document.getElementById("modalMensagem"))

    // Dados do usuário para autenticação
    const dadosLogin = {
        email: login,
        senha: senha
    };

    // Fazer a solicitação POST para o endpoint de login
    fetch(`${urlBase}/usuarios/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosLogin)
    })
        .then(response => response.json())
        .then(data => {
            // Verificar se o token foi retornado        
            if (data.access_token) {
                // Armazenar o token no localStorage
                localStorage.setItem("token", data.access_token);
                window.location.href = "menu.html";
            } else if (data.errors) {
                // Caso haja erros na resposta da API
                const errorMessages = data.errors.map(error => error.msg).join("\n");
                // alert("Falha no login:\n" + errorMessages);
                document.getElementById("mensagem").innerHTML = `<span class='text-danger'>${errorMessages}</span>`
                resultadoModal.show();
            } else {
                document.getElementById("mensagem").innerHTML = `<span class='text-danger'>Não foi possível efetuar o login. Verifique as suas credenciais.</span>`
                resultadoModal.show();
            }
        })
        .catch(error => {
            console.error("Erro durante o login:", error);
        });
});
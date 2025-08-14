document.getElementById("formUsuario").addEventListener("submit", function (event) {
    event.preventDefault();

    const dados = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    };

    fetch("http://localhost:8081/usuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao cadastrar!");
            return response.json();
        })
        .then(data => {
            alert("Usuário cadastrado com sucesso!");
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao cadastrar.");
        });
});

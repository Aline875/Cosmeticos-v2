function validarLogin() {
    // Validação dos campos...
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Recuperar os dados de cadastro do localStorage
    const cadastroEmail = localStorage.getItem('cadastroEmail');
    const cadastroSenha = localStorage.getItem('cadastroSenha');

    console.log("Email cadastrado:", cadastroEmail);
    console.log("Senha cadastrada:", cadastroSenha);

    // Verificar se os dados de login correspondem aos dados de cadastro
    if (email === cadastroEmail && senha === cadastroSenha) {
        // Login bem-sucedido
        window.location.href = "/"; // Redireciona para a página principal
        alert("Login bem-sucedido!");
    } else {
        // Credenciais inválidas
        alert("Credenciais inválidas. Por favor, verifique e tente novamente.");
    }
}

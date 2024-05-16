function validarCadastro() {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmaSenha = document.getElementById("confirmarsenha").value;
    const nome = document.getElementById("nome").value;

        localStorage.setItem('cadastroNome', nome);
        localStorage.setItem('cadastroEmail', email);
        localStorage.setItem('cadastroSenha', senha);

    if (nome.trim() === "" || email.trim() === "" || senha.trim() === "" || confirmaSenha.trim() === "") {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem. Por favor, verifique e tente novamente.");
        return false;
    }

    // Se todas as verificações passarem, exibimos a mensagem de sucesso e permitimos o envio do formulário
    alert("Usuário cadastrado com sucesso!!");
    return true;
}


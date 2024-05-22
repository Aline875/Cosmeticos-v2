function validarCadastro() {
    // Obter os valores dos campos do formulário
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const confirmaSenha = document.getElementById("confirmarsenha").value.trim();
  
    // Validar se todos os campos estão preenchidos
    if (nome === "" || email === "" || senha === "" || confirmaSenha === "") {
      alert("Por favor, preencha todos os campos.");
      return false;
    }
  
    // Validar se as senhas coincidem
    if (senha !== confirmaSenha) {
      alert("As senhas não coincidem. Por favor, verifique e tente novamente.");
      return false;
    }
  
    // Criar um objeto JSON com os dados do formulário
    const userData = {
      nome: nome,
      email: email,
      senha: senha,
      confirmaSenha: confirmaSenha
    };
  
    // Converter o objeto JSON em string
    const jsonData = JSON.stringify(userData);
  
    // Enviar os dados para o backend usando fetch API
    fetch('http://localhost:3000/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    })
      .then(response => {
        // Processar a resposta do backend (ex: verificar se o cadastro foi bem-sucedido)
        if (response.ok) {
          alert("Usuário cadastrado com sucesso!");
        } else {
          alert("Erro ao cadastrar usuário. Tente novamente mais tarde.");
        }
      })
      .catch(error => {
        console.error('Erro ao enviar dados para o backend:', error);
        alert("Falha na comunicação com o servidor. Tente novamente mais tarde.");
      });
  
    // Evitar o envio nativo do formulário
    return false;
  }
  
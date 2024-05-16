function validarEmail(email)
{
    const validacao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validacao.test(email)
}

function cadastrarEmail() {
    var email = document.getElementById("email").value;

    if(validarEmail(email))
        {
            alert("Email cadastrado com sucesso!")
        }
        else
        {
            alert("Por favor, insira um email válido.")
        }
}
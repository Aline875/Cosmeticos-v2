function validaFormulario()
{
     const email = document.getElementById("email").value;
     const senha = document.getElementById("senha").value

    if(email == "" || senha == "" )
        {
            alert('Por favor preencha todos os campos')
            return false;
        }
        document.getElementById("form").submit();
}
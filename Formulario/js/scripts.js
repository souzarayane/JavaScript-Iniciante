const form = document.querySelector("#form");
const nameInput = document.querySelector("nome");
const emailInput = document.querySelector("email");
const passwordInput = document.querySelector("#pwd");
const jobSelect = document.querySelector("#job");
const messageTextarea = document.querySelector("#msg");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    //Verifica se o campo nome está vazio
    if(nameInput.value === ""){
        alert("Nome deve ser preenchido");
        return;
    }

    //Verifica se o campo e-mail está preenchido e se é válido
    if(emailInput.value === ""){
        alert("O campo e-mai deve ser preenchido");
        return;
    }

    //Se todos os campos estão preenchidos, enviar formulário
    form.submit();
});
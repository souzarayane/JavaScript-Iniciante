var list2 = document.getElementById('lista');

function adicionar() {
    let text = document.getElementById('texto').value;
    let list = document.getElementById('lista').innerHTML;

    list += "<li>" + text + "</li>";

    document.getElementById("lista").innerHTML = list;
    document.getElementById('texto').value = " ";
}

function remover() {
    list2.innerHTML = " ";
}
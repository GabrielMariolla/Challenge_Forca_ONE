let campoAdicionar = document.querySelector("textarea")
let palavrasCriadas = JSON.parse(localStorage.getItem("palavrasCriadas")) || []

function validarPalavra(palavra) {
    return /(^[a-zA-Z]{3,8}$)/gm.test(palavra)
}

function addPalavra() {

    if (validarPalavra(campoAdicionar.value)) {
        palavrasCriadas.push(campoAdicionar.value)
        localStorage.setItem("palavrasCriadas", JSON.stringify(palavrasCriadas))
        window.location.assign("play.html")
    } else {
        alert("Digite uma palavra válida")
    }
}
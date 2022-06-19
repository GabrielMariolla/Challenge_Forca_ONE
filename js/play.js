let palavras = ['Roupa', 'Cavalo', 'Carro', 'Celular', 'Arroz', 'Rodovia', 'Galinha', 'Boi']
const campoLetras = document.querySelector(".letras")
let palavraSelecionada
let lstErros = []
let lstAcertos = []
let msgResultado = document.querySelector('main h2')
let botaoDesistir = document.getElementById('desistir')
let palavrasCriadas = JSON.parse(localStorage.getItem("palavrasCriadas")) || []

function selectPalavra(wordList) {
  const random = Math.floor(Math.random() * wordList.length)
  return wordList[random]
}

function criarCampos(palavra) {
  palavra.split('').forEach(letra => {
    campoLetras.innerHTML += `<span class="letter"></span>`
  })
}

function iniciarJogo() {
  palavraSelecionada = selectPalavra([...palavras, ...palavrasCriadas])
  criarCampos(palavraSelecionada)
}


function verificaLetra(key) {
  if (palavraSelecionada.toLowerCase().includes(key)) {
    salvaLetra(key.toLowerCase())
  } else {
    adicionaErro(key)
  }
}

function adicionaErro(key) {
  const letraErrada = document.querySelector('.letraerrada span')
  if (!lstErros.includes(key)) {
    lstErros.push(key)
    letraErrada.innerHTML += key
  }
  switch (lstErros.length) {
    case 1:
      pincel.arc(130, 245, 20, 0, 2 * Math.PI)
      pincel.stroke()
      break;
    case 2:
      pincel.moveTo(130, 265)
      pincel.lineTo(130, 330)
      pincel.stroke()
      break;
    case 3:
      pincel.moveTo(130, 275)
      pincel.lineTo(100, 315)
      pincel.stroke()
      break;
    case 4:
      pincel.moveTo(130, 275)
      pincel.lineTo(160, 315)
      pincel.stroke()
      break;
    case 5:
      pincel.moveTo(130, 330)
      pincel.lineTo(100, 380)
      pincel.stroke()
      break;
    case 6:
      pincel.moveTo(130, 330)
      pincel.lineTo(160, 380)
      pincel.stroke()
      perdeu()
      break;
    default:
      break;
  }
}

function desistir() {
  const letras = document.querySelectorAll('.letter')
  palavraSelecionada.split('').forEach((letra, i) => {
    letras[i].innerHTML = letra
    lstAcertos.push(letra)
  })
  perdeu()
}

function perdeu() {
  msgResultado.classList.add("lose")
  msgResultado.textContent = "Você Perdeu!"
  botaoDesistir.style.display = 'none'
  const letras = document.querySelectorAll('.letter')
  palavraSelecionada.toLowerCase().split('').forEach((letra, i) => {
    letras[i].innerHTML = letra
  })
}

function salvaLetra(key) {
  const letras = document.querySelectorAll('.letter')
  palavraSelecionada.toLowerCase().split('').forEach((letra, i) => {
    if (letra == key) {
      lstAcertos.push(key)
      letras[i].innerHTML = letra
    }
    if (lstAcertos.length == palavraSelecionada.length) {
      msgResultado.classList.add("win")
      msgResultado.textContent = "Você Ganhou!"
      botaoDesistir.style.display = 'none'
    }
  })
}

function validarTeclaPressionada(tecla) {
  return /(^[a-zA-Z]{1}$)/.test(tecla) && !lstAcertos.includes(tecla) && lstAcertos.length < palavraSelecionada.length
}

document.addEventListener('keydown', (e) => {
  if (lstErros.length < 6) {
    if (validarTeclaPressionada(e.key.toLowerCase())) {
      verificaLetra(e.key.toLowerCase())
    }
  }
})

botaoDesistir.addEventListener('click', () => {
  desistir()
})
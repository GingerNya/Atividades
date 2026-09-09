const tabuleiro = document.getElementById("tabuleiro");
const botaoResetar = document.getElementById("resetar");

const simbolos = ["🍎", "🍌", "🍇", "🍓", "🍉", "🍊", "🥝", "🍒"];

let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;


// Criar o jogo
function criarJogo() {

    tabuleiro.innerHTML = "";

    let cartas = [...simbolos, ...simbolos];

    cartas.sort(() => Math.random() - 0.5);

    cartas.forEach(function(simbolo) {

        const carta = document.createElement("div");

        carta.classList.add("carta");

        carta.textContent = "?";

        carta.dataset.simbolo = simbolo;

        carta.addEventListener("click", virarCarta);

        tabuleiro.appendChild(carta);
    });
}


// Virar carta
function virarCarta() {

    if (bloqueado) {
        return;
    }

    if (this === primeiraCarta) {
        return;
    }

    this.textContent = this.dataset.simbolo;

    if (primeiraCarta === null) {

        primeiraCarta = this;

    } else {

        segundaCarta = this;

        verificarPar();
    }
}


// Verificar par
function verificarPar() {

    if (primeiraCarta.dataset.simbolo === segundaCarta.dataset.simbolo) {

        primeiraCarta = null;
        segundaCarta = null;

    } else {

        bloqueado = true;

        setTimeout(function() {

            primeiraCarta.textContent = "?";
            segundaCarta.textContent = "?";

            primeiraCarta = null;
            segundaCarta = null;

            bloqueado = false;

        }, 1000);
    }
}


// Botão de resetar
botaoResetar.addEventListener("click", function() {

    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;

    criarJogo();
});


// Iniciar jogo
criarJogo();
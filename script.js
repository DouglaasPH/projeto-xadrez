const quadrados = document.querySelectorAll(".quadrado");
const pecas = document.getElementsByTagName("i");
const acessibilidade = document.querySelector(".vez-de-jogador");

function movimentarPeca(casaAtual) {
    const tipoDePeca = casaAtual.getElementsByTagName("div")[0].getAttribute("peca");
    const limiteLadoDireito = [8, 16, 24, 32, 40, 48, 56, 64];
    const limiteLadoEsquerdo = [-1, 7, 15, 23, 31, 39, 47, 55,];

    switch (tipoDePeca) {
        //TODO continuar com cada caso para cada peça
        case "pawn":
            const movimento = [quadrados[Number(casaAtual.id) + 8], quadrados[Number(casaAtual.id) + 1], quadrados[Number(casaAtual.id) - 1]];

            if (movimento[0].children.length == 0) {
                movimento[0].innerHTML = "⚫";
                movimento[0].classList.add("ponto-preto");
            }
            if (movimento[1].children.length == 0 && !limiteLadoDireito.includes(Number(casaAtual.id) + 1)) {
                movimento[1].innerHTML = "⚫";
                movimento[1].classList.add("ponto-preto");
            }

            if (movimento[2].children.length == 0 && !limiteLadoEsquerdo.includes(Number(casaAtual.id) - 1)) {
                movimento[2].innerHTML = "⚫";
                movimento[2].classList.add("ponto-preto");
            }
            ;

            break;
        case "rook":
            let continuarParaFrente = true;
            let continuarParaTras = true;
            let continuarParaDireita = true;
            let continuarParaEsquerda = true;

            for (let i = 1; i < 8; i++) {
                if (continuarParaFrente && Number(casaAtual.id) + i * (-8) <= 63 && quadrados[Number(casaAtual.id) + i * 8].children.length == 0) {
                    quadrados[Number(casaAtual.id) + i * 8].innerHTML = "⚫";
                    quadrados[Number(casaAtual.id) + i * 8].classList.add("ponto-preto");
                    console.log(quadrados[Number(casaAtual.id) + i * 8])
                } else continuarParaFrente = false;

                if (continuarParaTras && Number(casaAtual.id) + i * (-8) >= 0 && quadrados[Number(casaAtual.id) + i * (-8)].children.length == 0) {
                    quadrados[Number(casaAtual.id) + i * (-8)].innerHTML = "⚫";
                    quadrados[Number(casaAtual.id) + i * (-8)].classList.add("ponto-preto");
                    console.log(quadrados[Number(casaAtual.id) + i * (-8)])
                } else continuarParaTras = false;

                if (continuarParaDireita && !limiteLadoDireito.includes(Number(casaAtual.id) + i) && quadrados[Number(casaAtual.id) + i].children.length == 0) {
                    quadrados[Number(casaAtual.id) + i].innerHTML = "⚫";
                    quadrados[Number(casaAtual.id) + i].classList.add("ponto-preto");
                } else continuarParaDireita = false;

                if (continuarParaEsquerda && !limiteLadoEsquerdo.includes(Number(casaAtual.id) - i) && quadrados[Number(casaAtual.id) - i].children.length == 0) {
                    quadrados[Number(casaAtual.id) - i].innerHTML = "⚫";
                    quadrados[Number(casaAtual.id) - i].classList.add("ponto-preto");
                } else continuarParaEsquerda = false;
            }
            break;
    
        default:
            break;
    }
};

function removerPontosPretos(pecaParaMover, casaInicio) {
    switch (pecaParaMover.getAttribute("peca")) {
        //TODO continuar com cada caso para cada peça
        case "pawn":
            const movimento = [quadrados[Number(casaInicio.id) + 8], quadrados[Number(casaInicio.id) + 1], quadrados[Number(casaInicio.id) - 1]];
            movimento.forEach(function (quadrado) {
                if (quadrado.innerHTML == "⚫") {
                    quadrado.innerHTML = "";
                    quadrado.classList.remove("ponto-preto")
                }
            });
            break;
        case "rook":
            for (let i = 1; i < 8; i++) {
                console.log(quadrados[Number(casaInicio.id) + i * 8])
                if (Number(casaInicio.id) + i * 8 <= 63 && quadrados[Number(casaInicio.id) + i * 8].innerHTML == "⚫") {
                    quadrados[Number(casaInicio.id) + i * 8].innerHTML = "";
                    quadrados[Number(casaInicio.id) + i * 8].classList.remove("ponto-preto")
                }
                if (Number(casaInicio.id) + i * (-8) >= 0 && quadrados[Number(casaInicio.id) + i * (-8)].innerHTML == "⚫") {
                    quadrados[Number(casaInicio.id) + i * (-8)].innerHTML = "";
                    quadrados[Number(casaInicio.id) + i * (-8)].classList.remove("ponto-preto")
                }
                if (Number(casaInicio.id) + i + 1 <= 63 && quadrados[Number(casaInicio.id) + i].innerHTML == "⚫") {
                    quadrados[Number(casaInicio.id) + i].innerHTML = "";
                    quadrados[Number(casaInicio.id) + i].classList.remove("ponto-preto")
                }
                if (Number(casaInicio.id) - i >= 0 && quadrados[Number(casaInicio.id) - i].innerHTML == "⚫") {
                    quadrados[Number(casaInicio.id) - i].innerHTML = "";
                    quadrados[Number(casaInicio.id) - i].classList.remove("ponto-preto")
                }
            }
        default:
            break;
    }
};

//TODO criar funcionalidade que seja ao click, e não apenas pelo drag.
function clickIniciado(evt) {
    //TODO movimentarPeca(evt.target);
}

function dragOverIniciado(event) {
    event.preventDefault();
}

function dragStartIniciado(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    movimentarPeca(event.target);
}

function dropIniciado(event) {
    event.preventDefault();
    const idDaCasaDaPecaParaMover = event.dataTransfer.getData('text/plain');
    const pecaParaMover = document.getElementById(idDaCasaDaPecaParaMover).getElementsByTagName("div")[0];
    const casaDestino = event.target;

    if (casaDestino.classList.contains("ponto-preto")) {
        casaDestino.classList.remove("ponto-preto")
        casaDestino.innerHTML = "";
        removerPontosPretos(pecaParaMover, document.getElementById(idDaCasaDaPecaParaMover));
        casaDestino.appendChild(pecaParaMover)
        //TODO criar funcionalidade para trocar de jogador (branco/preto)
        //TODO trocarJogador();
    } else {
        alert("Você não pode ir para esta casa. Escolha uma casa com ponto preto.")
    }
}

quadrados.forEach(quadrado => {
    quadrado.addEventListener("dragstart", dragStartIniciado);
    quadrado.addEventListener("dragover", dragOverIniciado);
    quadrado.addEventListener("drop", dropIniciado);
    quadrado.addEventListener("click", clickIniciado);
});
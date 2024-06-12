const quadrados = Array.from(document.querySelectorAll(".quadrado"));
const pecas = document.getElementsByTagName("i");
const acessibilidade = document.querySelector(".vez-de-jogador");
var casaAlvoDoClick = [];

//TODO XEQUEMATE (VITÓRIA/DERROTA)

function movimentarPeca(casaAtual) {
    const tipoDePeca = casaAtual.getElementsByTagName("div")[0].getAttribute("peca");
    const limiteLadoDireito = [8, 16, 24, 32, 40, 48, 56, 64];
    const limiteLadoEsquerdo = [-1, 7, 15, 23, 31, 39, 47, 55,];

    switch (tipoDePeca) {
        //TODO terminar o movimentador para cada peça
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
                } else continuarParaFrente = false;

                if (continuarParaTras && Number(casaAtual.id) + i * (-8) >= 0 && quadrados[Number(casaAtual.id) + i * (-8)].children.length == 0) {
                    quadrados[Number(casaAtual.id) + i * (-8)].innerHTML = "⚫";
                    quadrados[Number(casaAtual.id) + i * (-8)].classList.add("ponto-preto");
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
    console.log(pecaParaMover, casaInicio);
    switch (pecaParaMover.getAttribute("peca")) {
        //TODO terminar o removedor de pontos pretos cada peça
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

function removerEColocarBorda(divDaBorda) {
    console.log(divDaBorda)
    if (!divDaBorda.classList.contains("borda")) {
        divDaBorda.classList.add("borda");
    } else divDaBorda.classList.remove("borda");
}

function TrocarJogador() {
    let reverterId = [];
    for (let i = 0; i < quadrados.length; i++) {
        reverterId.push(quadrados[i].id)
    }
    reverterId.reverse();

    if (acessibilidade.textContent === "Preto") {
        acessibilidade.innerHTML = "Branco";
    }
    else if (acessibilidade.textContent === "Branco") {
        acessibilidade.innerHTML = "Preto";
    }

    for (let i = 0; i < quadrados.length; i++) {
        quadrados[i].id = reverterId[i];
    }
    quadrados.reverse();
}

//FASE PARA TESTES (funcionalidade: jogar pelo click)
function clickIniciado(event) {
    //FASE PARA TESTES (VERIFICAÇÃO SE A PEÇA CLICADA PERTENCE AO JOGADOR DA VEZ)
    if (`jogador-${acessibilidade.textContent.toLowerCase()}` === event.target.parentElement.classList[0]) {
        if (event.target.classList.contains("fa-solid") && !event.target.parentElement.classList.contains("borda")) {
            //FASE PARA TESTES
            quadrados.forEach(quadradoAtual => {
                if (quadradoAtual.firstChild != null && quadradoAtual.innerHTML !== "⚫" && quadradoAtual.firstChild.classList.contains("borda")) {
                    console.log(quadradoAtual)
                    removerEColocarBorda(quadradoAtual.firstChild);
                    removerPontosPretos(quadradoAtual.firstChild, quadradoAtual);
                }
            });

            movimentarPeca(event.target.parentElement.parentElement);
            removerEColocarBorda(event.target.parentElement);
            casaAlvoDoClick.push(event.target.parentElement.parentElement, event.target.parentElement)
        }
        else if (event.target.parentElement.classList.contains("borda")) {
            removerEColocarBorda(event.target.parentElement);
            removerPontosPretos(event.target.parentElement, event.target.parentElement.parentElement)
            casaAlvoDoClick = [];
        }
    }
    //FASE PARA TESTES (funcionalidade: clicar numa casa, a peça ir para a casa)
    else if (!event.target.classList.contains("fa-solid") && event.target.classList.contains("ponto-preto")) {
        removerEColocarBorda(casaAlvoDoClick[1]);
        removerPontosPretos(casaAlvoDoClick[1], casaAlvoDoClick[0])
        event.target.appendChild(casaAlvoDoClick[1])
        casaAlvoDoClick = [];
        TrocarJogador();
    } else alert(`Não é sua vez!`);
}

function dragOverIniciado(event) {
    event.preventDefault();
}

function dragStartIniciado(event) {
    //FASE PARA TESTES (VERIFICAÇÃO SE A PEÇA CLICADA PERTENCE AO JOGADOR DA VEZ)
    console.log(event.target.firstChild)
    if (`jogador-${acessibilidade.textContent.toLowerCase()}` === event.target.firstChild.classList[0]) {
        event.dataTransfer.setData('text/plain', event.target.id);
        movimentarPeca(event.target);
    } else alert(`Não é sua vez!`);
}

function dropIniciado(event) {
    event.preventDefault();
    const idDaCasaDaPecaParaMover = event.dataTransfer.getData('text/plain');
    const pecaParaMover = document.getElementById(idDaCasaDaPecaParaMover).getElementsByTagName("div")[0];
    pecaParaMover.classList.remove("borda");
    const casaDestino = event.target;

    if (casaDestino.classList.contains("ponto-preto")) {
        casaDestino.classList.remove("ponto-preto")
        casaDestino.innerHTML = "";
        removerPontosPretos(pecaParaMover, document.getElementById(idDaCasaDaPecaParaMover));
        casaDestino.appendChild(pecaParaMover)
        //FASE PARA TESTES (criar funcionalidade: alterar entre jogadores (branco/preto))
        TrocarJogador();
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
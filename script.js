const quadrados = Array.from(document.querySelectorAll(".quadrado"));
const pecas = document.getElementsByTagName("i");
const acessibilidade = document.querySelector(".vez-de-jogador");

//TODO XEQUE-MATE (VITÓRIA/DERROTA)

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

function movimentarPeca(pecaParaMover, casaParaReceber) {
    const limiteLadoDireito = [8, 16, 24, 32, 40, 48, 56, 64];
    const limiteLadoEsquerdo = [-1, 7, 15, 23, 31, 39, 47, 55];
    const tipoDePeca = pecaParaMover.getAttribute("peca");
    let subtraindoDoisValores = Number(casaParaReceber.id) - Number(pecaParaMover.parentElement.id);
    let continuarOuPararLoop = true;

    switch (tipoDePeca) {
        case "pawn":

            if (pecaParaMover.getAttribute("nao-movido") == "true" && Number(casaParaReceber.id) == Number(pecaParaMover.parentElement.id) + 8 || Number(casaParaReceber.id) == Number(pecaParaMover.parentElement.id) + 16 && casaParaReceber.firstChild == null) {
                casaParaReceber.appendChild(pecaParaMover);
                pecaParaMover.setAttribute("nao-movido", false);
                TrocarJogador();
            }
            else if (pecaParaMover.getAttribute("nao-movido") == "false" && Number(casaParaReceber.id) == Number(pecaParaMover.parentElement.id) + 8 && casaParaReceber.firstChild == null) {
                casaParaReceber.appendChild(pecaParaMover);
                TrocarJogador();
            }
            else if (casaParaReceber !== null) {
                if (Number(casaParaReceber.id) == Number(pecaParaMover.parentElement.id) + 7) {
                    casaParaReceber.removeChild(casaParaReceber.firstChild);
                    casaParaReceber.appendChild(pecaParaMover);
                    TrocarJogador();
                }
                else if (Number(casaParaReceber.id) == Number(pecaParaMover.parentElement.id) + 9) {
                    casaParaReceber.removeChild(casaParaReceber.firstChild);
                    casaParaReceber.appendChild(pecaParaMover);
                    TrocarJogador();
                }
            }
            break;
        case "queen":
        case "rook":
            //FASE PARA TESTES
            let casasParaATorreIr = {
                subindo: [8, 16, 24, 32, 40, 48, 56],
                descendo: [-8, -16, -24, -32, -40, -48, -56],
                esquerda: [1, 2, 3, 4, 5, 6, 7],
                direita: [-1, -2, -3, -4, -5, -6, -7]
            };

            if (casasParaATorreIr.subindo.includes(subtraindoDoisValores)) {
                let posicaoArraySubindo = casasParaATorreIr.subindo.indexOf(subtraindoDoisValores);

                for (let i = 0; i < posicaoArraySubindo + 1; i++) {
                    const divAtualDoLoop = quadrados[Number(pecaParaMover.parentElement.id) + casasParaATorreIr.subindo[posicaoArraySubindo - i]];

                    if (continuarOuPararLoop && divAtualDoLoop.firstChild?.classList[0] === pecaParaMover.classList[0] /*!== null*/) {
                        continuarOuPararLoop = false;
                    }
                    if (continuarOuPararLoop && divAtualDoLoop.firstChild !== null && i !== 0) {
                        continuarOuPararLoop = false;
                    }
                    if (continuarOuPararLoop && i == posicaoArraySubindo) {

                        if (casaParaReceber.firstChild !== null) {
                            casaParaReceber.removeChild(casaParaReceber.firstChild);
                            casaParaReceber.appendChild(pecaParaMover);
                            TrocarJogador();
                        } else if (casaParaReceber.firstChild == null) {
                            casaParaReceber.appendChild(pecaParaMover);
                            TrocarJogador();
                        }
                    }
                }
            }
            else if (casasParaATorreIr.descendo.includes(subtraindoDoisValores)) {
                let posicaoArrayDescendo = casasParaATorreIr.descendo.indexOf(subtraindoDoisValores);
            
                for (let i = 0; i < posicaoArrayDescendo + 1; i++) {
                    const divAtualDoLoop = quadrados[Number(pecaParaMover.parentElement.id) + casasParaATorreIr.descendo[posicaoArrayDescendo - i]];

                    if (continuarOuPararLoop && divAtualDoLoop.firstChild?.classList[0] === pecaParaMover.classList[0] /*!== null*/) {
                        continuarOuPararLoop = false;
                    }
                    if (continuarOuPararLoop && divAtualDoLoop.firstChild !== null && i !== 0) {
                        continuarOuPararLoop = false;
                    }
                    if (continuarOuPararLoop && i == posicaoArrayDescendo) {
                        if (casaParaReceber.firstChild !== null) {
                            casaParaReceber.removeChild(casaParaReceber.firstChild);
                            casaParaReceber.appendChild(pecaParaMover);
                            TrocarJogador();
                        } else if (casaParaReceber.firstChild == null) {
                            casaParaReceber.appendChild(pecaParaMover);
                            TrocarJogador();
                        }
                    }
                }
            }
            else if (casasParaATorreIr.direita.includes(subtraindoDoisValores)) {
                for (let i = 1; i < Math.abs(subtraindoDoisValores) + 1; i++) {
                    if (limiteLadoEsquerdo.includes(Number(pecaParaMover.parentElement.id) - i)) {
                        continuarOuPararLoop = false;
                    }
                    if (quadrados[Number(pecaParaMover.parentElement.id) - i].firstChild !== null && i < Math.abs(subtraindoDoisValores)) {
                        continuarOuPararLoop = false;
                    }
                    if (quadrados[Number(pecaParaMover.parentElement.id) - i].firstChild?.classList[0] === pecaParaMover.classList[0]) {
                        continuarOuPararLoop = false;
                    }
                    if (continuarOuPararLoop && Number(pecaParaMover.parentElement.id) - i === Number(casaParaReceber.id) && casaParaReceber.firstChild == null) {
                        casaParaReceber.appendChild(pecaParaMover);
                        TrocarJogador();
                    } else if (continuarOuPararLoop && Number(pecaParaMover.parentElement.id) - i === Number(casaParaReceber.id) && casaParaReceber.firstChild !== null) {
                        casaParaReceber.removeChild(casaParaReceber.firstChild);
                        casaParaReceber.appendChild(pecaParaMover);
                        TrocarJogador();
                    }
                }
            }
            else if (casasParaATorreIr.esquerda.includes(subtraindoDoisValores)) {
                for (let i = 1; i < Math.abs(subtraindoDoisValores) + 1; i++) {
                    if (limiteLadoDireito.includes(Number(pecaParaMover.parentElement.id) + i)) {
                        continuarOuPararLoop = false;
                    }
                    if (quadrados[Number(pecaParaMover.parentElement.id) + i].firstChild !== null && i < Math.abs(subtraindoDoisValores)) {
                        continuarOuPararLoop = false;
                    }
                    if (quadrados[Number(pecaParaMover.parentElement.id) + i].firstChild?.classList[0] === pecaParaMover.classList[0]) {
                        continuarOuPararLoop = false;
                    }
                    if (continuarOuPararLoop && Number(pecaParaMover.parentElement.id) + i === Number(casaParaReceber.id) && casaParaReceber.firstChild == null) {
                        casaParaReceber.appendChild(pecaParaMover);
                        TrocarJogador();
                    } else if (continuarOuPararLoop && Number(pecaParaMover.parentElement.id) + i === Number(casaParaReceber.id) && casaParaReceber.firstChild !== null) {
                        casaParaReceber.removeChild(casaParaReceber.firstChild);
                        casaParaReceber.appendChild(pecaParaMover);
                        TrocarJogador();
                    }
                }
            }
            //RETIRADO O "BREAK" DO CASO "ROOK, PARA O CASO "QUEEN" CONSEGUIR IR EM DOIS CASOS
        case "queen":
        case "bishop":
            //TODO: FASE PARA TESTE
            let casasParaIr = {
                diagonalSuperiorDireita: [7, 14, 21, 28, 35, 42, 49],
                diagonalInferiorDireita: [-7, -14, -21, -28, -35, -49],
                diagonalSuperiorEsquerda: [9, 18, 27, 36, 45, 54, 63],
                diagonalInferiorEsquerda: [-9, -18, -27, -36, -45, -54, -63]
            };
            for (const chaveDasPropriedades in casasParaIr) {
                const propriedadeAtualDoObjeto = casasParaIr[chaveDasPropriedades];

                if (propriedadeAtualDoObjeto.includes(subtraindoDoisValores)) {
                    let posicaoArrayAtual = propriedadeAtualDoObjeto.indexOf(subtraindoDoisValores);

                    for (let i = 0; i < posicaoArrayAtual + 1; i++) {
                        const divAtualDoLoop = quadrados[Number(pecaParaMover.parentElement.id) + propriedadeAtualDoObjeto[posicaoArrayAtual - i]];

                        if (divAtualDoLoop.firstChild !== null && divAtualDoLoop !== casaParaReceber) {
                            continuarOuPararLoop = false;
                        }
                        if (divAtualDoLoop.firstChild?.classList[0] === pecaParaMover.classList[0]) {
                            continuarOuPararLoop = false;
                        }
                        if (continuarOuPararLoop && i === posicaoArrayAtual) {
                            if (casaParaReceber.firstChild !== null) {
                                casaParaReceber.removeChild(casaParaReceber.firstChild);
                                casaParaReceber.appendChild(pecaParaMover);
                                TrocarJogador();
                            } else {
                                casaParaReceber.appendChild(pecaParaMover);
                                TrocarJogador();
                            }
                        }
                    }
                }
            }
            break;
        case "knight":
            let moverCavalo = true;
            let casasParaCavaloIr = {
                superior: [17, 15],
                inferior: [-17, -15],
                esquerda: [-10, 6],
                direita: [10, -6]
            }
            for (const chaveDasPropriedades in casasParaCavaloIr) {
                const propriedadeAtualDoObjeto = casasParaCavaloIr[chaveDasPropriedades];

                if (propriedadeAtualDoObjeto.includes(subtraindoDoisValores)) {
                    if (casaParaReceber.firstChild?.classList[0] === pecaParaMover.classList[0]) {
                        moverCavalo = false;
                    }
                    if (moverCavalo && casaParaReceber.firstChild !== null) {
                        casaParaReceber.removeChild(casaParaReceber.firstChild);
                        casaParaReceber.appendChild(pecaParaMover);
                        TrocarJogador();
                    } else if (moverCavalo && casaParaReceber.firstChild == null) {
                        casaParaReceber.appendChild(pecaParaMover);
                        TrocarJogador();
                    }
                }
            }
            break;
        case "king":
            const casasParaReiIr = [-1, 1, -7, 7, -8, 8, -9, 9];
            //TODO
            break;
    }
}
        

function dragStartIniciado(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    if (`jogador-${acessibilidade.textContent.toLowerCase()}` !== event.target.firstChild.classList[0]) alert("Não é sua vez!");
}

function dragOverIniciado(event) {
    event.preventDefault();
}

function dropIniciado(event) {
   event.preventDefault();
    const idDaCasaDaPecaParaMover = event.dataTransfer.getData('text/plain');
    const pecaParaMover = document.getElementById(idDaCasaDaPecaParaMover).getElementsByTagName("div")[0];
    let casaParaReceber = event.target;
    if (event.target.tagName === "I") casaParaReceber = event.target.parentElement.parentElement;
    movimentarPeca(pecaParaMover, casaParaReceber);
}

quadrados.forEach(quadrado => {
    quadrado.addEventListener("dragstart", dragStartIniciado);
    quadrado.addEventListener("dragover", dragOverIniciado);
    quadrado.addEventListener("drop", dropIniciado);
});
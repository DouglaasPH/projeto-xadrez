const quadrados = Array.from(document.querySelectorAll(".quadrado"));
const pecas = document.getElementsByTagName("i");
const acessibilidade = document.querySelector(".vez-de-jogador");
var quantidadeDeXeque = 0;
var moverApenasRei = false;

//VERIFICARÁ SE COM A MUDANÇA DA PEÇA, O REI ADVERSÁRIO FICA NUMA POSIÇÃO DE XEQUE OU XEQUE-MATE
function xeque() {
    const limiteLadoDireito = [8, 16, 24, 32, 40, 48, 56, 64];
    const limiteLadoEsquerdo = [-1, 7, 15, 23, 31, 39, 47, 55];
    const CasasParaTorreOuRainhaIr = {
        subindo: [8, 16, 24, 32, 40, 48, 56],
        descendo: [-8, -16, -24, -32, -40, -48, -56],
        esquerda: [1, 2, 3, 4, 5, 6, 7],
        direita: [-1, -2, -3, -4, -5, -6, -7]
    }
    const casasParaBispoOuRainhaIr = {
        diagonalSuperiorDireita: [7, 14, 21, 28, 35, 42, 49],
        diagonalInferiorDireita: [-7, -14, -21, -28, -35, -49],
        diagonalSuperiorEsquerda: [9, 18, 27, 36, 45, 54, 63],
        diagonalInferiorEsquerda: [-9, -18, -27, -36, -45, -54, -63]
    };
    const casasParaCavaloIr = {
        superiorOuInferior: [17, 15],
        direitaOuEsquerda: [10, 6]
    }

    //ARMAZENA A LOCALIZAÇÃO DO REI ADVERSÁRIO
    let localizacaoDoRei;
    quadrados.forEach(quadradoAtual => {
        if (quadradoAtual.firstChild?.getAttribute("peca") === "king" && quadradoAtual.firstChild?.classList[0] !== `jogador-${acessibilidade.textContent.toLowerCase()}`) {
            localizacaoDoRei = quadradoAtual;
        } 
    });

    //LOOP EM TODOS AS PEÇAS DO ATUAL JOGADOR E, A CADA LOOP, VERIFICARÁ SE A PEÇA ATUAL ESTÁ EM UM XEQUE, NO JOGADOR ADVERSÁRIO. 
    quadrados.forEach(quadradoAtual => {
        let subtraindoDoisValores = Number(localizacaoDoRei.id) - Number(quadradoAtual.id);

        //VERIFICA APENAS OS QUADRADOS QUE TEM PEÇA DO JOGADOR ATUAL, LOGO, IGNORANDO O RESTANTE.
        //O CÓDIGO VERIFICARÁ POR TODAS OS POSSÍVEIS QUADRADOS EM QUE A PEÇA ATUAL PODE IR, LOGO, VENDO UM POSSÍVEL XEQUE DA PEÇA QUE ESTÁ SENDO VERIFICADA. 
        if (quadradoAtual.firstChild?.classList[0] === `jogador-${acessibilidade.textContent.toLowerCase()}`) {
            let tipoDaPeca = quadradoAtual.firstChild?.getAttribute("peca");

            //VERIFICA SE O TIPO DA PEÇA FOR UM PEÃO
            if (tipoDaPeca === "pawn") {
                if (Number(quadradoAtual.id) - Number(localizacaoDoRei.id) === 7 || Number(quadradoAtual.id) - Number(localizacaoDoRei.id) === 9) {
                    quantidadeDeXeque++;
                }
            }

            //VERIFICA SE O TIPO DA PEÇA FOR UMA TORRE
            if (tipoDaPeca === "rook" || tipoDaPeca === "queen") {
                            
                //VERIFICANDO A TORRE OU RAINHA PELA DIREÇÃO: SUBINDO OU DESCENDO O TABULEIRO.
                if (CasasParaTorreOuRainhaIr.subindo.includes(subtraindoDoisValores) || CasasParaTorreOuRainhaIr.descendo.includes(subtraindoDoisValores)) {
                    let continuarOuPararLoop = true;
                
                    //O LOOP SERÁ RODADO DE ACORDO COM A QUANTIDADE DE QUADRADOS ENTRE A PEÇA ATUAL E O REI ADVERSÁRIO.
                    for (let i = 1; i < Math.abs(subtraindoDoisValores / 8) + 1; i++) {
                        if (continuarOuPararLoop && quadrados[Number(quadradoAtual.id) + (Math.sign(subtraindoDoisValores) * 8 * i)].firstChild !== null && Number(quadradoAtual.id) + (Math.sign(subtraindoDoisValores) * 8 * i) < 63) {
                            if (quadrados[Number(quadradoAtual.id) + (Math.sign(subtraindoDoisValores) * 8 * i)].firstChild.getAttribute("peca") === "king") {
                                quantidadeDeXeque++;
                            } else {
                                continuarOuPararLoop = false;
                            };
                        }
                    }
                }

                //VERIFICANDO A TORRE OU RAINHA PELA DIREÇÃO: ESQUERDA OU DIREITA.
                if (CasasParaTorreOuRainhaIr.esquerda.includes(subtraindoDoisValores) || CasasParaTorreOuRainhaIr.direita.includes(subtraindoDoisValores)) {
                    let continuarOuPararLoop = true;
                    for (let i = 1; i < Math.abs(subtraindoDoisValores) + 1; i++) {
                        //PERGUNTAS A SEREM RESPONDIDAS PELO IF
                        let quadradoAtualEstaNoLimiteLadoEsquerdo = !limiteLadoEsquerdo.includes(Number(quadradoAtual.id) + (Math.sign(subtraindoDoisValores) * i));
                        let quadradoAtualEstaNoLimiteLadoDireito = !limiteLadoDireito.includes(Number(quadradoAtual.id) + (Math.sign(subtraindoDoisValores) * i));
                        let quadradoAtualEDiferenteDeNull = quadrados[Number(quadradoAtual.id) + (Math.sign(subtraindoDoisValores) * i)].firstChild !== null;

                        if (CasasParaTorreOuRainhaIr.esquerda.includes(subtraindoDoisValores)) {
                            if (continuarOuPararLoop && quadradoAtualEstaNoLimiteLadoDireito && quadradoAtualEDiferenteDeNull) {
                                if (quadrados[Number(quadradoAtual.id) + (Math.sign(subtraindoDoisValores) * i)].firstChild.getAttribute("peca") === "king") {
                                    quantidadeDeXeque++;
                                } else {
                                    continuarOuPararLoop = false;
                                }
                            }   
                        }
                        else if (CasasParaTorreOuRainhaIr.direita.includes(subtraindoDoisValores)) {
                            if (continuarOuPararLoop && quadradoAtualEstaNoLimiteLadoEsquerdo && quadradoAtualEDiferenteDeNull) {
                                if (quadrados[Number(quadradoAtual.id) + (Math.sign(subtraindoDoisValores) * i)].firstChild.getAttribute("peca") === "king") {
                                    quantidadeDeXeque++;
                                } else {
                                    continuarOuPararLoop = false;
                                }
                            }   
                        }
                    }
                }
            }

            if (tipoDaPeca === "bishop" || tipoDaPeca === "queen") {

                if (casasParaBispoOuRainhaIr.diagonalSuperiorDireita.includes(subtraindoDoisValores) || casasParaBispoOuRainhaIr.diagonalInferiorDireita.includes(subtraindoDoisValores)) {
                    let continuarOuPararLoop = true;

                    //O LOOP SERÁ RODADO DE ACORDO COM A QUANTIDADE DE QUADRADOS ENTRE A PEÇA ATUAL E O REI ADVERSÁRIO.
                    for (let i = 1; i < Math.abs(subtraindoDoisValores / 7) + 1; i++) {
                        //PERGUNTA A SER RESPONDIDA PELO IF
                        let quadradoAtualEDiferenteDeNull = quadrados[Number(quadradoAtual.id) + (Math.sign(subtraindoDoisValores) * 7 * i)].firstChild !== null;

                        if (continuarOuPararLoop && quadradoAtualEDiferenteDeNull) {
                            if (quadrados[Number(quadradoAtual.id) + (Math.sign(subtraindoDoisValores) * 7 * i)].firstChild.getAttribute("peca") === "king") {
                                quantidadeDeXeque++;
                            } else {
                                continuarOuPararLoop = false;
                            };
                        }
                    }
                }
                if (casasParaBispoOuRainhaIr.diagonalSuperiorEsquerda.includes(subtraindoDoisValores) || casasParaBispoOuRainhaIr.diagonalInferiorEsquerda.includes(subtraindoDoisValores)) {
                    let continuarOuPararLoop = true;

                    //O LOOP SERÁ RODADO DE ACORDO COM A QUANTIDADE DE QUADRADOS ENTRE A PEÇA ATUAL E O REI ADVERSÁRIO.
                    for (let i = 1; i < Math.abs(subtraindoDoisValores / 9) + 1; i++) {
                        //PERGUNTA A SER RESPONDIDA PELO IF
                        let quadradoAtualEDiferenteDeNull = quadrados[Number(quadradoAtual.id) + (Math.sign(subtraindoDoisValores) * 9 * i)].firstChild !== null;

                        if (continuarOuPararLoop && quadradoAtualEDiferenteDeNull) {
                            if (quadrados[Number(quadradoAtual.id) + (Math.sign(subtraindoDoisValores) * 9 * i)].firstChild.getAttribute("peca") === "king") {
                                quantidadeDeXeque++;
                            } else {
                                continuarOuPararLoop = false;
                            };
                        }
                    }
                }
            }

            if (tipoDaPeca == "knight") {
                if (casasParaCavaloIr.superiorOuInferior.includes(Math.abs(subtraindoDoisValores))) {
                    let continuarOuPararLoop = true;

                    for (let i = 0; i < casasParaCavaloIr.superiorOuInferior.length; i++) {
                        //PERGUNTA A SER RESPONDIDA PELO IF
                        let quadradoAtualEDiferenteDeNull = quadrados[Number(quadradoAtual.id) + (Math.sign(subtraindoDoisValores) * casasParaCavaloIr.superiorOuInferior[i])].firstChild !== null;
                        
                        if (continuarOuPararLoop && quadradoAtualEDiferenteDeNull) {
                            if (quadrados[Number(quadradoAtual.id) + (Math.sign(subtraindoDoisValores) * casasParaCavaloIr.superiorOuInferior[i])].firstChild.getAttribute("peca") === "king") {
                                quantidadeDeXeque++;
                            } else {
                                continuarOuPararLoop = false;
                            };
                        }
                    }
                }
                if (casasParaCavaloIr.direitaOuEsquerda.includes(Math.abs(subtraindoDoisValores))) {
                    let continuarOuPararLoop = true;

                    for (let i = 0; i < casasParaCavaloIr.direitaOuEsquerda.length; i++) {
                        //PERGUNTA A SERE RESPONDIDA PELO IF
                        let quadradoAtualEDiferenteDeNull = quadrados[Number(quadradoAtual.id) + (Math.sign(subtraindoDoisValores) * casasParaCavaloIr.direitaOuEsquerda[i])].firstChild !== null;
                        
                        if (continuarOuPararLoop && quadradoAtualEDiferenteDeNull) {
                            if (quadrados[Number(quadradoAtual.id) + (Math.sign(subtraindoDoisValores) * casasParaCavaloIr.direitaOuEsquerda[i])].firstChild.getAttribute("peca") === "king") {
                                quantidadeDeXeque++;
                            } else {
                                continuarOuPararLoop = false;
                            };
                        }
                    }
                }
            }
        }
    });

    //SE O REI DO ADVERSÁRIO ESTIVER EM XEQUE, O ADVERSÁRIO É OBRIGADO A MOVER APENAS O REI DE LUGAR.
    if (quantidadeDeXeque === 1) {
        alert("REI EM XEQUE!");
        moverApenasRei = true;
    }
    //SE O REI DO ADVERSÁRIO ESTIVER EM XEQUE-MATE, FIM DE JOGO.
    else if (quantidadeDeXeque > 1) {
        alert("REI EM XEQUE-MATE! FIM DE JOGO!")
        setTimeout(() => {
            location.reload();
        }, 200);
    }

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

//CUIDA DO TIPO DE MOVIMENTAÇÃO DA PEÇA, E COMO CADA PEÇA SERÁ MOVIDA OU NÃO SERÁ MOVIDA POR ALGUM MOTIVO.
function movimentarPeca(pecaParaMover, casaParaReceber) {
    const limiteLadoDireito = [8, 16, 24, 32, 40, 48, 56, 64];
    const limiteLadoEsquerdo = [-1, 7, 15, 23, 31, 39, 47, 55];
    const tipoDePeca = pecaParaMover.getAttribute("peca");
    let subtraindoDoisValores = Number(casaParaReceber.id) - Number(pecaParaMover.parentElement.id);
    let continuarOuPararLoop = true;

    switch (tipoDePeca) {
        case "pawn":
            //TESTE: MOVIMENTAR PEÃO PARA CASAS QUE NÃO TENHA PEÇA
            if (pecaParaMover.getAttribute("nao-movido") == "true" && (Number(casaParaReceber.id) == Number(pecaParaMover.parentElement.id) + 8 || Number(casaParaReceber.id) == Number(pecaParaMover.parentElement.id) + 16) && casaParaReceber.firstChild == null) {
                casaParaReceber.appendChild(pecaParaMover);
                pecaParaMover.setAttribute("nao-movido", false);
                xeque();
                TrocarJogador();
            }
            else if (pecaParaMover.getAttribute("nao-movido") == "false" && (Number(casaParaReceber.id) == Number(pecaParaMover.parentElement.id) + 8) && casaParaReceber.firstChild == null) {
                casaParaReceber.appendChild(pecaParaMover);
                xeque();
                TrocarJogador();
            }
            else if (casaParaReceber !== null) {
                if (Number(casaParaReceber.id) == Number(pecaParaMover.parentElement.id) + 7) {
                    casaParaReceber.removeChild(casaParaReceber.firstChild);
                    casaParaReceber.appendChild(pecaParaMover);
                    xeque();
                    TrocarJogador();
                }
                else if (Number(casaParaReceber.id) == Number(pecaParaMover.parentElement.id) + 9) {
                    casaParaReceber.removeChild(casaParaReceber.firstChild);
                    casaParaReceber.appendChild(pecaParaMover);
                    xeque();
                    TrocarJogador();
                }
            }
            break;
        case "rook":
        case "queen":
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

                    if (continuarOuPararLoop && divAtualDoLoop.firstChild?.classList[0] === pecaParaMover.classList[0] ) {
                        continuarOuPararLoop = false;
                    }
                    if (continuarOuPararLoop && divAtualDoLoop.firstChild !== null && i !== 0) {
                        continuarOuPararLoop = false;
                    }
                    if (continuarOuPararLoop && i == posicaoArraySubindo) {

                        if (casaParaReceber.firstChild !== null) {
                            casaParaReceber.removeChild(casaParaReceber.firstChild);
                            casaParaReceber.appendChild(pecaParaMover);
                            xeque();
                            TrocarJogador();
                        } else if (casaParaReceber.firstChild == null) {
                            casaParaReceber.appendChild(pecaParaMover);
                            xeque();
                            TrocarJogador();
                        }
                    }
                }
            }
            else if (casasParaATorreIr.descendo.includes(subtraindoDoisValores)) {
                let posicaoArrayDescendo = casasParaATorreIr.descendo.indexOf(subtraindoDoisValores);
            
                for (let i = 0; i < posicaoArrayDescendo + 1; i++) {
                    const divAtualDoLoop = quadrados[Number(pecaParaMover.parentElement.id) + casasParaATorreIr.descendo[posicaoArrayDescendo - i]];

                    if (continuarOuPararLoop && divAtualDoLoop.firstChild?.classList[0] === pecaParaMover.classList[0]) {
                        continuarOuPararLoop = false;
                    }
                    if (continuarOuPararLoop && divAtualDoLoop.firstChild !== null && i !== 0) {
                        continuarOuPararLoop = false;
                    }
                    if (continuarOuPararLoop && i == posicaoArrayDescendo) {
                        if (casaParaReceber.firstChild !== null) {
                            casaParaReceber.removeChild(casaParaReceber.firstChild);
                            casaParaReceber.appendChild(pecaParaMover);
                            xeque();
                            TrocarJogador();
                        } else if (casaParaReceber.firstChild == null) {
                            casaParaReceber.appendChild(pecaParaMover);
                            xeque();
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
                        xeque();
                        TrocarJogador();
                    } else if (continuarOuPararLoop && Number(pecaParaMover.parentElement.id) - i === Number(casaParaReceber.id) && casaParaReceber.firstChild !== null) {
                        casaParaReceber.removeChild(casaParaReceber.firstChild);
                        casaParaReceber.appendChild(pecaParaMover);
                        xeque();
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
                        xeque();
                        TrocarJogador();
                    } else if (continuarOuPararLoop && Number(pecaParaMover.parentElement.id) + i === Number(casaParaReceber.id) && casaParaReceber.firstChild !== null) {
                        casaParaReceber.removeChild(casaParaReceber.firstChild);
                        casaParaReceber.appendChild(pecaParaMover);
                        xeque();
                        TrocarJogador();
                    }
                }
            }
            //RETIRADO O "BREAK" DO CASO "ROOK, PARA O CASO "QUEEN" CONSEGUIR IR EM DOIS CASOS.
        case "bishop":
        case "queen":
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
                                xeque();
                                TrocarJogador();
                            } else {
                                casaParaReceber.appendChild(pecaParaMover);
                                xeque();
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
                        xeque();
                        TrocarJogador();
                    } else if (moverCavalo && casaParaReceber.firstChild == null) {
                        casaParaReceber.appendChild(pecaParaMover);
                        xeque();
                        TrocarJogador();
                    }
                }
            }
            break;
        case "king":
            const casasParaReiIr = [-1, 1, -7, 7, -8, 8, -9, 9];
            
            if (casasParaReiIr.includes(subtraindoDoisValores)) {
                if (casaParaReceber.firstChild == null) {
                    if (moverApenasRei === true) moverApenasRei = false;
                    casaParaReceber.appendChild(pecaParaMover);
                    xeque();
                    TrocarJogador();
                }
                else if (casaParaReceber.firstChild !== null && casaParaReceber.firstChild?.classList[0] !== pecaParaMover.classList[0]) {
                    if (moverApenasRei === true) moverApenasRei = false;
                    casaParaReceber.removeChild(casaParaReceber.firstChild);
                    casaParaReceber.appendChild(pecaParaMover);
                    xeque();
                    TrocarJogador();
                }
            }
            break;
    }
}
        
//EVENTO ACIONADO AO CLICAR, SEGURAR E ARRASTAR UMA DIV FILHA DA DIV GAMEBOARD
function dragStartIniciado(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    if (`jogador-${acessibilidade.textContent.toLowerCase()}` !== event.target.firstChild.classList[0]) alert("Não é sua vez!");
}

//EVENTO ATUALIZARÁ A POSIÇÃO DA DIV SENDO ARRASTADA
function dragOverIniciado(event) {
    event.preventDefault();
}

//EVENTO CUIDA QUANDO O BOTÃO DO MOUSE É DESPRESSIONADO. A DIV CUIDA PARA COLOCAR A PEÇA EM OUTRA DIV. FUNÇÃO ONDE COMEÇA TODO O CÓDIGO
function dropIniciado(event) {
    event.preventDefault();
    const idDaCasaDaPecaParaMover = event.dataTransfer.getData('text/plain');
    const pecaParaMover = document.getElementById(idDaCasaDaPecaParaMover).getElementsByTagName("div")[0];
    let casaParaReceber = event.target;
    //SE VOCÊ ESTIVER MOVENDO UMA DIV QUE TEM UMA PEÇA, ENTÃO ATUALIZE A VARIÁVEL 'casaParareceber' PARA A TAG DA PEÇA
    if (event.target.tagName === "I") casaParaReceber = event.target.parentElement.parentElement;
    //SE ESTIVER EM XEQUE, VOCÊ SÓ PODERÁ MOVER O REI;
    if (moverApenasRei === true) {
        if (pecaParaMover.getAttribute("peca") === "king") {
            movimentarPeca(pecaParaMover, casaParaReceber);
            //TODO: MOVER PARA A FUNÇÃO MOVIMENTAR
            //moverApenasRei = false;
        } else return;
    } else {
        movimentarPeca(pecaParaMover, casaParaReceber);
    }
}

// COLOQUE EVENTOS EM CADA DIV FILHO DA DIV PAI 'GAMEBOARD'
quadrados.forEach(quadrado => {
    quadrado.addEventListener("dragstart", dragStartIniciado);
    quadrado.addEventListener("dragover", dragOverIniciado);
    quadrado.addEventListener("drop", dropIniciado);
});
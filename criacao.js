var peca = '<div><i class="fa-solid fa-chess-rook"></i></div>';
const gameBoard = document.querySelector(".gameBoard");
const posicaoDasPecas = [
    "rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook",
    "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn",
    " ", " ", " ", " ", " ", " ", " ", " ",
    " ", " ", " ", " ", " ", " ", " ", " ",
    " ", " ", " ", " ", " ", " ", " ", " ",
    " ", " ", " ", " ", " ", " ", " ", " ",
    "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn",
    "rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"
];

const posicaoDosQuadradosBrancosEPretos = [
    "Branco", "Preto", "Branco", "Preto", "Branco", "Preto", "Branco", "Preto",
    "Preto", "Branco", "Preto", "Branco", "Preto", "Branco", "Preto", "Branco",
    "Branco", "Preto", "Branco", "Preto", "Branco", "Preto", "Branco", "Preto",
    "Preto", "Branco", "Preto", "Branco", "Preto", "Branco", "Preto", "Branco",
    "Branco", "Preto", "Branco", "Preto", "Branco", "Preto", "Branco", "Preto",
    "Preto", "Branco", "Preto", "Branco", "Preto", "Branco", "Preto", "Branco",
    "Branco", "Preto", "Branco", "Preto", "Branco", "Preto", "Branco", "Preto",
    "Preto", "Branco", "Preto", "Branco", "Preto", "Branco", "Preto", "Branco",
];

function criarTabuleiro() {
    for (let i = 0; i < posicaoDasPecas.length; i++) {
        const quadrado = document.createElement("div");
        quadrado.setAttribute("id", i);
        quadrado.classList.add("quadrado")
        quadrado.setAttribute("draggable", true);
        const pecaAColocar = posicaoDasPecas[i];

        if (pecaAColocar != " ") {
            quadrado.innerHTML = peca.replace("rook", posicaoDasPecas[i]);
            quadrado.firstChild.setAttribute("peca", posicaoDasPecas[i]);
            if (i < 16) quadrado.firstChild.classList.add("jogador-um");
            else if (i > 47) quadrado.firstChild.classList.add("jogador-dois");
        }

        if (posicaoDosQuadradosBrancosEPretos[i] === "Branco") quadrado.classList.add("quadrado-branco");
        else quadrado.classList.add("quadrado-preto");

        gameBoard.appendChild(quadrado);
    }
}
criarTabuleiro();
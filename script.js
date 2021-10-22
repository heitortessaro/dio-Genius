// const DEFAULT_blue = '#0000ff';
// const TRANSITORY_blue = '#00a2ff'
// const DEFAULT_red = '#ff0000';
// const TRANSITORY_red = '#ff3c00'
// const DEFAULT_green = '#ff0000';
// const TRANSITORY_green = '#ff3c00'

const DEFAULT_buttonsOperation = '#5e5934';
const DEFAULT_buttons = '#5E4434';

let order = [];
let clickedOrder = [];
let score = 0;

//numero atrelado a cada uma das 4 cores
//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

// get html elements
const blueBtn = document.querySelector('.blue');
const redBtn = document.querySelector('.red');
const greenBtn = document.querySelector('.green');
const yellowBtn = document.querySelector('.yellow');
const startBtn = document.querySelector('.startBtn')
const information = document.querySelector('.information')


// function

// select a new color and append to the order
let shuffleOrder = () => {
    let lastColor = Math.floor(Math.random() * 4);
    order[order.length] = lastColor;
    showColorOrder();
    enableBtns();
}

// show the selected color in order
let showColorOrder = async () => {
    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        // lightColor(elementColor, Number(i) + 1);
        await lightColor(elementColor);
    }
}

let lightColor = async (element) => {
    element.classList.add('selected');
    await delay(250);
    element.classList.remove('selected');
    await delay(250);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// check if the player selected the right order of colors
let checkColor = () => {
    debugger;
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            loseGame();
            return;
        }
    }
    if (clickedOrder.length == order.length) {
        //alert(`Pontuação: ${score}\n Você acertou! Iniciando próxima rodada!`);
        information.textContent = `Pontuação: ${score}\n Você acertou! Iniciando próxima rodada!`;
        nextLevel();
    }
}

// uses the mouse click as trigger
let click = async (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    await delay(200);
    // setTimeout(() => {
    createColorElement(color).classList.remove('selected');
    checkColor();
    // }, 500)


}

// return the color
let createColorElement = (color) => {
    if (color == 0) {
        return greenBtn;
    } else if (color == 1) {
        return redBtn;
    } else if (color == 2) {
        return yellowBtn;
    } else if (color == 3) {
        return blueBtn;
    }
}

// next game level
let nextLevel = () => {
    score++;
    clickedOrder = [];
    desableBtns();
    shuffleOrder();
}

// game over function
let loseGame = () => {
    // alert(`Pontuação final: ${score}\nVocê perdeu o jogo!\nClique em OK para reiniciar o jogo.`);
    information.textContent = `Pontuação final: ${score}\nVocê perdeu o jogo!\nClique Start Game para reiniciar o jogo.`;
    order = [];
    clickedOrder = [];
    desableBtns();
    startBtn.onclick = () => {
        startBtn.onclick = null;
        information.textContent = '_';
        playGame();
    };
}

let playGame = () => {
    score = 0;
    order = [];
    clickedOrder = [];
    nextLevel();
}

let enableBtns = () => {
    greenBtn.onclick = () => click(0);
    redBtn.onclick = () => click(1);
    yellowBtn.onclick = () => click(2);
    blueBtn.onclick = () => click(3);
}

let desableBtns = () => {
    greenBtn.onclick = null;
    redBtn.onclick = null
    yellowBtn.onclick = null
    blueBtn.onclick = null
}

// add listners
startBtn.onclick = () => {
    startBtn.onclick = null;
    information.textContent = '_';
    playGame();
};

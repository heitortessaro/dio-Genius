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


// function

// select a new color and append to the order
let shuffleOrder = () => {
    let lastColor = Math.floor(Math.random() * 4);
    order[order.length] = lastColor;
    showColorOrder();
}

// show the selected color in order
let showColorOrder = () => {
    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

// change color of the selected color in the game
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    });
}

// check if the player selected the right order of colors
let checkColor = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            loseGame();
            break;
        }
    }
    if (clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\n Você acertou! Iniciando próxima rodada!`);
        nextLevel();
    }
}

// uses the mouse click as trigger
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkColor();
    }, 250)


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
    shuffleOrder();
}

// game over function
let loseGame = () => {
    alert(`Pontuação final: ${score}\nVocê perdeu o jogo!\nClique em OK para reiniciar o jogo.`);
    order = [];
    clickedOrder = [];

    playGame();
}

let playGame = () => {
    alert('Bem vindo ao jogo Genius! Iniciando jogo!');
    score = 0;

    nextLevel();
}


// add listners
// green.addEventListener('click', click(0));
// red.addEventListener('click', click(1));
// yellow.addEventListener('click', click(2));
// blue.addEventListener('click', click(3));
greenBtn.onclick = () => click(0);
redBtn.onclick = () => click(1);
yellowBtn.onclick = () => click(2);
blueBtn.onclick = () => click(3);

playGame();
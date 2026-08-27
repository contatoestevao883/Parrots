let numberOfCards;
let idInterval;

let rightPlays;
let time = 0;

let itemClicked1;
let itemClicked2;

let counter = 0;
let plays = 0;

const images = [
    '/img/bobrossparrot.gif',
    '/img/explodyparrot.gif',
    '/img/fiestaparrot.gif',
    '/img/metalparrot.gif',
    '/img/revertitparrot.gif',
    '/img/tripletsparrot.gif',
    '/img/unicornparrot.gif'
];

let arrayOfCards = [];
let duplicatedCards = [];

// INÍCIO DO JOGO

function gameStart() {

    numberOfCards = Number(
        prompt('Selecione o número de cartas que deseja jogar?')
    );

    while (invalidNumberOfCards()) {
        numberOfCards = Number(
            prompt('Escolha um número válido de cartas: 4, 6, 8, 10 ou 12.')
        );
    }

    duplicateCard();
    generateCards();

    idInterval = setInterval(timer, 1000);
}

gameStart();

// DUPLICAR CARTAS

function duplicateCard() {

    const numberOfPairs = numberOfCards / 2;

    for (let i = 0; i < numberOfPairs; i++) {
        arrayOfCards.push(images[i]);
    }

    duplicatedCards = [...arrayOfCards, ...arrayOfCards];

    // Embaralha TODAS as cartas depois de duplicar
    shuffle(duplicatedCards);
}

// SHUFFLE

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const randomIndex = Math.floor(Math.random() * (i + 1));

        [array[i], array[randomIndex]] = [
            array[randomIndex],
            array[i]
        ];
    }
}

// GERAR CARTAS COM DOM

function generateCards() {

    const main = document.querySelector('main');

    for (let i = 0; i < duplicatedCards.length; i++) {

        // Container
        const cardContainer = document.createElement('div');

        // Card
        const card = document.createElement('div');
        card.classList.add('card');

        // Front
        const frontFace = document.createElement('div');
        frontFace.classList.add('front-face', 'face');

        const frontImage = document.createElement('img');
        frontImage.src = '/img/back.png';

        frontFace.appendChild(frontImage);

        // Back
        const backFace = document.createElement('div');
        backFace.classList.add('back-face', 'face');

        const backImage = document.createElement('img');
        backImage.src = duplicatedCards[i];

        backFace.appendChild(backImage);

        // Montando o card
        card.appendChild(frontFace);
        card.appendChild(backFace);

        cardContainer.appendChild(card);

        main.appendChild(cardContainer);

        // Evento de clique usando DOM
        card.addEventListener('click', function () {
            clickedItem(card);
        });
    }
}

// CLICAR NA CARTA

function clickedItem(itemClicked) {

    // Impede clicar novamente em uma carta já aberta
    if (
        itemClicked === itemClicked1 ||
        itemClicked === itemClicked2
    ) {
        return;
    }

    // Impede clicar em uma terceira carta enquanto
    // as duas anteriores estão sendo analisadas
    if (itemClicked1 !== undefined && itemClicked2 !== undefined) {
        return;
    }

    const back = itemClicked.querySelector('.back-face');
    const front = itemClicked.querySelector('.front-face');

    front.classList.add('switch');
    back.classList.add('switch2');

    plays++;

    if (itemClicked1 === undefined) {

        itemClicked1 = itemClicked;

    } else {

        itemClicked2 = itemClicked;

        if (itemClicked1.innerHTML === itemClicked2.innerHTML) {

            itemClicked1 = undefined;
            itemClicked2 = undefined;

            counter += 2;

            setTimeout(gameEnd, 500);

        } else {

            setTimeout(flipOver, 1000);
        }
    }
}

// FINAL DO JOGO

function gameEnd() {

    if (numberOfCards === counter) {

        clearInterval(idInterval);

        createResultBox();
    }
}

// RESULTADO

function createResultBox() {

    const body = document.querySelector('body');

    // Cria o quadrado de resultado
    const resultBox = document.createElement('div');
    resultBox.classList.add('result-box');

    // Título
    const title = document.createElement('h2');
    title.textContent = 'Parabéns!';

    // Tempo
    const resultTime = document.createElement('p');
    resultTime.textContent = `Você concluiu o jogo em ${time} segundos!`;

    // Jogadas
    const resultPlays = document.createElement('p');
    resultPlays.textContent = `Número de jogadas: ${plays}`;

    // Botão
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Jogar novamente';

    restartButton.addEventListener('click', function () {
        window.location.reload();
    });

    // Montando o resultado
    resultBox.appendChild(title);
    resultBox.appendChild(resultTime);
    resultBox.appendChild(resultPlays);
    resultBox.appendChild(restartButton);

    body.appendChild(resultBox);
}

// VIRAR CARTAS DE VOLTA

function flipOver() {

    const back1 = itemClicked1.querySelector('.back-face');
    const front1 = itemClicked1.querySelector('.front-face');

    const back2 = itemClicked2.querySelector('.back-face');
    const front2 = itemClicked2.querySelector('.front-face');

    front1.classList.remove('switch');
    back1.classList.remove('switch2');

    front2.classList.remove('switch');
    back2.classList.remove('switch2');

    itemClicked1 = undefined;
    itemClicked2 = undefined;
}

// VALIDAR NÚMERO DE CARTAS

function invalidNumberOfCards() {

    if (
        isNaN(numberOfCards) ||
        numberOfCards < 4 ||
        numberOfCards > 12 ||
        numberOfCards % 2 !== 0
    ) {
        return true;
    }

    return false;
}


// TIMER

function timer() {

    const watch = document.querySelector('.watch');

    time++;

    watch.textContent = time;
}

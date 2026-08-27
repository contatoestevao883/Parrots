let numberOfCards 
let idInterval

function gameStart(){
    
    numberOfCards = Number(prompt('Selecione o número de cartas que deseja jogar?'))

    while( invalidNumberOfCards() ){
        numberOfCards = Number(prompt('Selecione o número de cartas que deseja jogar'))
    }

    idInterval = setInterval(timer, 1000)

}

gameStart()

let rightPlays, time = 0;

const images = [
    '/img/bobrossparrot.gif',
    '/img/explodyparrot.gif',
    '/img/fiestaparrot.gif',
    '/img/metalparrot.gif',
    '/img/revertitparrot.gif',
    '/img/tripletsparrot.gif',
    '/img/unicornparrot.gif'
]

let arrayOfCards = []
let duplicatedCards

function duplicateCard(){
    let newArray = numberOfCards / 2
    for(let i = 0;  i < newArray; i++){
        arrayOfCards.push(images[i])
    }
    arrayOfCards.sort(comparador)
    duplicatedCards = [...arrayOfCards, ...arrayOfCards]

}

function duplicateCard(){

    let newArray = numberOfCards / 2

    for(let i = 0; i < newArray; i++){
        arrayOfCards.push(images[i])
    }

    duplicatedCards = [...arrayOfCards, ...arrayOfCards]

    duplicatedCards.sort(comparador)
}   

function comparador() { 
	return Math.random() - 0.5;
     
}

let itemClicked1
let itemClicked2 

let counter = 0 
let plays = 0

function clickedItem(itemClicked){

    if(
        itemClicked === itemClicked1 ||
        itemClicked === itemClicked2
    ){
        return
    }

    if(
        itemClicked1 !== undefined &&
        itemClicked2 !== undefined
    ){
        return
    }

    const back = itemClicked.querySelector('.back-face')
    const front = itemClicked.querySelector('.front-face')

    front.classList.add('switch')
    back.classList.add('switch2')

    plays++

    if(itemClicked1 === undefined){

        itemClicked1 = itemClicked

    }else if(itemClicked2 === undefined){

        itemClicked2 = itemClicked

        if(itemClicked1.innerHTML === itemClicked2.innerHTML){

            itemClicked1 = undefined
            itemClicked2 = undefined

            counter += 2

            setTimeout(gameEnd, 500)

        }else{

            setTimeout(flipOver, 1000)
        }
    }
}

function generateCards(){

    const main = document.querySelector("main")

    for(let i = 0; i < duplicatedCards.length; i++){

        const cardContainer = document.createElement("div")

        const card = document.createElement("div")
        card.classList.add("card")

        const frontFace = document.createElement("div")
        frontFace.classList.add("front-face", "face")

        const frontImage = document.createElement("img")
        frontImage.src = "/img/back.png"

        frontFace.appendChild(frontImage)

        const backFace = document.createElement("div")
        backFace.classList.add("back-face", "face")

        const backImage = document.createElement("img")
        backImage.src = duplicatedCards[i]

        backFace.appendChild(backImage)

        card.appendChild(frontFace)
        card.appendChild(backFace)

        cardContainer.appendChild(card)

        main.appendChild(cardContainer)

        card.addEventListener("click", function(){
            clickedItem(card)
        })
    }
}
  
function gameEnd(){

    if(numberOfCards == counter){

        clearInterval(idInterval)

        createResultBox()
    }
}

function createResultBox(){

    const body = document.querySelector("body")

    const resultBox = document.createElement("div")
    resultBox.classList.add("result-box")

    const title = document.createElement("h2")
    title.textContent = "Parabéns!"

    const resultTime = document.createElement("p")
    resultTime.textContent = `Você concluiu o jogo em ${time} segundos!`

    const resultPlays = document.createElement("p")
    resultPlays.textContent = `Número de jogadas: ${plays}`

    const restartButton = document.createElement("button")
    restartButton.textContent = "Jogar novamente"

    restartButton.addEventListener("click", function(){
        window.location.reload()
    })

    resultBox.appendChild(title)
    resultBox.appendChild(resultTime)
    resultBox.appendChild(resultPlays)
    resultBox.appendChild(restartButton)

    body.appendChild(resultBox)
}

function flipOver(){    

    const back = itemClicked1.querySelector('.back-face')
    const front = itemClicked2.querySelector('.front-face')

    
    const back2 = itemClicked2.querySelector('.back-face')
    const front1 = itemClicked1.querySelector('.front-face')
    
    front.classList.remove("switch")
    back.classList.remove("switch2")
    
    front1.classList.remove("switch")
    back2.classList.remove("switch2")

    itemClicked1 = undefined
    itemClicked2 = undefined
}

function invalidNumberOfCards(){
    
    if (
        numberOfCards % 2 === 1 ||
        numberOfCards < 4 ||
        numberOfCards > 12 ||
        isNaN(numberOfCards)
    ){
        return true;
    }

    return false;
}

function timer(){
    const watch = document.querySelector('.watch')
    
    time++
    
    watch.innerHTML = time
    
}

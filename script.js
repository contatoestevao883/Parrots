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
duplicateCard()

function generateCards(){
    const main = document.querySelector("main")
    for(let i = 0;  i < duplicatedCards.length; i++){
        main.innerHTML += `
            <div>
                <div class="card" onclick="clickedItem(this)">
                    <div class="front-face face">
                        <img src="/img/back.png">
                    </div>

                    <div class="back-face face" >
                        <img src="${duplicatedCards[i]}">
                    </div>
                </div>
            </div>
        `
    }
}
generateCards()

function comparador() { 
	return Math.random() - 0.5;
     
}

let itemClicked1
let itemClicked2 

let counter = 0 
let plays = 0

function clickedItem(itemClicked){
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
            counter+= 2 
            setTimeout(gameEnd, 500)
        }else{
            setTimeout(flipOver, 1000)

        }
    }
}
  
function gameEnd(){

    if(numberOfCards == counter) {
    
        clearInterval(idInterval);

        alert(`Você ganhou em ${plays} jogadas! A duração do jogo foi de ${time} segundos!`);

        const end = confirm('Gostaria de jogar novamente?');

        if ( end === true){
            window.location.reload(true);
        }
    }   
    
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
    
    if ( numberOfCards % 2 === 1 || numberOfCards < 4 || numberOfCards > 14 || isNaN(numberOfCards) ){
        return true;
    }
    return false;
}

function timer(){
    const watch = document.querySelector('.watch')
    
    time++
    
    watch.innerHTML = time
    
}

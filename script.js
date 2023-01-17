let numberOfCards 
function gameStart(){
    let playIn = 10
    numberOfCards = Number(prompt('Digite a quantidades de cartas'))
    for(let i = 0; i < playIn; i++){
        if(numberOfCards % 2 === 1 || numberOfCards > 15 || numberOfCards < 4){
            alert('Quantidades de cartas inválida')
            numberOfCards = Number(prompt('Digite a quantidades de cartas novamente'))
        }
    }
}
gameStart()

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
    console.log(newArray)
    for(let i = 0;  i < newArray; i++){
        arrayOfCards.push(images[i])
    }
    arrayOfCards.sort(comparador)
    duplicatedCards = [...arrayOfCards, ...arrayOfCards]
    console.log(duplicatedCards)

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
let rounds = 0
let virar = 0

function clickedItem(itemClicked){
    console.log(itemClicked)
    const back = itemClicked.querySelector('.back-face')
    const front = itemClicked.querySelector('.front-face')
    
    front.classList.add('switch')
    back.classList.add('switch2')
    
     if(itemClicked1 === undefined){
        itemClicked1 = itemClicked

     }else if(itemClicked2 === undefined){
            itemClicked2 = itemClicked
        if(itemClicked1.innerHTML === itemClicked2.innerHTML){
            itemClicked1 = undefined
            itemClicked2 = undefined
            rounds++
            counter+= 2 
            setTimeout(gameEnd, 500)
        }else{
            setTimeout(flipOver, 1000)

        }
    }
    console.log(counter)
}
  
function gameEnd(){
    if(numberOfCards == counter){
        alert(`Você ganhou em ${rounds} jogadas!`)
        setTimeout(resetGame, 1000)
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

    console.log(back)
    console.log(front)
}

function resetGame(){

    document.querySelectorAll('.back-face').forEach(function (elem) {
        elem.classList.remove('switch2');
    })

    document.querySelectorAll('.front-face').forEach(function (elem) {
        elem.classList.remove('switch');
    })

    counter = 0
}




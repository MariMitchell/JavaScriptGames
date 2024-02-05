//matching game
document.addEventListener('DOMContentLoaded', () => {
    //Original card array
    /* const cardArray = [
        {
            name: "cheeseburger"
            img: "images/cheeseburger.png"
        },
        {
            name: "cheeseburger"
            img: "images/cheeseburger.png"
        },
        {
            name: "fries"
            img: "images/fries.png"
        },
        {
            name: "fries"
            img: "images/fries.png"
        },
        {
            name: "hotdog"
            img: "images/hotdog.png"
        },
        {
            name: "hotdog"
            img: "images/hotdog.png"
        },
        {
            name: "ice-cream"
            img: "images/ice-cream.png"
        },
        {
            name: "ice-cream"
            img: "images/ice-cream.png"
        },
        {
            name: "milkshake"
            img: "images/milkshake.png"
        },
        {
            name: "milkshake"
            img: "images/milkshake.png"
        },
        {
            name: "pizza"
            img: "images/pizza.png"
        },
        {
            name: "pizza"
            img: "images/pizza.png"
        },
    ] */

    //card options
    const cardArray = [
        {
            name: 'titus',
            img: 'images/titus.jpg'
        },
        {
            name: 'titus',
            img: 'images/titus.jpg'
        },
        {
            name: 'kibbs',
            img: 'images/kibbs.jpg'
        },
        {
            name: 'kibbs',
            img: 'images/kibbs.jpg'
        },
        {
            name: 'bumi',
            img: 'images/bumi.jpg'
        },
        {
            name: 'bumi',
            img: 'images/bumi.jpg'
        },
        {
            name: 'korok',
            img: 'images/korok.jpg'
        },
        {
            name: 'korok',
            img: 'images/korok.jpg'
        },
        {
            name: 'midna',
            img: 'images/midna.jpg'
        },
        {
            name: 'midna',
            img: 'images/midna.jpg'
        },
        {
            name: 'sidon',
            img: 'images/sidon.jpg'
        },
        {
            name: 'sidon',
            img: 'images/sidon.jpg'
        },
    ]

    //randomizes card placement
    cardArray.sort(() => 0.5 - Math.random())

    //calls grid from html
    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []

    //create your board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img')
            card.setAttribute('src', 'images/back.jpg')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    //check for matches
    function checkForMatch() {
        const cards = document.querySelectorAll('img')
        //Gets the first value in the array
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]

        if (optionOneId == optionTwoId) {
            //not in video, this sets up so player cannot make a match from clicking the same image twice
            cards[optionOneId].setAttribute('src', 'images/back.jpg')
            cards[optionTwoId].setAttribute('src', 'images/back.jpg')
            alert('You have clicked the same image!')
        }
        else if (cardsChosen[0] === cardsChosen[1]) {
            alert('You found a match')
            cards[optionOneId].setAttribute('src', 'images/white.png')
            cards[optionTwoId].setAttribute('src', 'images/white.png')
            cards[optionOneId].removeEventListener('click', flipCard)
            cards[optionTwoId].removeEventListener('click', flipCard)
            //stores two cards in cardsWon array
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', 'images/back.jpg')
            cards[optionTwoId].setAttribute('src', 'images/back.jpg')
            alert('Sorry, try again')
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = "Good job! You matched all the cards!"
        }
    }

    //flip your card
    function flipCard() {
        let cardId = this.getAttribute('data-id')
        //push cards from card array based on id, and once located get the name
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        //lets us add an image to the square based on the card id it holds
        this.setAttribute('src', cardArray[cardId].img)
        //checks if two cards in the cards chosen array are the same
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }

    createBoard()
})


//Mole Game
const square = document.querySelectorAll(".square")
const mole = document.querySelectorAll(".mole")
const timeLeft = document.querySelector("#time-left")
let score = document.querySelector("#score")

let result = 0
let currentTime = timeLeft.textContent

function randomSquare() {
    square.forEach(className => {
        //ensures there are no divs containing mole in the beginning
        className.classList.remove("mole")
    })
    //defines a random position on the grid
    //math floor rounds down to the nearest integer, making random position under or equivilent to nine
    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add("mole")

    //assign id of the random position to the hitposition
    hitPosition = randomPosition.id
}

square.forEach(id => {
    id.addEventListener("mouseup", () => {
        //if we hit with the mouseand id matches, player wins
        if (id.id === hitPosition) {
            result = result + 1
            score.textContent = result
        }
    })
})

function moveMole() {
    let timerId = null
    timerId = setInterval(randomSquare, 1000)
}

//Countdown Function 
function countDown(){
    currentTime--
    timeLeft.textContent = currentTime
    if (currentTime === 0) {
        clearInterval(timerId)
        alert("GAME OVER! Your final score is " + result)
    }
}

let timerId = setInterval(countDown, 1000)


moveMole()
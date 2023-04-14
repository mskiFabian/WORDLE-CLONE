// Setup
import { WORDS } from "./words.js"

const NUMBER_OF_GUESSES = 6
let guessRemaining = NUMBER_OF_GUESSES
let currentGuess = []
let nextLetter = 0
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(rightGuessString)


// creating game board
function initBoard() {
    let board = document.getElementById("game-board")
    

    for(let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"

        for(let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }
        board.appendChild(row)
    }
}
// do it automaticly on page reload
initBoard()


// functionality of keyword press
document.addEventListener("keyup", (e) => {
    if(guessRemaining === 0) {
        return 
    }
    // if user want delete and next letter is available, it delete this
    let pressKey = String(e.key)
    if(pressKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }
    // if user press enter, function checkGuess will check what user type
    if(pressKey === "Enter") {
        checkGuess()
        return
    }
    // if user type a alfabet letter trough a to z. by using regexxx
    let found = pressKey.match(/[a-z]/gi)
    if(!found || found.length > 1) {
        return
    } else {
        insertLetter(pressKey)
    }
})

    // if nextLetter is === 5 index return nothing, because we have only 4 index
function insertLetter(pressKey) {
    if(nextLetter === 5) {
        return
    }
    // converting pressKey to lowerCase
    pressKey = pressKey.toLowerCase()

    // iterate throught those rows and columns
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessRemaining]
    let box = row.children[nextLetter]
    // displating pressKey in boxTextContent
    box.textContent = pressKey
    // little formating box 
    box.classList.add("filled-box")
    // pushing presKey by user to currentGuess array
    currentGuess.push(pressKey)
    // add index to nextLetter by 1 
    nextLetter ++
}


// FUNCTION IF USER CLICK BACKSPACE KEY
function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessRemaining]
    // decrease index
    let box = row.children[nextLetter - 1]
    // make empty box
    box.textContent = ""
    // delete extra border style 
    box.classList.remove("filled-box")
    // delete last element from array
    currentGuess.pop()
    //decrease index of nextLetter
    nextLetter --
}


// ADDING CHECKGUESS FUNCTION 
function checkGuess() {
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessRemaining]
    let guessString = ""
    // compare right guess of list words from words.js
    let rightGuess = Array.from(rightGuessString)

    for(const val of currentGuess) {
        // convert each val from currentGuess array into string
        guessString += val
    }
    // is user don't put 5 letters alert about it
    if(guessString.length != 5) {
        alert("Not enough letter")
        return
    }

    // if the word isn't on the list of words call it
    if(!WORDS.includes(guessString)) {
        alert("Word not in list")
        return
    }


    // loop to check correct letter 
    for(let i = 0; i < 5; i++) {
        let letterColor = ""
        let box = row.children[i]
        let letter = currentGuess[i]

        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // if letter isn't in the rightGuess word it return -1
        if(letterPosition === -1) {
            letterColor = "grey"
        } else {
            // the letter is in currentGuess index
            if(currentGuess[i] === rightGuess[i]) {
                letterColor = "green"
            // if the letter is in word but on the wrong index
            } else {
                letterColor = "yellow"
            }

        rightGuess[letterPosition] = "#"
        }
        // something like timeout I guess a little of animation
        let delay = 250 * i
        setTimeout(() => {
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }
    if(guessString === rightGuessString) {
        alert("You guessed right! Game over")
        guessRemaining = 0
        return
        // adding next row to be able to guess word and decrease available guessRemaining
    } else {
        guessRemaining --
        currentGuess = []
        nextLetter = 0
            // alert when user loss
        if(guessRemaining === 0) {
            alert("You 've run out of guesses! Game over!")
            alert(`The right word was was: ${rightGuessString}`)
        }
    }   
}

// CREATING SHADEKEYBOARD FOR MOBILE
function shadeKeyBoard(letter, color) {
    for(const el of document.getElementsByClassName("keyboard-button")) {
        if(el.textContent === letter) {
            let previousColor = el.style.backgroundColor
            // if previousColor was green do nothing
            if(previousColor === "green") {
                return
            } 
            
            if(previousColor === "yellow" && color != "green") {
                return
            }

            el.style.backgroundColor = color
            break
        }
    }
}

// ADD LISTNER THAT PUT CLICKS KEYWORD BUTTONS INTO BOXES

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target

    // if user click nothing what we defined as the keyword btn make nothing to happen
    if(!target.classList.contains("keyboard-button")) {
        return 
    }

    let key = target.textContent
    // create the same funcitonality for delete button as backspace keyboard has
    if(key === "Del") {
        key = "Backspace"
    }
    // enter on screen is the same as enter on keyboard

    // copy the same functionality for keys
    document.dispatchEvent(new KeyboardEvent("keyup", {"key" :key}))
})  



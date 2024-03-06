src="https://code.jquery.com/jquery-3.1.1.min.js"   
        integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="   
        crossorigin="anonymous"

attempts = 6
letter_count = 5
attempt_counter = 0
letter_counter = 0
guess = ""
answer = ""

init_answer(answer)
addEventListener("keydown",handle_key)

function handle_key(event) {
    if (event.repeat) {
        return
    }

    key = event.key
    if (isLetter(key) && letter_counter < letter_count) {
        add_letter(key)
    }
    else if(key.toLowerCase() == "backspace" && letter_counter > 0) {
        remove_letter(key)
    }
    else if(key.toLowerCase() == "enter") {
        submit_guess()
    }
}

async function submit_guess() {
    // check if guess has enough letters.
    if (guess.length < letter_count) {
        alert("NOT ENOUGH LETTERS")
        return
    }
    // check if guess is in dictionary.
    if (! await verify(guess)) {
        alert("THAT'S NOT A WORD")
        return
    }
    // check if guess is answer.
    if (is_answer(guess)) {
        alert("WOW YOU WIN")
        return
    }

    // check which letters in the guess were correct
    attempt_counter += 1
    letter_counter = 0
    guess = ""
}

function add_letter(key) {
    current_container().html(key)
    guess += key
    letter_counter += 1
}

function remove_letter(key) {
    letter_counter -= 1
    guess = guess.substring(0, letter_counter)
    current_container().html(" ")
}

function current_container() {
    return $(".attempt_container").eq(attempt_counter).children(".letter").eq(letter_counter)
}

function isLetter(key){
    return (key.length == 1) && ((key >= "a" && key <="z") || (key >= "A" && key <= "Z"))
}

function init_answer() {
    url = "https://random-word-api.herokuapp.com/word?length=" + letter_count.toString()

    req = new XMLHttpRequest()
    req.responseType = "json"

    req.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            answer = this.response[0]
            console.log("answer is " + answer)
        }
    }
    req.open("GET", url, true)
    req.send()
}

function is_answer(word) {
    if (answer=="") {
        alert("refresh the page. there's a boo boo on our end")
    }

    return (answer == word)
}

async function verify(word) {
    url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word

    let found
    await fetch(url)
        .then((response) => {
            found = (response.status == 200)
        })
        
    
    return found
}
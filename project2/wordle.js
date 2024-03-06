src="https://code.jquery.com/jquery-3.1.1.min.js"   
        integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="   
        crossorigin="anonymous"

attempts = 6
letter_count = 5
attempt_counter = 0
letter_counter = 0
guess = ""
answer = ""
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

    console.log(guess)
}

function submit_guess() {
    // check if guess is in dictionary.
    // check if guess has enough letters.
    // check if guess is answer.
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
    console.log($(".attempt_container").eq(attempt_counter).children(".letter").eq(letter_counter))
    return $(".attempt_container").eq(attempt_counter).children(".letter").eq(letter_counter)
}

function isLetter(key){
    return (key.length == 1) && ((key >= "a" && key <="z") || (key >= "A" && key <= "Z"))
}

function get_word() {
    url = "https://random-word-api.herokuapp.com/word?letter=5"

    req = new XMLHttpRequest()
    
    req.onreadystatechange = function(){
        console.log("ready: " + this.readyState)
        console.log("status: " + this.status)
        if (this.readyState == 4 && this.status == 200) {
            console.log("in status")
            console.log(this.responseText)
        }
    }
    req.open("GET", url, true)

    req.send()
}
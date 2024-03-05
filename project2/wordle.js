src="https://code.jquery.com/jquery-3.1.1.min.js"   
        integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="   
        crossorigin="anonymous"

attempts = 6
letter_count = 5
attempt_counter = 0
letter_counter = 0
guess = ""
addEventListener("keyup",handle_key)

function handle_key(event) {
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
    console.log(attempt_counter + ", " + letter_counter)
    return $(".attempt_container#" + attempt_counter).children("#" + letter_counter)
}

function isLetter(key){
    return (key.length == 1) && ((key >= "a" && key <="z") || (key >= "A" && key <= "Z"))
}

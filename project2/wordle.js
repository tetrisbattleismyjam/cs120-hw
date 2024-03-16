attempts = 6
letter_count = 5
var attempt_counter = 0
var letter_counter = 0
var guess = ""
var answer = ""
var disable_input = false

// Set up rules for the game
rules = {
    attempts: 6,
    letter_count: 5
}

// Set up keyboard interaction
addEventListener("keydown",handle_key)
window.onload=()=>{
        set_game()
        $(".reset").click(set_game)}

function handle_key(event) {
    if (event.repeat || disable_input) {
        return
    }

    key = event.key
    if (isLetter(key) && letter_counter < rules.letter_count) {
        add_letter(key)
    }
    else if(key.toLowerCase() == "backspace" && letter_counter > 0) {
        remove_letter(key)
    }
    else if(key.toLowerCase() == "enter") {
        submit_guess()
    }
}

// Process user's guess 
async function submit_guess() {
    // check if guess has enough letters.
    if (guess.length < rules.letter_count) {
        attempt_error("Not enough letters")
        return
    }
    // check if guess is in dictionary.
    if (! await verify(guess)) {
        attempt_error("Word not in dictionary")
        return
    }

    reveal_clues()

    // check if guess is answer.
    if (is_answer(guess)) {
        end_game("YOU WIN!")
    } else if (attempt_counter >= rules.attempts - 1) {
        end_game("Word was " + answer)
    }

    // check which letters in the guess were correct
    attempt_counter += 1
    letter_counter = 0
    guess = ""
}

// Display the message on the end screen
function end_game(msg) {
    disable_input = true
    $(".end_screen").prepend("<p class='msg'>" + msg + "</p>")
    $(".end_screen").css("display", "flex")
}

// Display the message on the error screen
async function attempt_error(msg) {
    spawn = $(".message_spawn")
    elm = $("<div class='error'>" + msg + "</div>")

    spawn.prepend(elm)
    elm.show()
    setTimeout(()=>spawn.children().last().remove(), 1500)
}

// Initializes the gameboard
function set_game() {
    attempt_counter = 0
    letter_counter = 0
    guess = ""
    disable_input = false
    init_answer(answer)

    $(".end_screen>.msg").remove()
    $(".end_screen").css("display", "none")
    $("#gameboard").empty()
    
    for (i=0; i < rules.attempts; i++){
        e = "<div class='attempt_container' id=" + i +"></div>"
        $("#gameboard").append(e)
    }

    for (container of document.getElementsByClassName("attempt_container")) {
        for (i=0; i < rules.letter_count; i++) {
            e = "<div class='letter clueless' id=" + i + "></div>"
            container.innerHTML += e
        }
    }
}

// Adds the given letter to the gameboard 
function add_letter(key) {
    current_container().html(key)
    guess += key
    letter_counter += 1
}

// Removes the last letter added to the gameboard
function remove_letter() {
    letter_counter -= 1
    guess = guess.substring(0, letter_counter)
    current_container().html(" ")
}

// returns the div for the current letter guess
function current_container() {
    return $(".attempt_container").eq(attempt_counter).children(".letter").eq(letter_counter)
}

// Checks if given key as part of the alphabet
function isLetter(key){
    return (key.length == 1) && ((key >= "a" && key <="z") || (key >= "A" && key <= "Z"))
}

// Reveals the color clues on the gameboard
function reveal_clues() {
    attempt = $(".attempt_container").eq(attempt_counter)

    answer.split('').forEach( function(val, index) {

        if (val == guess[index]) {
            attempt.children(".letter").eq(index).removeClass("clueless")
            attempt.children(".letter").eq(index).addClass("correct")
        } else {
            attempt.children().filter($(".clueless")).each(function() {
                if ($(this).html() == val) {
                    $(this).removeClass("clueless")
                    $(this).addClass("misplaced")
                    return false
                }
            })
        }
        

    })
    

    attempt.children().filter(".clueless").addClass("wrong").removeClass("clueless")
}

// Check if the given word is the correct answer
function is_answer(word) {
    if (answer=="") {
        alert("refresh the page. there's a boo boo on our end")
    }

    return (answer == word)
}

// Verifies the word is in the dictionary
async function verify(word) {
    url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
    found =  await fetch(url)
                .then((response) => {
                    return (response.status == 200)
                })
                
    
    return found
}

// Retrieves a word from the dictionary
async function init_answer() {
    url = "https://random-word-api.herokuapp.com/word?length=" + rules.letter_count.toString()
    

    console.log("attempting to get answer...")
    await fetch(url)
        .then((res) => res.json())
        .then((data) => data[0])
        .then((word) => {
            console.log("verifying " + word)
            answer = word
            return new Promise((resolve, reject) => resolve(verify(word)))
        })
        .then((valid) => {
            if (!valid) {
                init_answer()
            }
            else {
                console.log(">>>>>>>>>>>>>>>>answer is " + answer)
            }
        })
}
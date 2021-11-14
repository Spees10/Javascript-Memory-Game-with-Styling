// Select The Start Game Button
document.querySelector(".start-game span").onclick = function () {
    let playerName = prompt("What is your Name?");

    if (playerName == null || playerName == "") {
        document.querySelector(".player-name span").innerHTML = 'Unknown';
    }
    else {
        document.querySelector(".player-name span").innerHTML = playerName;
    }

    document.querySelector(".start-game").remove();
}

let duration = 500;

let gameContainer = document.querySelector(".memory-game");

let gameBlocks = Array.from(gameContainer.children);

//spread operator
let orderRange = [...Array(gameBlocks.length).keys()];
// let orderRange=Array.from(Array(gameBlocks.length).keys())

shuffle(orderRange);

function checkMatchedBlocks(firstBlock, secondBlock, thirdBlock) {

    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.tech === secondBlock.dataset.tech === thirdBlock.dataset.tech) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        thirdBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        thirdBlock.classList.add('has-match');

        document.getElementById('success').play();

    }
    else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
            thirdBlock.classList.remove('is-flipped');

        }, duration)

        document.getElementById('error').play();

    }

}

// add order css prop to the game blocks
gameBlocks.forEach((gameBlock, index) => {
    gameBlock.style.order = orderRange[index];

    gameBlock.addEventListener('click', function () {
        flipBlock(gameBlock);
    })
});

function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');

    let allFlippedBlocks = gameBlocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if (allFlippedBlocks.length === 3) {

        stopClicking();

        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1], allFlippedBlocks[2]);

    }

}


function stopClicking() {
    gameContainer.classList.add('no-clicking');

    setTimeout(() => {

        gameContainer.classList.remove('no-clicking');

    }, duration)
}


function shuffle(array) {

    let current = array.length,
        temp,
        random;

    while (current > 0) {

        random = Math.floor(Math.random() * current);

        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp;

    }

    return array

}
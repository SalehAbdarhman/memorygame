// Restart Button 
//https://www.w3schools.com/js/tryit.asp?filename=tryjs_addeventlistener_displaydate
let RestartBTN = document.getElementById("restart");
RestartBTN.addEventListener("click", reload);

function reload() {
    location.reload();
}

let playAgine = document.getElementById("playagine"); //play agine shows in Modal 
playAgine.addEventListener("click", reload);


let cardsType = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt',
    'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'
]; // to save the class to make it randoms cards

function gen(e) { // generate Html for the cards 
    return `<li data-t='${e}'class='card'><i class='${e}''></i></li>`;
}



let cardsRandmly = cardsType.map(function(c) {
    return gen(c);
});

cardsRandmly = shuffle(cardsRandmly);
let stringOFcards = cardsRandmly.toString()
let xs ;
for( xs = 0 ; xs  < 16 ; xs++){
stringOFcards = stringOFcards.replace('</li>,<li', "</li><li");
}
document.getElementById("deck").innerHTML = stringOFcards;
console.log(stringOFcards);



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
let sec = 0; // timer Secands
let min = 0; //timer Miuntes
let score = 0; // for score per 2 cards mathcing 1 point 
let moves = 0; // number of on click ~ show as moves 
let OpenedCard; // to save the card which opend before in this object
let cards = document.querySelectorAll('.card'); // get all cards form HTML
let clicks = 0; // number of clicks ~ countre
let stars = 3;
cards.forEach(function(card) {

    card.addEventListener('click', function(e) {
    	if(score !== 8){
        checkingRating();
        if (moves === 0) {
            startTime(); // to start the timer with the frist click 
        }
        if (clicks === 0 || clicks === 1) { // to check if there is no more 2 cards is opend
            card.classList.add('show', 'open');

            moves++;
            document.getElementById('moves').innerText = moves

            if (clicks === 0) {
                OpenedCard = card;
                clicks++;
            } else {
                if (card === OpenedCard) {
                    clicks--;
                    OpenedCard = "";

                }
                if (card.dataset.t == OpenedCard.dataset.t) { // cards is matching 
                    card.classList.add('match');// change css class to be as matched
                    OpenedCard.classList.add('match');

                    score++;

                    if (score === 8) {
                        let massage = "congraltion your win with " + stars + " stars: with time " +  document.getElementById("timer").innerText + " minutes"; // add message content to Modal 
                        document.getElementById('cog-content').innerText = massage;
                        stopTime(); //stop timer
                        setTimeout(function() {
                            $("#cong-popup").modal();
                        }, 2000); //set time out to show the final result

                    }
                    clicks--;
                } else {


                    clicks++;
                }

            }



        } else {
            cards.forEach(function(card) {
                if (card.classList.contains('show') && card.classList.contains('open') && !card.classList.contains('match')) {

                    card.classList.remove('show', 'open');
                    clicks--;

                }

            })
        }
   }
    });

});

//Rating 
function checkingRating() {

    if (moves === 25) { // to show 2 star 
        stars--;
        document.getElementById("rating").innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';

    }
    if (moves === 35) { // to show 1 star 
        stars--;
        document.getElementById("rating").innerHTML = '<li><i class="fa fa-star"></i></li>';
    }
    if (moves === 50) { // to show no star
        stars--;
        document.getElementById("rating").innerHTML = ' ';
    }


}
// Timer 
//https://stackoverflow.com/questions/19429890/javascript-timer-just-for-minutes-and-seconds/19430179

let b ; 
function startTime() {

    let  handler = function() {
        if (++sec === 60) {
            sec = 0;
            if (++min === 60) min = 0;
        }
        document.getElementById("timer").innerHTML = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
    };
    b=  setInterval(handler, 1000);
    handler();

}
function stopTime() {

  clearInterval(b);
}
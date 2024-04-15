/* Steps
0- Create vars
1- Shuffle cards order
2- make cards flip on click
3- count flipped cards
4- make cards unclickable
5- check cards similarity
  5.1- if similar let them flipped
  5.2- if not similar remove flip
6-make cards clickable again
 */

/* 0- Create vars  */
let arr = [];
let delayDuration = 1000;
let wrongTries = 0;
let seconds = 0;
let cardsContainer = $(".cards_container");
let timerId;

/* 1- Shuffle cards order */
/*    1.1 Generate Random number from 0->19 */
function randNum() {
  let randomNumber = Math.floor(Math.random() * 20);
  return randomNumber;
}
/*    1.2 Create random array */
function RandomArray() {
  /* Fill the array with none repeating random numbers */
  while (arr.length < 20) {
    let rand = randNum();
    if (arr.includes(rand)) {
      //pass
    } else {
      arr.push(rand);
    }
  }
  return arr;
}

/*    1.3 Shuffle cards randomly */
function shuffleCard() {
  $(".card").each(function (index, card) {
    card.style.order = RandomArray()[index];
  });
}

/* 2- make cards flip on click */

function flipCard() {
  setInterval(timer(), 1000);
  cardsContainer.on("click", ".card", function () {
    $(this).addClass("flip");

    /* 3- count flipped cards */

    let flippedCards = $(".cards_container .flip");
    if (flippedCards.length === 2) {
      unclickable();

      /* Check card similarity */
      checkSimilarity($(flippedCards[0]), $(flippedCards[1]));

      /* 6-make cards clickable again */

      setTimeout(() => {
        cardsContainer.removeClass("unclickable");
      }, delayDuration);
    }
  });
}

/* 4- make cards unclickable */

function unclickable() {
  cardsContainer.addClass("unclickable");
}

/* 5- check cards similarity */

function checkSimilarity(card1, card2) {
  /* 5.1- if similar let them flipped */

  if (card1.attr("data-logo") === card2.attr("data-logo")) {
    card1.removeClass("flip");
    card2.removeClass("flip");
    card1.addClass("matched");
    card2.addClass("matched");
    let matchCount = $(".cards_container .matched").length;
    if (matchCount === 20) {
      clearInterval(timerId);
      setTimeout(() => {
        $(".cards_container .card").removeClass("matched");
      }, 300);
      setTimeout(() => {
        finsihScreen(matchCount);
      }, delayDuration);
    }
  } else {
    /*   5.2- if not similar remove flip */
    setTimeout(() => {
      card1.removeClass("flip");
      card2.removeClass("flip");
    }, delayDuration);
    setTimeout(() => {
      wrongTries++;
      $(".wrong_tries").text(wrongTries);
    }, 300);
  }
}

/* Remove starting filter by click on play button */
function removeFilter() {
  let yourName = prompt("Enter your name please!");
  if (yourName == null || yourName == "") {
    $(".info_container .player_name ").html("Unknown");
  } else {
    $(".info_container .player_name ").html(yourName);
  }
  $(".starting_filter").remove();
  timerId = setInterval(() => {
    timer();
  }, delayDuration);
}

/* Set finish filter */
function finsihScreen(count) {
  let dive = $(
    "<div class='end'> <div class = 'timeToSolve'> Time: <span></span> </div> <div class = 'tiresToSolve'> Wrong Tries: <span></span> </div> <button class='restart_button' onclick='replay()'>Play Again</button></div>"
  );
  $(".info_container").before(dive);
  $(".end .timeToSolve span ").text($(".timer").text());
  $(".end .tiresToSolve span ").text($(".wrong_tries").text());
}

/* Add replay option */
function replay() {
  arr = [];
  shuffleCard();
  wrongTries = 0;
  seconds = 0;
  $(".wrong_tries").text(wrongTries);
  $(".timer").text("00:00");
  timerId = setInterval(() => {
    timer();
  }, delayDuration);
  $(".end").remove();
}

/* Set timer  */
function timer() {
  let minutes = Math.floor(seconds / 60);
  let sec = seconds - minutes * 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  sec = sec < 10 ? "0" + sec : sec;
  $(".timer").text(minutes + ":" + sec);
  seconds++;
}

shuffleCard();
flipCard();

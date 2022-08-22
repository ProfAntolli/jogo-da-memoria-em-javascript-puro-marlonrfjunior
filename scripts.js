var cards = document.querySelectorAll('.memory-card');

var cardsToLoad = [{name: "angular"}
                   ,{name: "aurelia"}
                   ,{name: "backbone"}
                   ,{name: "ember"}
                   ,{name: "react"}
                   ,{name: "vue"}];

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

  function flipCard() {
   if (this === firstCard) return;
   if (lockBoard) return;
   this.classList.add('flip');

   if (!hasFlippedCard) {
     hasFlippedCard = true;
     firstCard = this;
       return;
       }
    
       secondCard = this;
    
       checkForMatch();
     }
    
     function checkForMatch() {
       if (firstCard.dataset.framework === secondCard.dataset.framework) {
         disableCards();
         return;
       }
    
       unflipCards();
     }
    
     function disableCards() {
       firstCard.removeEventListener('click', flipCard);
       secondCard.removeEventListener('click', flipCard);
         resetBoard();
     }
    
     function unflipCards() {
         lockBoard = true;
       setTimeout(() => {
         firstCard.classList.remove('flip');
         secondCard.classList.remove('flip');
           resetBoard();
       }, 1500);
     }
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}





function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

function loadCards(level) {

  let indexLevel = 0
  let card_section = document.querySelector(".memory-game");
  card_section.innerHTML = ""
  cardsToLoad.forEach((el) => {
    if (indexLevel <= level) {
        indexLevel++
        let identificador = el.name;
        let card_container = `

              <div class="memory-card" data-framework="${identificador}">
                <img class="front-face" src="img/${identificador}.svg" alt="Face da Carta">
                <img class="back-face" src="img/js-badge.svg" alt="Verso da Carta">
              </div>
              <div class="memory-card" data-framework="${identificador}">
                <img class="front-face" src="img/${identificador}.svg" alt="Face da Carta">
                <img class="back-face" src="img/js-badge.svg" alt="Verso da Carta">
              </div>
`;
      card_section.innerHTML += card_container;
  }});
    cards = document.querySelectorAll('.memory-card');
      shuffle()
    cards.forEach(card => card.addEventListener('click', flipCard));
}

//document.querySelector("#btnEasy").addEventListener("click", loadCards());
cards.forEach(card => card.addEventListener('click', flipCard));

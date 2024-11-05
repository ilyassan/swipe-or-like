const cards = document.querySelector("main .cards");
const likedCards = document.getElementById("liked-cards");
const swipedCards = document.getElementById("swiped-cards");

const swipedImagesBtn = document.getElementById("swiped-images-btn");
const likedImagesBtn = document.getElementById("liked-images-btn");
const waitingImagesBtn = document.getElementById("waiting-images-btn");

waitingImagesBtn.addEventListener("click", function() {
    cards.classList.remove("d-none")
    likedCards.classList.add("d-none");
    swipedCards.classList.add("d-none");
});
swipedImagesBtn.addEventListener("click", function() {
    cards.classList.add("d-none")
    likedCards.classList.add("d-none");
    swipedCards.classList.remove("d-none");
});
likedImagesBtn.addEventListener("click", function() {
    cards.classList.add("d-none")
    likedCards.classList.remove("d-none");
    swipedCards.classList.add("d-none");
});

const swipeBtns = document.querySelectorAll(".swipe-btn");
const likeBtns = document.querySelectorAll(".like-btn");

updateCounts();

swipeBtns.forEach(btn => {
    btn.addEventListener("click", () => swipe(btn.parentElement.parentElement.parentElement))
})
likeBtns.forEach(btn => {
    btn.addEventListener("click", () => like(btn.parentElement.parentElement.parentElement))
})

function swipe(card) {
    let cloneCard = card.cloneNode(true);
    card.classList.add("swipe");
    showCardOverlay(card, "Noope!!")
    appendCard(swipedCards, cloneCard);
}

function like(card) {
    let cloneCard = card.cloneNode(true);
    card.classList.add("like");
    showCardOverlay(card, "Yeaah")
    appendCard(likedCards, cloneCard);
}

function appendCard(container, card) {
    card.querySelector(".controll").remove();
    card.style.cssText = "";
    container.appendChild(card);
    updateCounts();
}

function showCardOverlay(card, message) {
    card.setAttribute("data-reaction", message);
    card.classList.add("show-overlay");
    setTimeout(() => {
        card.remove();
    }, 800);
}

function showSpecefiqueCards() {
    cards.classList.toggle("d-none");
    swipedCards.classList.toggle("d-none");
    likedCards.classList.toggle("d-none");
}

function updateCounts() {
    swipedImagesBtn.querySelector(".count").textContent = swipedCards.children.length;
    likedImagesBtn.querySelector(".count").textContent = likedCards.children.length;
    waitingImagesBtn.querySelector(".count").textContent = Array.from(cards.children).filter(card => !card.hasAttribute("data-reaction")).length;
}
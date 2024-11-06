const waitingCardsContainer = document.querySelector("main .cards");
const likedCardsContainer = document.getElementById("liked-cards");
const swipedCardsContainer = document.getElementById("swiped-cards");

const swipedImagesBtn = document.getElementById("swiped-images-btn");
const likedImagesBtn = document.getElementById("liked-images-btn");
const waitingImagesBtn = document.getElementById("waiting-images-btn");

let waitingCards = [];
let likedCards = [];
let swipedCards = [];

fetchCards();

function swipe(card) {
    card.classList.add("swipe");
    showCardOverlay(card, "Noope!!")
    appendCard(swipedCards);
}

function like(card) {
    card.classList.add("like");
    showCardOverlay(card, "Yeaah")
    appendCard(likedCards);
}

function appendCard(array) {
    array.push(waitingCards.pop());
    loadSwipedAndLikedCards();
}

function showCardOverlay(card, message) {
    card.setAttribute("data-reaction", message);
    card.classList.add("show-overlay");
    setTimeout(() => {
        card.remove();
    }, 800);
}

function showSpecefiqueCards() {
    waitingCardsContainer.classList.toggle("d-none");
    swipedCardsContainer.classList.toggle("d-none");
    likedCardsContainer.classList.toggle("d-none");
}

function updateCounts() {
    swipedImagesBtn.querySelector(".count").textContent = swipedCards.length;
    likedImagesBtn.querySelector(".count").textContent = likedCards.length;
    waitingImagesBtn.querySelector(".count").textContent = waitingCards.length;
}

function applyEvents() {
    const swipeBtns = document.querySelectorAll(".swipe-btn");
    const likeBtns = document.querySelectorAll(".like-btn");

    waitingImagesBtn.addEventListener("click", function() {
        waitingCardsContainer.classList.remove("d-none")
        likedCardsContainer.classList.add("d-none");
        swipedCardsContainer.classList.add("d-none");
    });
    swipedImagesBtn.addEventListener("click", function() {
        waitingCardsContainer.classList.add("d-none")
        likedCardsContainer.classList.add("d-none");
        swipedCardsContainer.classList.remove("d-none");
    });
    likedImagesBtn.addEventListener("click", function() {
        waitingCardsContainer.classList.add("d-none")
        likedCardsContainer.classList.remove("d-none");
        swipedCardsContainer.classList.add("d-none");
    });

    swipeBtns.forEach(btn => {
        btn.addEventListener("click", () => swipe(btn.parentElement.parentElement.parentElement))
    })
    likeBtns.forEach(btn => {
        btn.addEventListener("click", () => like(btn.parentElement.parentElement.parentElement))
    })
}

function fetchCards() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "./data.json");
    xhr.send();

    xhr.onload = function() {
        if (xhr.status == 200) {
            let data = JSON.parse(this.responseText);
            waitingCards = data;

            for (let i = 0; i < waitingCards.length; i++) {
                waitingCardsContainer.innerHTML += getCard(waitingCards[i].image, waitingCards[i].name, `style="--i: ${i <= 4 ? i : 4}"`, true);
            }
            loadSwipedAndLikedCards();
            applyEvents();
        }
    }
}

function loadSwipedAndLikedCards() {
    swipedCardsContainer.innerHTML = "";
    likedCardsContainer.innerHTML = "";

    for (let dataCard of swipedCards) {
        swipedCardsContainer.innerHTML += getCard(dataCard.image, dataCard.name);
    }
    for (let dataCard of likedCards) {
        likedCardsContainer.innerHTML += getCard(dataCard.image, dataCard.name);
    }

    updateCounts();
}

function getCard(image, name, cssText, showControll = false) {
    return `<div class="card" ${cssText}>
                    <img src="${image}" alt="${name}">
                    <div class="content">
                        <h2 class="text-center py-2">${name}</h2>
                        ${showControll
                            ?
                            `<div class="controll d-flex justify-content-between">
                                <span class="swipe-btn bg-white rounded-circle"><i style="rotate: 180deg;" class="fa-solid fa-thumbs-up text-secondary"></i></span>
                                <span class="like-btn bg-white rounded-circle"><i class="fa-solid fa-heart text-danger"></i></span>
                            </div>`
                            : ""
                        }
                    </div>
            </div>`
}
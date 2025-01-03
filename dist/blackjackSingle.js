var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Game } from "./blackjackLogic.js";
import { Deck } from "./blackjackLogic.js";
import { Hand } from "./blackjackLogic.js";
const continueButton = document.getElementById("bjContinue-btn");
const playersSelect = document.getElementById("bjSelect-players");
const bjSettings = document.getElementById("bj-menu");
const blackjacktable = document.getElementById("blackjackgame-table-container");
const betButtonElement = document.getElementById("bet-button");
const bettingPanelElement = document.getElementById("betting-panel");
const valueSpan = document.getElementById("bet-value");
const allinBtn = document.getElementById("allin-btn");
const halfBtn = document.getElementById("1/2-btn");
const thirdBtn = document.getElementById("1/3-btn");
const quarterBtn = document.getElementById("1/4-btn");
const rangeBetInput = document.getElementById("rangeInput");
const stackSpan = document.getElementById("playerName-namebox-stack");
const betValueLabel = document.getElementById("player-bet-value");
const dealerHandValue = document.getElementById("dealer-hand-value");
const playerHandValue = document.getElementById("player-hand-value");
const actionBtnHit = document.getElementById("action-btn-hit");
const actionBtnStand = document.getElementById("action-btn-stand");
const actionBtnDouble = document.getElementById("action-btn-dd");
const actionBtnSplit = document.getElementById("action-btn-split");
const dealerCardsSlot = document.getElementById("dealer-card-slots");
const playerCardsSlot = document.getElementById("player-card-slots");
const newHandBtn = document.getElementById("newhand-button");
let betValue;
let betMadeAmount;
let playerStack;
let betMade;
let dealerHandValueNumber;
function formatAsCurrency(amount, vaultStyle = "currency", currency = "USD", locale = "en-US") {
    return new Intl.NumberFormat(locale, {
        style: vaultStyle,
        currency: currency,
        maximumFractionDigits: 0,
    }).format(amount);
}
function sendBet() {
    betMadeAmount = betValue;
    betValue = 0;
    playerStack = playerStack - betMadeAmount;
}
function losthand() {
    actionBtnHit.classList.add("hidden");
    actionBtnStand.classList.add("hidden");
    actionBtnDouble.classList.add("hidden");
    actionBtnSplit.classList.add("hidden");
    newHandBtn.classList.toggle("hidden");
}
function wonhand() {
    playerStack = playerStack + 2 * betMadeAmount;
    stackSpan.innerText = formatAsCurrency(playerStack);
    actionBtnHit.classList.add("hidden");
    actionBtnStand.classList.add("hidden");
    actionBtnDouble.classList.add("hidden");
    actionBtnSplit.classList.add("hidden");
    newHandBtn.classList.toggle("hidden");
}
function drawhand() {
    playerStack = playerStack + betMadeAmount;
    stackSpan.innerText = formatAsCurrency(playerStack);
    actionBtnHit.classList.add("hidden");
    actionBtnStand.classList.add("hidden");
    actionBtnDouble.classList.add("hidden");
    actionBtnSplit.classList.add("hidden");
    newHandBtn.classList.toggle("hidden");
}
function resetTable() {
    dealerHandValue.classList.add("hidden");
    playerHandValue.classList.add("hidden");
    betValueLabel.classList.add("hidden");
    newHandBtn.classList.add("hidden");
    let cardsImg = dealerCardsSlot.children;
    let cardsImgArray = Array.from(cardsImg).filter(child => child.tagName === "IMG");
    cardsImgArray.forEach(img => dealerCardsSlot.removeChild(img));
    cardsImg = playerCardsSlot.children;
    cardsImgArray = Array.from(cardsImg).filter(child => child.tagName === "IMG");
    cardsImgArray.forEach(img => playerCardsSlot.removeChild(img));
}
function newHand() {
}
function bettingLogic(stackValue) {
    playerStack = stackValue;
    betMade = false;
    return new Promise((resolve, reject) => {
        if (betButtonElement) {
            let isBetting = false;
            betButtonElement.addEventListener("click", () => {
                betValueLabel.classList.add("hidden");
                if (playerStack > 0) {
                    bettingPanelElement.classList.toggle("hidden");
                    betButtonElement.classList.toggle("betBtn-confirm");
                    betButtonElement.innerText = "CONFIRM";
                    isBetting = !isBetting;
                    if (isBetting) {
                        rangeBetInput.min = String(0.1 * playerStack);
                        rangeBetInput.max = String(playerStack);
                        rangeBetInput.step = String(playerStack * 0.01);
                        allinBtn.addEventListener("click", () => {
                            valueSpan.innerText = formatAsCurrency(playerStack, "decimal");
                            rangeBetInput.value = String(playerStack);
                        });
                        halfBtn.addEventListener("click", () => {
                            valueSpan.innerText = formatAsCurrency(playerStack / 2, "decimal");
                            rangeBetInput.value = String(playerStack / 2);
                        });
                        thirdBtn.addEventListener("click", () => {
                            valueSpan.innerText = formatAsCurrency(playerStack / 3, "decimal");
                            rangeBetInput.value = String(playerStack / 3);
                        });
                        quarterBtn.addEventListener("click", () => {
                            valueSpan.innerText = formatAsCurrency(playerStack / 4, "decimal");
                            rangeBetInput.value = String(playerStack / 4);
                        });
                        rangeBetInput.addEventListener("input", () => {
                            valueSpan.innerText = formatAsCurrency(Number(rangeBetInput.value), "decimal");
                        });
                    }
                    else {
                        betValue = Number(valueSpan.innerText.replace(/,/g, ""));
                        sendBet();
                        valueSpan.innerText = "0.00";
                        rangeBetInput.value = "0";
                        betButtonElement.innerText = "BET";
                        stackSpan.innerText = formatAsCurrency(playerStack);
                        betValueLabel.classList.toggle("hidden");
                        betValueLabel.innerText = formatAsCurrency(betMadeAmount);
                        allowBetPlacing();
                        betMade = true;
                        resolve();
                    }
                }
                else {
                    console.log("BUSTED. NO CREDITSS");
                }
            });
        }
    });
}
function loadBlackjackDesign() {
    bjSettings.classList.add("hidden");
    const bodyElement = document.querySelector("body");
    bodyElement.classList.add("blackjackSingle");
    bodyElement.classList.add("bjgame-mobile");
    blackjacktable.classList.remove("hidden");
}
function allowBetPlacing() {
    betButtonElement.classList.toggle("hidden");
}
function renderCard(src = "./assets/cards/bicycle_blue.png", type = "dealer") {
    if (type === "dealer") {
        let backSuitCardSrc = src;
        const backsuitCard = document.createElement("img");
        backsuitCard.src = backSuitCardSrc;
        backsuitCard.classList.add("card");
        dealerCardsSlot.insertBefore(backsuitCard, dealerHandValue);
        setTimeout(() => {
            backsuitCard.classList.add("animate");
        }, 10);
    }
    if (type === "player") {
        let CardSrc = src;
        const Card = document.createElement("img");
        Card.src = CardSrc;
        Card.classList.add("card");
        playerCardsSlot.insertBefore(Card, playerHandValue);
        setTimeout(() => {
            Card.classList.add("animate");
        }, 10);
    }
}
function renderAllDealerCards(dealerHandArr) {
    return __awaiter(this, void 0, void 0, function* () {
        let previousCardCount = 1;
        if (dealerHandArr.length > previousCardCount) {
            for (let i = previousCardCount; i < dealerHandArr.length; i++) {
                let src = "./assets/cards/" + dealerHandArr[i].rank + dealerHandArr[i].suit + ".png";
                renderCard(src);
                previousCardCount = dealerHandArr.length;
            }
        }
        dealerHandValue.classList.remove("hidden");
        dealerHandValue.innerText = String(dealerHandValueNumber);
        yield new Promise((resolve) => setTimeout(resolve, 400));
    });
}
function renderAllPlayerCards(playerHandArr) {
    return __awaiter(this, void 0, void 0, function* () {
        let previousCardCount = 0;
        let playerHandValueNumber = 0;
        while (true) {
            if (playerHandArr.length > previousCardCount) {
                for (let i = previousCardCount; i < playerHandArr.length; i++) {
                    let src = "./assets/cards/" + playerHandArr[i].rank + playerHandArr[i].suit + ".png";
                    renderCard(src, "player");
                    playerHandValueNumber = playerHandValueNumber + playerHandArr[i].value;
                }
                previousCardCount = playerHandArr.length;
                playerHandValue.classList.remove("hidden");
                playerHandValue.innerText = String(playerHandValueNumber);
                if (playerHandValueNumber > 21) {
                    losthand();
                }
            }
            yield new Promise((resolve) => setTimeout(resolve, 100));
        }
    });
}
function checkPlayerHand() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            if ((Number(playerHandValue.innerText)) <= 21 && (Number(playerHandValue.innerText)) > dealerHandValueNumber) {
                wonhand();
                return;
            }
            if ((Number(playerHandValue.innerText)) <= 21 && dealerHandValueNumber > 21) {
                wonhand();
                return;
            }
            if ((Number(playerHandValue.innerText)) === dealerHandValueNumber) {
                drawhand();
                return;
            }
            if (Number(playerHandValue.innerText) > 21) {
                losthand();
                return;
            }
            if (Number(playerHandValue.innerText) <= 21 && dealerHandValueNumber <= 21 && Number(playerHandValue.innerText) < dealerHandValueNumber) {
                losthand();
                return;
            }
            yield new Promise((resolve) => setTimeout(resolve, 100));
        }
    });
}
function buttonShowingLogic(hand, deck) {
    if (betMadeAmount < playerStack) {
        actionBtnDouble.classList.toggle("hidden");
    }
    if (Number(playerHandValue.innerText) === 21) {
        dealDealerHand(hand.dealerHand, hand, deck);
    }
    else {
        actionBtnHit.classList.toggle("hidden");
        actionBtnStand.classList.toggle("hidden");
    }
}
let hitBtnLogic;
function hitButton(hand, player, deck) {
    actionBtnHit.removeEventListener("click", (hitBtnLogic));
    hitBtnLogic = () => {
        hand.hit(player, deck);
        const playerHand = hand.playersHands.get(player);
        const lastCard = playerHand[playerHand.length - 1];
        if (lastCard.rank === "A" && (Number(playerHandValue.innerText) > 10)) {
            lastCard.value = 1;
        }
    };
    if (actionBtnHit) {
        actionBtnHit.addEventListener("click", (hitBtnLogic));
    }
}
function doubleButton(hand, player, deck) {
    if (actionBtnDouble) {
        actionBtnDouble.addEventListener("click", () => {
            hand.hit(player, deck);
            playerStack = playerStack - betMadeAmount;
            betMadeAmount = betMadeAmount * 2;
            betValueLabel.innerText = formatAsCurrency(betMadeAmount);
            stackSpan.innerText = formatAsCurrency(playerStack);
        });
    }
}
let actionBtnLogic;
function standButton(hand, deck) {
    actionBtnStand.removeEventListener("click", (actionBtnLogic));
    actionBtnLogic = () => {
        actionBtnHit.classList.add("hidden");
        actionBtnStand.classList.add("hidden");
        actionBtnDouble.classList.add("hidden");
        actionBtnSplit.classList.add("hidden");
        dealDealerHand(hand.dealerHand, hand, deck);
    };
    if (actionBtnStand) {
        actionBtnStand.addEventListener("click", (actionBtnLogic));
    }
}
function dealDealerHand(dealerHandArr, hand, deck) {
    const dealerCardsSlot = document.getElementById("dealer-card-slots");
    dealerCardsSlot.removeChild(dealerCardsSlot.firstElementChild);
    dealerCardsSlot.removeChild(dealerCardsSlot.firstElementChild);
    let backSuitCardSrc = "./assets/cards/" + dealerHandArr[0].rank + dealerHandArr[0].suit + ".png";
    ;
    const backsuitCard = document.createElement("img");
    backsuitCard.src = backSuitCardSrc;
    dealerCardsSlot.prepend(backsuitCard);
    dealerHandValueNumber = dealerHandArr[0].value + dealerHandArr[1].value;
    while (dealerHandValueNumber < 17) {
        hand.dealerHit(deck);
        const lastCard = dealerHandArr[dealerHandArr.length - 1];
        if (lastCard.rank === "A" && (dealerHandValueNumber) > 10) {
            lastCard.value = 1;
        }
        dealerHandValueNumber = 0;
        for (let i = 0; i < dealerHandArr.length; i++) {
            dealerHandValueNumber = dealerHandValueNumber + dealerHandArr[i].value;
        }
    }
    renderAllDealerCards(dealerHandArr);
    checkPlayerHand();
}
function startGame(startingStackAmount) {
    return __awaiter(this, void 0, void 0, function* () {
        loadBlackjackDesign();
        allowBetPlacing();
        yield bettingLogic(startingStackAmount);
        const game = new Game();
        let deck = new Deck();
        const player = game.initializePlayers(1, startingStackAmount);
        const hand = new Hand();
        const startNewRound = () => {
            deck.shuffle();
            hand.start(player, deck);
            dealerHandValueNumber = hand.dealerHand[1].value;
            renderCard();
            renderAllDealerCards(hand.dealerHand);
            renderAllPlayerCards(hand.playersHands.get(player[0]));
        };
        newHandBtn.addEventListener("click", () => {
            hand.playersHands.clear();
            hand.dealerHand = [];
            deck = new Deck();
            resetTable();
            allowBetPlacing();
        });
        while (true) {
            if (betMade) {
                startNewRound();
                hitButton(hand, player[0], deck);
                doubleButton(hand, player[0], deck);
                standButton(hand, deck);
                buttonShowingLogic(hand, deck);
                betMade = false;
            }
            yield new Promise((resolve) => setTimeout(resolve, 100));
        }
    });
}
export function blackjackSingleLogic() {
    if (continueButton) {
        continueButton.addEventListener("click", () => {
            const startingStackElement = document.getElementById("bjSelect-stackValue");
            const startingStackAmount = Number(startingStackElement.value);
            if (playersSelect.value === "1") {
                const stackSpan = document.getElementById("playerName-namebox-stack");
                stackSpan.innerText = formatAsCurrency(startingStackAmount);
                startGame(startingStackAmount);
            }
        });
    }
}

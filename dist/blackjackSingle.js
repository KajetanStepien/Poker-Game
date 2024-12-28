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
let betValue;
let betMadeAmount;
let playerStack;
let betMade;
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
                        console.log(betMadeAmount);
                        console.log(playerStack);
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
        const dealerCardsSlot = document.getElementById("dealer-card-slots");
        let backSuitCardSrc = src;
        const backsuitCard = document.createElement("img");
        backsuitCard.src = backSuitCardSrc;
        dealerCardsSlot.insertBefore(backsuitCard, dealerHandValue);
    }
    if (type === "player") {
        const playerCardsSlot = document.getElementById("player-card-slots");
        let CardSrc = src;
        const Card = document.createElement("img");
        Card.src = CardSrc;
        playerCardsSlot.insertBefore(Card, playerHandValue);
    }
}
function renderAllDealerCards(dealerHandArr) {
    return __awaiter(this, void 0, void 0, function* () {
        let firstSrc = "./assets/cards/" + dealerHandArr[1].rank + dealerHandArr[1].suit + ".png";
        renderCard(firstSrc);
        let previousCardCount = 2;
        let dealerHandValueNumber = dealerHandArr[1].value;
        while (true) {
            if (dealerHandArr.length > previousCardCount) {
                for (let i = previousCardCount; i < dealerHandArr.length; i++) {
                    let src = "./assets/cards/" + dealerHandArr[i].rank + dealerHandArr[i].suit + ".png";
                    renderCard(src);
                }
                previousCardCount = dealerHandArr.length;
            }
            dealerHandValue.classList.remove("hidden");
            dealerHandValue.innerText = String(dealerHandValueNumber);
            yield new Promise((resolve) => setTimeout(resolve, 100));
        }
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
            }
            yield new Promise((resolve) => setTimeout(resolve, 100));
        }
    });
}
function hitButton(hand, player, deck) {
    if (actionBtnHit) {
        actionBtnHit.addEventListener("click", () => {
            hand.hit(player, deck);
            console.log(hand.playersHands.get(player));
        });
    }
}
function doubleButton(hand, player, deck) {
    if (actionBtnDouble) {
        actionBtnDouble.addEventListener("click", () => {
            hand.hit(player, deck);
            console.log(hand.playersHands.get(player));
            playerStack = playerStack - betMadeAmount;
            betMadeAmount = betMadeAmount * 2;
            betValueLabel.innerText = formatAsCurrency(betMadeAmount);
            stackSpan.innerText = formatAsCurrency(playerStack);
        });
    }
}
function startGame(startingStackAmount) {
    return __awaiter(this, void 0, void 0, function* () {
        loadBlackjackDesign();
        allowBetPlacing();
        yield bettingLogic(startingStackAmount);
        const game = new Game();
        const deck = new Deck();
        const player = game.initializePlayers(1, startingStackAmount);
        const hand = new Hand();
        if (betMade) {
            deck.shuffle();
            hand.start(player, deck);
            renderCard();
            renderAllDealerCards(hand.dealerHand);
            renderAllPlayerCards(hand.playersHands.get(player[0]));
            hitButton(hand, player[0], deck);
            doubleButton(hand, player[0], deck);
            if (Number(playerHandValue.innerText) === 21) {
                console.log("BLACKJACK. YOU WON.");
            }
            else {
                actionBtnHit.classList.toggle("hidden");
                actionBtnStand.classList.toggle("hidden");
            }
            if (betMadeAmount * 2 <= playerStack) {
                actionBtnDouble.classList.toggle("hidden");
            }
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

import { Game } from "./blackjackLogic.js";
import { Player } from "./blackjackLogic.js";
import { Deck } from "./blackjackLogic.js";
import { Hand } from "./blackjackLogic.js";
import { Card } from "./blackjackLogic.js";
const continueButton = document.getElementById("bjContinue-btn") as HTMLButtonElement;
const playersSelect = document.getElementById("bjSelect-players") as HTMLSelectElement;
const bjSettings = document.getElementById("bj-menu");
const blackjacktable: HTMLElement = document.getElementById("blackjackgame-table-container");
const betButtonElement = document.getElementById("bet-button") as HTMLButtonElement;
const bettingPanelElement: HTMLElement = document.getElementById("betting-panel");
const valueSpan: HTMLSpanElement = document.getElementById("bet-value");
const allinBtn = document.getElementById("allin-btn") as HTMLButtonElement;
const halfBtn = document.getElementById("1/2-btn") as HTMLButtonElement;
const thirdBtn = document.getElementById("1/3-btn") as HTMLButtonElement;
const quarterBtn = document.getElementById("1/4-btn") as HTMLButtonElement;
const rangeBetInput = document.getElementById("rangeInput") as HTMLInputElement;
const stackSpan: HTMLSpanElement = document.getElementById("playerName-namebox-stack");
const betValueLabel: HTMLSpanElement = document.getElementById("player-bet-value");
const dealerHandValue: HTMLSpanElement = document.getElementById("dealer-hand-value");
const playerHandValue: HTMLSpanElement = document.getElementById("player-hand-value");
const actionBtnHit = document.getElementById("action-btn-hit") as HTMLButtonElement;
const actionBtnStand = document.getElementById("action-btn-stand") as HTMLButtonElement;
const actionBtnDouble = document.getElementById("action-btn-dd") as HTMLButtonElement;
const actionBtnSplit = document.getElementById("action-btn-split") as HTMLButtonElement;
const dealerCardsSlot: HTMLElement = document.getElementById("dealer-card-slots");
const playerCardsSlot: HTMLElement = document.getElementById("player-card-slots");
const newHandBtn = document.getElementById("newhand-button") as HTMLButtonElement;
let betValue: number;
let betMadeAmount: number;
let playerStack: number;
let betMade: boolean;
let dealerHandValueNumber: number;


function formatAsCurrency(amount: number, vaultStyle: keyof Intl.NumberFormatOptionsStyleRegistry = "currency",  currency: string = "USD", locale: string = "en-US"): string{
    return new Intl.NumberFormat(locale, {
        style: vaultStyle,
        currency: currency,
        maximumFractionDigits: 0,
    }).format(amount);
}

function sendBet(){
    betMadeAmount = betValue;
    betValue = 0;
    playerStack = playerStack - betMadeAmount;
}
function losthand(){
    console.log("losthand")
    actionBtnHit.classList.add("hidden");
    actionBtnStand.classList.add("hidden");
    actionBtnDouble.classList.add("hidden");
    actionBtnSplit.classList.add("hidden");
    newHandBtn.classList.remove("hidden");
}

function wonhand(){
    console.log("wonhand")
    playerStack = playerStack + 2*betMadeAmount;
    stackSpan.innerText = formatAsCurrency(playerStack);
    actionBtnHit.classList.add("hidden");
    actionBtnStand.classList.add("hidden");
    actionBtnDouble.classList.add("hidden");
    actionBtnSplit.classList.add("hidden");
    newHandBtn.classList.remove("hidden");
}

function drawhand(){
    console.log("drawhand")
    playerStack = playerStack + betMadeAmount;
    stackSpan.innerText = formatAsCurrency(playerStack);
    actionBtnHit.classList.add("hidden");
    actionBtnStand.classList.add("hidden");
    actionBtnDouble.classList.add("hidden");
    actionBtnSplit.classList.add("hidden");
    newHandBtn.classList.remove("hidden");
}

function resetTable(){
    dealerHandValue.classList.add("hidden");
    playerHandValue.classList.add("hidden");
    betValueLabel.classList.add("hidden");
    newHandBtn.classList.add("hidden");

    let cardsImg = dealerCardsSlot.children;
    let cardsImgArray = Array.from(cardsImg).filter(child => child.tagName === "IMG");
    cardsImgArray.forEach(img=>dealerCardsSlot.removeChild(img));

    cardsImg = playerCardsSlot.children;
    cardsImgArray = Array.from(cardsImg).filter(child => child.tagName === "IMG");
    cardsImgArray.forEach(img=>playerCardsSlot.removeChild(img));
}

function bettingLogic(stackValue: number): Promise<void>{
    playerStack = stackValue;
    betMade = false;
    return new Promise((resolve, reject) =>{
    if(betButtonElement){
        let isBetting: boolean = false;
        betButtonElement.addEventListener("click", ()=>{
            betValueLabel.classList.add("hidden");
            if(playerStack>0){
            bettingPanelElement.classList.toggle("hidden");
            betButtonElement.classList.toggle("betBtn-confirm");
            betButtonElement.innerText="CONFIRM";
            isBetting = !isBetting;
            if(isBetting){
                rangeBetInput.min = String(0.1*playerStack);
                rangeBetInput.max = String(playerStack);
                rangeBetInput.step = String(playerStack*0.01);
                allinBtn.addEventListener("click", ()=>{
                    valueSpan.innerText = formatAsCurrency(playerStack, "decimal");
                    rangeBetInput.value = String(playerStack);
                    })
                halfBtn.addEventListener("click", ()=>{
                    valueSpan.innerText = formatAsCurrency(playerStack/2, "decimal");
                    rangeBetInput.value = String(playerStack/2);
                    })
                thirdBtn.addEventListener("click", ()=>{
                    valueSpan.innerText = formatAsCurrency(playerStack/3, "decimal");
                    rangeBetInput.value = String(playerStack/3);
                    })
                quarterBtn.addEventListener("click", ()=>{
                    valueSpan.innerText = formatAsCurrency(playerStack/4, "decimal");
                    rangeBetInput.value = String(playerStack/4);
                    })
                rangeBetInput.addEventListener("input", ()=>{
                valueSpan.innerText = formatAsCurrency(Number(rangeBetInput.value), "decimal");
                })
            } else{
                betValue = Number(valueSpan.innerText.replace(/,/g,""));
                sendBet();
                valueSpan.innerText="0.00";
                rangeBetInput.value = "0";
                betButtonElement.innerText="BET";
                stackSpan.innerText = formatAsCurrency(playerStack);
                betValueLabel.classList.toggle("hidden");
                betValueLabel.innerText=formatAsCurrency(betMadeAmount);
                allowBetPlacing();
                betMade = true;
                resolve();
            }
            }else{
                console.log("BUSTED. NO CREDITSS");
            }
        })
    }
});
}

function loadBlackjackDesign(){
    bjSettings.classList.add("hidden");
    const bodyElement: HTMLElement = document.querySelector("body");
    bodyElement.classList.add("blackjackSingle");
    bodyElement.classList.add("bjgame-mobile");
    blackjacktable.classList.remove("hidden");
}

function allowBetPlacing(){
    betButtonElement.classList.toggle("hidden");
}

function renderCard(src: string = "./assets/cards/bicycle_blue.png", type: string = "dealer"){
    if(type==="dealer"){
        let backSuitCardSrc: string = src;
        const backsuitCard: HTMLImageElement = document.createElement("img");
        backsuitCard.src = backSuitCardSrc;
        backsuitCard.classList.add("card");
        dealerCardsSlot.insertBefore(backsuitCard, dealerHandValue);

        setTimeout(()=>{
            backsuitCard.classList.add("animate");
        }, 10);
    }

    if(type==="player"){
        let CardSrc: string = src;
        const Card: HTMLImageElement = document.createElement("img");
        Card.src = CardSrc;
        Card.classList.add("card");
        playerCardsSlot.insertBefore(Card, playerHandValue);

        setTimeout(()=>{
            Card.classList.add("animate");
        }, 10);
    }
}
async function renderAllDealerCards(dealerHandArr: Card[]){
    let previousCardCount = 1;
        if(dealerHandArr.length>previousCardCount){
            for(let i = previousCardCount; i<dealerHandArr.length; i++){
                    let src: string = "./assets/cards/" + dealerHandArr[i].rank + dealerHandArr[i].suit + ".png";
                    renderCard(src);
                    previousCardCount = dealerHandArr.length;
            }
        }
        dealerHandValue.classList.remove("hidden");
        dealerHandValue.innerText = String(dealerHandValueNumber);
        await new Promise((resolve) => setTimeout(resolve, 400));
}
async function renderAllPlayerCards(playerHandArr: Card[]){
    let previousCardCount: number = 0;
    let playerHandValueNumber: number = 0; 
    while(true){
        if(playerHandArr.length>previousCardCount){
            for(let i = previousCardCount; i<playerHandArr.length; i++){
                let src: string = "./assets/cards/" + playerHandArr[i].rank + playerHandArr[i].suit + ".png";
                renderCard(src, "player");
                playerHandValueNumber = playerHandValueNumber + playerHandArr[i].value;
            }
            previousCardCount = playerHandArr.length;
            playerHandValue.classList.remove("hidden");
            playerHandValue.innerText = String(playerHandValueNumber);
            if(playerHandValueNumber>21){
                losthand()
            }
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
}
async function checkPlayerHand(){
    const playerValue = Number(playerHandValue.innerText);
    const dealerValue = dealerHandValueNumber;

    // Draw
    if (playerValue === dealerValue) {
        drawhand();
        return;
    }

    // Player lost
    if (playerValue > 21) {
        losthand();
        return;
    }

    if (playerValue <= 21 && dealerValue <= 21 && playerValue < dealerValue) {
        losthand();
        return;
    }

    // Player wins
    if (playerValue <= 21 && playerValue > dealerValue) {
        wonhand();
        return;
    }

    if (playerValue <= 21 && dealerValue > 21) {
        wonhand();
        return;
    }
};


function buttonShowingLogic(hand, deck){
    if(betMadeAmount<playerStack){
        actionBtnDouble.classList.toggle("hidden");
    }
    if(Number(playerHandValue.innerText)===21){
        dealDealerHand(hand.dealerHand, hand, deck);
    } else{
        actionBtnHit.classList.toggle("hidden");
        actionBtnStand.classList.toggle("hidden");
    }
}

let hitBtnLogic: () => void;

function hitButton(hand, player, deck){
    actionBtnHit.removeEventListener("click", (hitBtnLogic));
    hitBtnLogic = () =>{
        hand.hit(player, deck);
        const playerHand = hand.playersHands.get(player);
        const lastCard = playerHand[playerHand.length - 1];
        if(lastCard.rank === "A" && (Number(playerHandValue.innerText)>10)){
            lastCard.value = 1;
        }
    }
    if(actionBtnHit){
    actionBtnHit.addEventListener("click", (hitBtnLogic))
    }
}

let doubleBtnLogic: () => void;

function doubleButton(hand, player, deck){
    actionBtnDouble.removeEventListener("click", (doubleBtnLogic));
    doubleBtnLogic = async () =>{
        playerStack = playerStack - betMadeAmount;
        betMadeAmount = betMadeAmount*2;
        hand.hit(player, deck);
        betValueLabel.innerText = formatAsCurrency(betMadeAmount);
        stackSpan.innerText = formatAsCurrency(playerStack);

        const playerHand = hand.playersHands.get(player);
        let playerHandValueNumber = 0;
        for(let i = 0; i<playerHand.length; i++){
            playerHandValueNumber = playerHandValueNumber+playerHand[i].value;
        }

        if(playerHandValueNumber>21){
            losthand();
            return;
        }
        
        actionBtnLogic();
    }
    if(actionBtnDouble){
        actionBtnDouble.addEventListener("click", (doubleBtnLogic));
        }
}

let actionBtnLogic: () => void;

function standButton(hand, deck){
    actionBtnStand.removeEventListener("click", (actionBtnLogic));
    actionBtnLogic = () =>{
        actionBtnHit.classList.add("hidden");
        actionBtnStand.classList.add("hidden");
        actionBtnDouble.classList.add("hidden");
        actionBtnSplit.classList.add("hidden");
        dealDealerHand(hand.dealerHand, hand, deck);
    }
    if(actionBtnStand){
        actionBtnStand.addEventListener("click", (actionBtnLogic))
    }
}

function dealDealerHand(dealerHandArr: Card[], hand, deck){
    const dealerCardsSlot: HTMLElement = document.getElementById("dealer-card-slots");
    dealerCardsSlot.removeChild(dealerCardsSlot.firstElementChild);
    dealerCardsSlot.removeChild(dealerCardsSlot.firstElementChild);
    let backSuitCardSrc: string = "./assets/cards/" + dealerHandArr[0].rank + dealerHandArr[0].suit + ".png";;
    const backsuitCard: HTMLImageElement = document.createElement("img");
    backsuitCard.src = backSuitCardSrc;
    dealerCardsSlot.prepend(backsuitCard);
    dealerHandValueNumber=dealerHandArr[0].value+dealerHandArr[1].value;

    while(dealerHandValueNumber<17){
        hand.dealerHit(deck);
        const lastCard = dealerHandArr[dealerHandArr.length - 1];
        if(lastCard.rank === "A" && (dealerHandValueNumber)>10){
            lastCard.value = 1;
        }
        dealerHandValueNumber=0;
        for(let i = 0; i<dealerHandArr.length;i++){
            dealerHandValueNumber = dealerHandValueNumber + dealerHandArr[i].value;
        }
    }
    renderAllDealerCards(dealerHandArr);
    checkPlayerHand();
}


async function startGame(startingStackAmount: number){
    loadBlackjackDesign();
    allowBetPlacing();
    await bettingLogic(startingStackAmount);
    const game = new Game();
    let deck = new Deck();
    const player = game.initializePlayers(1, startingStackAmount);
    const hand = new Hand();

    const startNewRound = () =>{
        deck.shuffle();
        hand.start(player, deck);
        dealerHandValueNumber = hand.dealerHand[1].value;
        renderCard();
        renderAllDealerCards(hand.dealerHand);
        renderAllPlayerCards(hand.playersHands.get(player[0]));
    }
    newHandBtn.addEventListener("click", ()=>{
        hand.playersHands.clear();
        hand.dealerHand = [];
        deck = new Deck();
        resetTable();

        allowBetPlacing();
    })
    while(true){
    if(betMade){
        startNewRound();
        hitButton(hand, player[0], deck);
        doubleButton(hand, player[0], deck);
        standButton(hand, deck);
        buttonShowingLogic(hand, deck);
        betMade = false;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
    }
}



export function blackjackSingleLogic(){
if(continueButton){
    continueButton.addEventListener("click", ()=>{
        const startingStackElement = document.getElementById("bjSelect-stackValue") as HTMLSelectElement;
        const startingStackAmount: number = Number(startingStackElement.value);
        if(playersSelect.value==="1"){
            const stackSpan: HTMLSpanElement = document.getElementById("playerName-namebox-stack");
            stackSpan.innerText = formatAsCurrency(startingStackAmount);
            startGame(startingStackAmount);
        }
    })
}
}
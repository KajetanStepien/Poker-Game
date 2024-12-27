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
let betValue: number;
let betMadeAmount: number;
let playerStack: number;
let playerStackk: number;
let betMade: boolean;

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
                console.log(betMadeAmount);
                console.log(playerStack);
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
    blackjacktable.classList.remove("hidden");
}

function allowBetPlacing(){
    betButtonElement.classList.toggle("hidden");
}

function renderDealerCard(src: string = "./assets/cards/bicycle_blue.png"){
    const dealerCardsSlot: HTMLElement = document.getElementById("dealer-card-slots");
    let backSuitCardSrc: string = src;
    const backsuitCard: HTMLImageElement = document.createElement("img");
    backsuitCard.src = backSuitCardSrc;
    dealerCardsSlot.prepend(backsuitCard);
}
async function renderAllDealerCards(dealerHandArr: Card[]){
    let firstSrc: string = "./assets/cards/" + dealerHandArr[1].rank + dealerHandArr[1].suit + ".png";
    renderDealerCard(firstSrc);
    let previousCardCount = 2;
    while(true){
        if(dealerHandArr.length>previousCardCount){
            for(let i = previousCardCount; i<dealerHandArr.length; i++){
                let src: string = "./assets/cards/" + dealerHandArr[i].rank + dealerHandArr[i].suit + ".png";
                renderDealerCard(src);
            }
            previousCardCount = dealerHandArr.length;
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
}

async function startGame(startingStackAmount: number){
    loadBlackjackDesign();
    allowBetPlacing();
    await bettingLogic(startingStackAmount);

    const game = new Game();
    const deck = new Deck();
    const player = game.initializePlayers(1, startingStackAmount);
    const hand = new Hand();

    if(betMade){
        deck.shuffle();
        hand.start(player, deck);
        renderDealerCard();
        renderAllDealerCards(hand.dealerHand);
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
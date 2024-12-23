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
let betValue: number;

function formatAsCurrency(amount: number, vaultStyle: keyof Intl.NumberFormatOptionsStyleRegistry = "currency",  currency: string = "USD", locale: string = "en-US"): string{
    return new Intl.NumberFormat(locale, {
        style: vaultStyle,
        currency: currency,
        maximumFractionDigits: 0,
    }).format(amount);
}

function bettingLogic(stackValue: number){
    if(betButtonElement){
        let isBetting: boolean = false;
        betButtonElement.addEventListener("click", ()=>{
            bettingPanelElement.classList.toggle("hidden");
            betButtonElement.classList.toggle("betBtn-confirm");
            betButtonElement.innerText="CONFIRM";
            isBetting = !isBetting;
            if(isBetting){
                let playerStack: number = stackValue;
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
                console.log(betValue);
                valueSpan.innerText="0.00";
                rangeBetInput.value = "0";
                betButtonElement.innerText="BET";
                betValue = 0;
            }
        })
    }
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

export function blackjackSingleLogic(){
if(continueButton){
    continueButton.addEventListener("click", ()=>{
        const startingStackElement = document.getElementById("bjSelect-stackValue") as HTMLSelectElement;
        const startingStackAmount: number = Number(startingStackElement.value);
        if(playersSelect.value==="1"){
            allowBetPlacing();
            loadBlackjackDesign();
            bettingLogic(startingStackAmount);
            const stackSpan: HTMLSpanElement = document.getElementById("playerName-namebox-stack");
            stackSpan.innerText = formatAsCurrency(startingStackAmount);
        }
    })
}
}
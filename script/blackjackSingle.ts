
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
            isBetting = !isBetting;
            if(isBetting){
                allinBtn.addEventListener("click", ()=>{
                    let playerStack: number = stackValue;
                    valueSpan.innerText = formatAsCurrency(playerStack, "decimal");
                    })
                halfBtn.addEventListener("click", ()=>{
                    let playerStack: number = stackValue;
                    valueSpan.innerText = formatAsCurrency(playerStack/2, "decimal");
                    })
                thirdBtn.addEventListener("click", ()=>{
                    let playerStack: number = stackValue;
                    valueSpan.innerText = formatAsCurrency(playerStack/3, "decimal");
                    })
                quarterBtn.addEventListener("click", ()=>{
                    let playerStack: number = stackValue;
                    valueSpan.innerText = formatAsCurrency(playerStack/4, "decimal");
                    })
            } else{
                valueSpan.innerText="0.00";
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

export function blackjackSingleLogic(){
if(continueButton){
    continueButton.addEventListener("click", ()=>{
        const startingStackElement = document.getElementById("bjSelect-stackValue") as HTMLSelectElement;
        const startingStackAmount: number = Number(startingStackElement.value);
        if(playersSelect.value==="1"){
            loadBlackjackDesign();
            bettingLogic(startingStackAmount);
            const stackSpan: HTMLSpanElement = document.getElementById("playerName-namebox-stack");
            stackSpan.innerText = formatAsCurrency(startingStackAmount);
        }
    })
}
}
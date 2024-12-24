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
let betValue;
let betMadeAmount;
let playerStack;
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
    if (betButtonElement) {
        let isBetting = false;
        betButtonElement.addEventListener("click", () => {
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
                }
            }
            else {
                console.log("YOU LOST");
            }
        });
    }
}
function loadBlackjackDesign() {
    bjSettings.classList.add("hidden");
    const bodyElement = document.querySelector("body");
    bodyElement.classList.add("blackjackSingle");
    blackjacktable.classList.remove("hidden");
}
function allowBetPlacing() {
    betButtonElement.classList.toggle("hidden");
}
export function blackjackSingleLogic() {
    if (continueButton) {
        continueButton.addEventListener("click", () => {
            const startingStackElement = document.getElementById("bjSelect-stackValue");
            const startingStackAmount = Number(startingStackElement.value);
            if (playersSelect.value === "1") {
                allowBetPlacing();
                loadBlackjackDesign();
                bettingLogic(startingStackAmount);
                const stackSpan = document.getElementById("playerName-namebox-stack");
                stackSpan.innerText = formatAsCurrency(startingStackAmount);
            }
        });
    }
}

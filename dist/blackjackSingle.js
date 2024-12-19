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
function formatAsCurrency(amount, vaultStyle = "currency", currency = "USD", locale = "en-US") {
    return new Intl.NumberFormat(locale, {
        style: vaultStyle,
        currency: currency,
        maximumFractionDigits: 0,
    }).format(amount);
}
function bettingLogic(stackValue) {
    if (betButtonElement) {
        let isBetting = false;
        betButtonElement.addEventListener("click", () => {
            bettingPanelElement.classList.toggle("hidden");
            isBetting = !isBetting;
            if (isBetting) {
                allinBtn.addEventListener("click", () => {
                    let playerStack = stackValue;
                    valueSpan.innerText = formatAsCurrency(playerStack, "decimal");
                });
                halfBtn.addEventListener("click", () => {
                    let playerStack = stackValue;
                    valueSpan.innerText = formatAsCurrency(playerStack / 2, "decimal");
                });
                thirdBtn.addEventListener("click", () => {
                    let playerStack = stackValue;
                    valueSpan.innerText = formatAsCurrency(playerStack / 3, "decimal");
                });
                quarterBtn.addEventListener("click", () => {
                    let playerStack = stackValue;
                    valueSpan.innerText = formatAsCurrency(playerStack / 4, "decimal");
                });
            }
            else {
                valueSpan.innerText = "0.00";
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
export function blackjackSingleLogic() {
    if (continueButton) {
        continueButton.addEventListener("click", () => {
            const startingStackElement = document.getElementById("bjSelect-stackValue");
            const startingStackAmount = Number(startingStackElement.value);
            if (playersSelect.value === "1") {
                loadBlackjackDesign();
                bettingLogic(startingStackAmount);
                const stackSpan = document.getElementById("playerName-namebox-stack");
                stackSpan.innerText = formatAsCurrency(startingStackAmount);
            }
        });
    }
}

const continueButton = document.getElementById("bjContinue-btn");
const playersSelect = document.getElementById("bjSelect-players");
const bjSettings = document.getElementById("bj-menu");
const blackjacktable = document.getElementById("blackjackgame-table-container");
const betButtonElement = document.getElementById("bet-button");
const bettingPanelElement = document.getElementById("betting-panel");
function bettingLogic() {
    if (betButtonElement) {
        let isBetting = false;
        betButtonElement.addEventListener("click", () => {
            bettingPanelElement.classList.toggle("hidden");
            isBetting = !isBetting;
            if (isBetting) {
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
                bettingLogic();
                const stackSpan = document.getElementById("playerName-namebox-stack");
                stackSpan.innerText = new Intl.NumberFormat('en-US', {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0
                }).format(startingStackAmount);
            }
        });
    }
}

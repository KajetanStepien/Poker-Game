const continueButton = document.getElementById("bjContinue-btn");
const playersSelect = document.getElementById("bjSelect-players");
const bjSettings = document.getElementById("bj-menu");
const blackjacktable = document.getElementById("blackjackgame-table-container");
const betButtonElement = document.getElementById("bet-button");
const bettingPanelElement = document.getElementById("betting-panel");
function bettingLogic() {
    if (betButtonElement) {
        betButtonElement.addEventListener("click", () => {
            bettingPanelElement.classList.toggle("hidden");
        });
    }
}
function loadBlackjackDesign() {
    bjSettings.classList.add("hidden");
    const bodyElement = document.querySelector("body");
    bodyElement.classList.add("blackjackSingle");
    blackjacktable.classList.remove("hidden");
}
function blackjackStart() {
}
export function blackjackSingleLogic() {
    if (continueButton) {
        continueButton.addEventListener("click", () => {
            if (playersSelect.value === "1") {
                loadBlackjackDesign();
                bettingLogic();
            }
        });
    }
}

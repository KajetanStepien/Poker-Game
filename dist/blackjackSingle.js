const continueButton = document.getElementById("bjContinue-btn");
const playersSelect = document.getElementById("bjSelect-players");
const bjSettings = document.getElementById("bj-menu");
function loadBlackjackDesign() {
    bjSettings.classList.add("hidden");
    const bodyElement = document.querySelector("body");
    bodyElement.classList.add("blackjackSingle");
}
function blackjackStart() {
}
export function blackjackSingleLogic() {
    if (continueButton) {
        continueButton.addEventListener("click", () => {
            if (playersSelect.value === "1") {
                loadBlackjackDesign();
            }
        });
    }
}

const bjOption = document.getElementById("bj-btn");
const texasOption = document.getElementById("texas-btn");
const bjMenu = document.getElementById("bj-menu");
const texasMenu = document.getElementById("texas-menu");
export function hideOptions(menuToShow) {
    bjOption.classList.add("hidden");
    texasOption.classList.add("hidden");
    menuToShow.classList.remove("hidden");
}
export function showOptions(menuToHide) {
    bjOption.classList.remove("hidden");
    texasOption.classList.remove("hidden");
    menuToHide.classList.add("hidden");
}
function backBtnLogic(buttonElementName) {
    const backBtn = document.getElementById(buttonElementName);
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            if (buttonElementName === "bjExit-btn") {
                showOptions(bjMenu);
            }
            if (buttonElementName === "texasExit-btn") {
                showOptions(texasMenu);
            }
        });
    }
}
function injectSelectOptions(type, lvlAmount, selectId) {
    function createSelectOptions(step, postfix) {
        const selectElement = document.querySelector(selectId);
        selectElement.innerHTML = "";
        let stepLvl = step;
        for (let i = 0; i < lvlAmount; i++) {
            const newOption = document.createElement("option");
            selectElement.appendChild(newOption);
            newOption.innerHTML = "" + stepLvl + postfix;
            stepLvl = stepLvl + step;
        }
    }
    if (type === "players") {
        createSelectOptions(1, "");
    }
    if (type === "blindsValue") {
        createSelectOptions(50, "");
    }
    if (type === "stackValue") {
        createSelectOptions(20, " BB");
    }
    if (type === "levelDuration") {
        createSelectOptions(15, " mins");
    }
}
export function landingMenuLogic() {
    if (bjOption) { //handling blackjack game choice (if exist)
        bjOption.addEventListener("click", () => {
            hideOptions(bjMenu);
            backBtnLogic("bjExit-btn");
            injectSelectOptions("players", 4, "#bjSelect-players");
            injectSelectOptions("stackValue", 8, "#bjSelect-stackValue");
        });
    }
    else {
        console.log("Element bj-btn does not exist.");
    }
    if (texasOption) { //handling poker game choice (if exist)
        texasOption.addEventListener("click", () => {
            hideOptions(texasMenu);
            backBtnLogic("texasExit-btn");
            injectSelectOptions("players", 5, "#texasSelect-players");
            injectSelectOptions("blindsValue", 5, "#texasSelect-blindValue");
            injectSelectOptions("stackValue", 8, "#texasSelect-stackValue");
            injectSelectOptions("levelDuration", 4, "#texasSelect-blindLevel");
        });
    }
    else {
        console.log("Element texas-btn does not exist.");
    }
}

const bjOption = document.getElementById("bj-btn");
const texasOption = document.getElementById("texas-btn");
const bjMenu = document.getElementById("bj-menu");
const texasMenu = document.getElementById("texas-menu");
function hideOptions(menuToShow) {
    bjOption.classList.add("hidden");
    texasOption.classList.add("hidden");
    menuToShow.classList.remove("hidden");
}
function showOptions(menuToHide) {
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
if (bjOption) {
    bjOption.addEventListener("click", () => {
        hideOptions(bjMenu);
        backBtnLogic("bjExit-btn");
    });
}
else {
    console.log("Element bj-btn does not exist.");
}
if (texasOption) {
    texasOption.addEventListener("click", () => {
        hideOptions(texasMenu);
        backBtnLogic("texasExit-btn");
    });
}
else {
    console.log("Element texas-btn does not exist.");
}

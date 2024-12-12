const bjOption: HTMLElement | null = document.getElementById("bj-btn");
const texasOption: HTMLElement | null = document.getElementById("texas-btn");
const bjMenu: HTMLElement | null = document.getElementById("bj-menu");
const texasMenu: HTMLElement | null = document.getElementById("texas-menu");

function hideOptions(menuToShow: HTMLElement) :void {
    bjOption.classList.add("hidden");
    texasOption.classList.add("hidden");
    menuToShow.classList.remove("hidden");
}
function showOptions(menuToHide: HTMLElement) :void {
    bjOption.classList.remove("hidden");
    texasOption.classList.remove("hidden");
    menuToHide.classList.add("hidden");
}

if(bjOption){
    bjOption.addEventListener("click", () => {
        hideOptions(bjMenu);
        const backBtn = document.getElementById("bjExit-btn") as HTMLButtonElement;
        if(backBtn){
            backBtn.addEventListener("click", () => {
                showOptions(bjMenu);
            })
        }
    })
}else{
    console.log("Element bj-btn does not exist.");
}

if(texasOption){
    texasOption.addEventListener("click", () => {
        hideOptions(texasMenu);
        const backBtn = document.getElementById("texasExit-btn") as HTMLButtonElement;
        if(backBtn){
            backBtn.addEventListener("click", () => {
                showOptions(texasMenu);
            })
        }
    })
}else{
    console.log("Element texas-btn does not exist.");
}
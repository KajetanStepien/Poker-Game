const bjOption: HTMLElement | null = document.getElementById("bj-btn");
const texasOption: HTMLElement | null = document.getElementById("texas-btn");
const bjMenu: HTMLElement | null = document.getElementById("bj-menu");
const texasMenu: HTMLElement | null = document.getElementById("texas-menu");

function hideOptions(menuToShow: HTMLElement) :void { //hiding landing page, showing game settings
    bjOption.classList.add("hidden");
    texasOption.classList.add("hidden");
    menuToShow.classList.remove("hidden");
}
function showOptions(menuToHide: HTMLElement) :void { //showing landing page, hiding game settings
    bjOption.classList.remove("hidden");
    texasOption.classList.remove("hidden");
    menuToHide.classList.add("hidden");
}    
function backBtnLogic(buttonElementName: string) :void { //exit buttons logic
    const backBtn = document.getElementById(buttonElementName) as HTMLButtonElement;
        if(backBtn){
            backBtn.addEventListener("click", () => {
                if(buttonElementName==="bjExit-btn"){
                showOptions(bjMenu);
            }
                if(buttonElementName==="texasExit-btn"){
                    showOptions(texasMenu);
                }
            })
        }
}


if(bjOption){
    bjOption.addEventListener("click", () => {
        hideOptions(bjMenu);
        backBtnLogic("bjExit-btn");
    })
}else{
    console.log("Element bj-btn does not exist.");
}

if(texasOption){
    texasOption.addEventListener("click", () => {
        hideOptions(texasMenu);
        backBtnLogic("texasExit-btn");
    })
}else{
    console.log("Element texas-btn does not exist.");
}
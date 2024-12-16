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
function injectSelectOptions(type: string, lvlAmount: number, selectId: string) :void{ //rendering select options
    function createSelectOptions(step: number, postfix: string){ //local function -> creating options for select elements 
        const selectElement: HTMLElement = document.querySelector(selectId)
            selectElement.innerHTML="";
            let stepLvl: number = step;
            for(let i = 0; i < lvlAmount; i++){
                const newOption: HTMLElement = document.createElement("option");
                selectElement.appendChild(newOption);
                newOption.innerHTML = ""+stepLvl+postfix;
                stepLvl=stepLvl+step;
            }
    }
    if(type==="players"){
        createSelectOptions(1, "");
    }
    if(type==="blindsValue"){
        createSelectOptions(50, "");
    }
    if(type==="stackValue"){
        createSelectOptions(20, " BB");
    }
    if(type==="levelDuration"){
        createSelectOptions(15, " mins");
    }
}

export function landingMenuLogic(){
if(bjOption){ //handling blackjack game choice (if exist)
    bjOption.addEventListener("click", () => {
        hideOptions(bjMenu);
        backBtnLogic("bjExit-btn");
        injectSelectOptions("players", 4, "#bjSelect-players");
        injectSelectOptions("stackValue", 8, "#bjSelect-stackValue");
    })
}else{
    console.log("Element bj-btn does not exist.");
}

if(texasOption){ //handling poker game choice (if exist)
    texasOption.addEventListener("click", () => {
        hideOptions(texasMenu);
        backBtnLogic("texasExit-btn");
        injectSelectOptions("players", 5, "#texasSelect-players");
        injectSelectOptions("blindsValue", 5, "#texasSelect-blindValue");
        injectSelectOptions("stackValue", 8, "#texasSelect-stackValue");
        injectSelectOptions("levelDuration", 4, "#texasSelect-blindLevel");
    })
}else{
    console.log("Element texas-btn does not exist.");
}
}
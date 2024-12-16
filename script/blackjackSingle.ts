
const continueButton = document.getElementById("bjContinue-btn") as HTMLButtonElement;
const playersSelect = document.getElementById("bjSelect-players") as HTMLSelectElement;
const bjSettings = document.getElementById("bj-menu");


function loadBlackjackDesign(){
    bjSettings.classList.add("hidden");
    const bodyElement: HTMLElement = document.querySelector("body");
    bodyElement.classList.add("blackjackSingle");
    
}
function blackjackStart(){

}

export function blackjackSingleLogic(){
if(continueButton){
    continueButton.addEventListener("click", ()=>{
        if(playersSelect.value==="1"){
            loadBlackjackDesign();
        }
    })
}
}
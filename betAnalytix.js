export function betAnalytix() {
    const url_string = window.location.href;
    const url = new URL(url_string);

    if (url.searchParams?.get("name")) {
        return addBet(url);
    }
    
    // Add button to attribute bankroll
    if (url.pathname.includes("/gestion/")) {
        addButton();
    } else {
        listenNavbar();
    }
}

function addButton() {
    let initTitle = setInterval(getTitle, 1000);
        
    function getTitle(){
        const title = document.querySelectorAll(".button-action");
        if (title.length > 0) {
            clearInterval(initTitle);
            if(!checkButton()) {
                const buttonToBet = createbutton();
                buttonToBet.addEventListener("click", Portfolio);
                title[0].parentNode.insertBefore(buttonToBet, title[0]);
            }
        } 
    }
}

function listenNavbar(){
    const body = document.querySelector("#q-app");
    //listen body change
    body.addEventListener("DOMSubtreeModified", (e)=>{
        if (getNavbar()) {
            return betAnalytix();
        }
    }
    )
};

function addBet(url) {
    const name = url.searchParams?.get("name");
    const odd = url.searchParams?.get("odd");
    const bet = url.searchParams?.get("bet");
    const result = url.searchParams?.get("result");
    const pick = url.searchParams?.get("pick");

    let init = name ? setInterval(() => {
        const flexboxes = document.querySelector("div.rounded-lg.shadow-lg.bg-white.mb-4.p-5.flex.flex-1.items-center.overflow-hidden.cursor-pointer");
        if (flexboxes) {
            clearInterval(init);
            flexboxes.click();
            setTimeout(() => {getForm(name, odd, bet, pick, result)}, 1000);
        }   
    }, 500) : null;
}

function getForm(name, odd, bet, pick, result) {
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll('input');
    const selects = form.querySelectorAll('select');

    let selectBookmaker = selects[1];
    selectBookmaker.value = "132";
    selectBookmaker.dispatchEvent(new Event('change'));

    let selectSport = selects[2];
    selectSport.value = "21";
    selectSport.dispatchEvent(new Event('change'));

    let selectName = inputs[1];
    selectName.value = `${name} | ${result} | Pick : ${pick}`;
    selectName.dispatchEvent(new Event('input'));

    let selectOdd = inputs[2];
    selectOdd.value = odd;
    selectOdd.dispatchEvent(new Event('input'));

    let selectBet = inputs[3];
    selectBet.value = bet;
    selectBet.dispatchEvent(new Event('input'));

    setTimeout(()=>{
        const button = form.querySelector("button");
        button.click();
    }, 1000);
}
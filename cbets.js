window.onload = () => {
    intersection();
} 

const intersection = () => {
    const path = window.location.hostname;
    if (path === "app.bet-analytix.com") {
         return betAnalytix();
    } else {
        return cbet();
    }
}

function cbet() {
    let init = setInterval(getIframe, 1000);

    getPortfolio();
    checkPortfolio();
    amountToBet();
    
    function getIframe(){
        let iframe = document.getElementsByTagName("iframe")[0];
        iframe = iframe.contentWindow.document;
        let historyButton = iframe.querySelector(".bet-history");
        if (historyButton) {
            clearInterval(init);
            historyButton.addEventListener("click", ()=>{
                let title = iframe.querySelector(".popup-title");
                let span = title.querySelector("span");
                let button = document.createElement("button");
                button.innerHTML = "Bet to Bet-Analytix";
                button.style.marginLeft = "10px";
                button.className = "btn";
                span.appendChild(button);
                button.addEventListener("click", () => {
                    const betList = iframe.querySelector(".bet-info");
                    const betInfo = betList.querySelectorAll("td");
                    const betBet = betList.querySelectorAll("li");
                    let name = betList.querySelector(".dotted-hidden.name").textContent;
                    name = name.replaceAll("  ", " ");
                    const odd = betInfo[4].textContent;
                    let bet = betBet[0].textContent;
                    bet = bet.split(" ")[1];
                    const oddInfo = betInfo[3].querySelectorAll("div");
                    const oddResult = oddInfo[0].innerText;
                    const oddPick = oddInfo[1].querySelectorAll("span")[1].innerText;
                    console.log(oddResult, oddPick);
                    const url = `https://app.bet-analytix.com/addbet/2?name=${name}&odd=${odd}&bet=${bet}&result=${oddResult}&pick=${oddPick}`;
                    window.open(url);
                })
            })
        }
    }

}

function checkPortfolio() {
    chrome.storage.local.get(["portfolioHandler"], (result) => {
        if (!result?.portfolioHandler) {
            if (window.confirm(`Nous n'avons pas trouvé de bankroll associé à votre compte Cbet, voulez-vous rendre sur Bet-Analytix.com pour en ajouter un ?`)){
                window.location.href = "https://app.bet-analytix.com/bankrolls";
            }
        }
    });
}

function getPortfolio() {
    const urlParam = window.location.href;
    const url = new URL(urlParam);
    const portfolio = url.searchParams?.get("portfolio");
    if (portfolio) {
        chrome.storage.local.set({"portfolioHandler": portfolio}, function() {
            alert("Bankroll ajouté !");
        });
    }
}

function betAnalytix() {
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

function addBet(url) {
    const name = url.searchParams?.get("name");
    const odd = url.searchParams?.get("odd");
    const bet = url.searchParams?.get("bet");
    const result = url.searchParams?.get("result");
    const pick = url.searchParams?.get("pick");

    let init = name ? setInterval(clickForm, 500) : null;

    function clickForm() {
        const flexboxes = document.querySelector("div.rounded-lg.shadow-lg.bg-white.mb-4.p-5.flex.flex-1.items-center.overflow-hidden.cursor-pointer");
        if (flexboxes) {
            clearInterval(init);
            flexboxes.click();
            setTimeout(() => {getForm(name, odd, bet)}, 1000);
        }   
    }

    function getForm(name, odd, bet) {
        const form = document.querySelector("form");
        const inputs = form.querySelectorAll('input');
        const selects = form.querySelectorAll('select');
        console.log(selects);
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

function Portfolio(){
    const pathname = window.location.pathname;
    const portfolio = pathname.split("/gestion/");
    saveInCbet(portfolio[1]);
}

function saveInCbet(portfolio_id) {
    window.location.href = (`https://cbet4.gg/en/sportsbook/esports?portfolio=${portfolio_id}`);
}

function createbutton(){
    const button2 = document.createElement("button");
    button2.innerHTML = "Choisir cette bankroll pour Cbet";
    button2.className = "button-action";
    button2.style.marginRight = "10px";
    button2.style.background = "#08ffc4"
    button2.style.color = "black";
    button2.id = "button-to-bankroll";
    return button2;
};


function amountToBet() {
    const amount = getBalance();
    const userInfo = document.querySelector(".user-info ul");
    if (userInfo) {
        let li = document.createElement("li");
        li.classList.add("username");
        li.style.color = "white";
        li.innerHTML = `<span>Bet : </span><span class="amount">${(amount * 0.05).toFixed(2)}</span>`;
        userInfo.insertBefore(li, userInfo.firstChild);
        return li;
    }
}

function getBalance() {
    const balance = document.querySelector(".balance .amount");
    if (balance) {
        const balanceAmount = parseFloat(balance.textContent);
        return balanceAmount;
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

function getNavbar(){
    const buttons = document.querySelectorAll(".button-action");
    if (buttons.length > 0) {
        for (const button of buttons) {
            if (button.innerText.includes("Ajouter pari")) {
                return true;
            }
        }
    }
    return false;
}

function checkButton() {
    const button = document.querySelector("#button-to-bankroll");
    if (button) {
        return true;
    }
    return false;
}

// module.exports = {intersection, getBalance, amountToBet, createbutton, saveInCbet};
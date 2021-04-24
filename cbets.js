window.onload = () => {
    const path = window.location.hostname;
    if (path === "app.bet-analytix.com") {
        betAnalytix();
    } else {
        cbet();
    }
}

function cbet() {
    let init = setInterval(getIframe, 1000);
    
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
                    const url = `https://app.bet-analytix.com/addbet/2?name=${name}&odd=${odd}&bet=${bet}`;
                    window.open(url);
                })
            })
        }
    }
}

function betAnalytix() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const name = url.searchParams?.get("name");
    const odd = url.searchParams?.get("odd");
    const bet = url.searchParams?.get("bet");

    let init = setInterval(clickForm, 500);

    function clickForm() {
        console.log("dans la boucle");
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
        selectName.value = name;
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
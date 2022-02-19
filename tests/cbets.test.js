/**
 * @jest-environment jsdom
 */
const {intersection, createbutton, saveInCbet} = require('../cbets');


describe('Cbet.js', ()=>{
    test('Point d\'entrée de l\'extension', ()=>{
        expect(intersection).toBeDefined();
    });
    test('create Button', ()=>{
        const button = createbutton();
        expect(button).toContainHTML(
            `<button class="button-action" style="margin-right: 10px; background: rgb(8, 255, 196); color: black;">Choisir cette bankroll pour Cbet</button>`);
    });
    test('saveInCbet is called', ()=>{
        expect(saveInCbet).toBeDefined();
    })
    test('getform', ()=>{
        document.body.innerHTML = `
        <ul>
            <li class="balance multi">
                <span text_key="SIGNUP_AFTER_LOGIN__BALANCE~: ">Balance : </span>
                <img src="/assets/images/eye_hidden.png" class="lock">
                <span class="amount">31.03</span>
                <span class="currency-str">EUR</span>
                <span class="material-icons refresh-balance">refresh</span>
                <span class="material-icons arrow">keyboard_arrow_down</span>
                <ul class="wallets">
                    <li cid="342">
                        <span>48439316.09187343</span>
                        <span>CBET</span>
                    </li>
                </ul>
            </li>
        </ul>
        `
        const {getBalance} = require('../cbets');
        const amount = getBalance();
        expect(amount).toBe(31.03);
    })
    test('amountToBet', ()=>{
        document.body.innerHTML = `
        <div class="user-info" style="display: block;">
            <ul>
                <li class="username">
                    <span text_key="SIGNUP_AFTER_LOGIN__WELCOME">Welcome</span>
                    <a href="/en/account/personalinfo" title="falk0r">falk0r</a>
                </li>
                <li class="balance multi">
                    <span text_key="SIGNUP_AFTER_LOGIN__BALANCE~: ">Balance : </span>
                    <img src="/assets/images/eye_hidden.png" class="lock">
                    <span class="amount">35.56</span>
                    <span class="currency-str">EUR</span>
                    <span class="material-icons refresh-balance">refresh</span>
                    <span class="material-icons arrow">keyboard_arrow_down</span
                    <ul class="wallets">
                        <li cid="342">
                            <span>48439316.09187343</span>
                            <span>CBET</span>
                        </li>
                    </ul>
                </li>
                <li>
                    <a class="btn green deposit" href="/en/account/deposit" text_key="SIGNUP_AFTER_LOGIN__DEPOSIT">DEPOSIT</a>
                </li>
            </ul>
        </div>`;
        const {amountToBet} = require('../cbets');
        const li = amountToBet();
        expect(li).toContainHTML(`<li class="username" style="color: white;"><span>Bet : </span><span class="amount">1.78</span></li>`); 
    })
});
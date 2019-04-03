
import './styles.css';
import { ready } from './utils';

let billamt = 0;

ready(() => {
    init();

});

const tipAmtStored = 'tipAmtStored';
let tipStoredItems = localStorage.getItem(tipAmtStored) ? JSON.parse(localStorage.getItem(tipAmtStored)) : [];

function savedTip() {
    let tipStoredItems = localStorage.getItem(tipAmtStored) ? JSON.parse(localStorage.getItem(tipAmtStored)) : [];
    return (tipStoredItems.length > 0) ? parseInt(tipStoredItems[0]) : 0;
}

function init() {
    let savedTipId = (tipStoredItems.length > 0) ? tipStoredItems[1] : "";
    let billInput = document.querySelector("#billInput");

    document.querySelectorAll(".btn-tip").forEach((aButton) => {
        if(aButton.id.substr(0,3) ==='tip'){
            aButton.addEventListener('click', processTipPercent);
            if(aButton.id === savedTipId){
                alert("Your last tip was " + savedTip() + "%");
            }
        }       
    });

    billInput.addEventListener('input', validateInput);
    billInput.addEventListener('input', updateOutput);
    billInput.addEventListener('keydown', notAllowE);

    document.querySelectorAll('.form-check-input').forEach((anInput) => {
        anInput.addEventListener('input', updateOutput);
    })
    updateOutput();
}

function processTipPercent(e: any) {
    storeTipPercent(parseInt(e.srcElement.value), e.srcElement.id);
   enableTipButtons();
   e.srcElement.disabled = true;
    
    updateOutput();
}

function storeTipPercent(value: any, id: any) {
   localStorage.setItem(tipAmtStored, JSON.stringify([value,id]));
}

function enableTipButtons() {
    document.querySelectorAll('.btn-tip').forEach((aButton) => {
        if(aButton.id.substr(0,3) ==='tip'){
           (aButton as HTMLButtonElement).disabled = false;
        };
    });    
}

function processBillAmount() {
    let input = (<HTMLInputElement>document.getElementById("amtinput"));

    if(input.valueAsNumber < 0){
        billamt = 0;
        input.classList.add('error');  
    } 
    else {
        if(input.value =="") {
            billamt = 0;
        } else { 
            billamt = input.valueAsNumber;
        };
        input.classList.remove('error');
    }
}

function validateInput(e: any) {
    let value = e.srcElement.value;
    let constraints = ['^(?:[0-9]*(?:\.[0-9]{1,2})?|(?:[0-9]+\.))$', 'Value must be in a valid currency form.']
    let constraint = new RegExp(constraints[0], "");

    if (value == "" || constraint.test(value)) {
        e.srcElement.setCustomValidity("");
    }
    else {
        e.srcElement.setCustomValidity(constraints[1]);
    } 
}

export function notAllowE(e: any) {
    if(e.key === 'e' || e.key === 'E'){e.returnValue = false};
}


function updateOutput() {
    processBillAmount();
    let tipPercent = savedTip();
    let tipAmount = billamt * tipPercent / 100;
    let totalAmount = billamt + tipAmount;

    document.getElementById("tipPercent").innerHTML = `${tipPercent}%`;
    document.getElementById("billAmount").innerHTML = `Bill Amount: $${billamt}`;  
    document.getElementById("tipPercentAmount").innerHTML = `Tip Percentage: ${tipPercent}%`;
    document.getElementById("tipAmount").innerHTML = `Amount of tip: $${tipAmount}`;

    document.getElementById("totalAmount").innerHTML = `Total to be Paid: $${(totalAmount)}`;
    } 


   
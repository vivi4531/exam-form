"use strict"; 

import {post} from "./form";

let cardholdername = false; 
let cardnumber = false;
let cardexpire = false;
let cardcvc = false;

import payform from "payform"; 
//var payform = require('payform');
console.log(payform);

//Validate card holders name
var inputname = document.getElementById('cardholder_name');
inputname.addEventListener("change", () =>{
    if(inputname.value){
        cardholdername = true; 
        activatePayButton(); 
    } else {
        cardholdername = false; 
    }
    console.log(inputname.value); 
});


// Format input for card number entry
var input = document.getElementById('ccnum');
payform.cardNumberInput(input);

// Validate a credit card number
input.addEventListener("blur", ()=>{
const valid = payform.validateCardNumber(input.value); //=> true
console.log(input.value, valid); 

cardnumber = valid; 
activatePayButton();

// Get card type from number
console.log(payform.parseCardType(input.value)); //=> 'visa'; 
});


//Valider MM/YY
var inputmonth = document.getElementById('month');
var inputyear = document.getElementById('year');

inputyear.addEventListener("blur", ()=>{
const validyear = payform.validateCardExpiry(inputmonth.value, inputyear.value); //=> true

cardexpire = validyear; 
activatePayButton();

console.log(inputmonth.value, inputyear.value, validyear); 
} ); 


//Valider CVC 
var inputccv = document.getElementById('ccv');

inputccv.addEventListener("blur", ()=>{
    const validccv = payform.validateCardCVC(inputccv.value, input.value); //=> true

    cardcvc = validccv; 
    activatePayButton();

    console.log(inputccv.value, input.value, validccv); 
} ); 

function activatePayButton(){

    if(cardholdername && cardnumber && cardexpire && cardcvc){
        document.querySelector(".betalordre").addEventListener("click", post);
    }


}




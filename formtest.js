import payform from "payform"; 
//var payform = require('payform');
console.log(payform);

// Format input for card number entry
var input = document.getElementById('ccnum');
payform.cardNumberInput(input);

input.addEventListener("blur", ()=>{
// Validate a credit card number
const valid = payform.validateCardNumber(input.value); //=> true
console.log(input.value, valid); 

// Get card type from number
console.log(payform.parseCardType(input.value)); //=> 'visa'; 
} )


//Valider MM/YY
var inputmonth = document.getElementById('month');
var inputyear = document.getElementById('year');

inputyear.addEventListener("blur", ()=>{
const validyear = payform.validateCardExpiry(inputmonth.value, inputyear.value); //=> true
console.log(inputmonth.value, inputyear.value, validyear); 
    
} ); 


//CVC 
var inputccv = document.getElementById('ccv');

inputccv.addEventListener("blur", ()=>{
    const validccv = payform.validateCardCVC(inputccv.value, input.value); //=> true
    console.log(inputccv.value, input.value, validccv); 
} ); 






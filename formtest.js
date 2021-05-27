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
var inputexpiry = document.getElementById('expiry');
payform.validateCardExpiry(input); 

inputexpiry.addEventListener("blur", ()=>{
const validexpiry = payform.validateCardExpiry(input.value); //=> true
console.log(input.value, validexpiry); 

} )






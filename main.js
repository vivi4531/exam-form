import "./sass/style.scss";
import "./form.js"; 
import "./cardvalidation.js"; 

//Enable submit button after validation
const form = document.getElementById('orderpayment'); 
form.addEventListener("change", () => {
    document.getElementsById('orderbutton').disabled = !form.checkValidity(); 
}); 
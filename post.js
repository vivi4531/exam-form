"use strict";

//POST ORDER 
export function post(data){
const endpoint = "https://teamellewoods.herokuapp.com/order"; 

// const order = [
//       { name: "Hoppily Ever After", amount: 1 },
//       { name: "Row 26", amount: 2 },
//     ];

fetch(endpoint, {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
}




export function listenForClickOnSubmit(){  
  const form = document.querySelector("form"); 

  // export function sendData(){
  form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const beertype = document.querySelector(".beertype"); 
  const beeramount = document.querySelector(".beeramount"); 
  console.log(e.elements.beertype.value); 
  console.log(beeramount.value); 

  })
}



      //Send id, beer, amount
        // const orderid = ; 
        

        //NOTE
        //Fra Jonas GitHub 
       



      /* const console = getCheckboxValues("console"); 
      const gametype = getCheckboxValues("gametype");
      const gametitle = getCheckboxValues("gametitle");
      const gametod = getCheckboxValues("gametod");
      const gamelevel = getCheckboxValues("gamelevel");
      const improve = getCheckboxValues("improve");
      const interest = getCheckboxValues("interest"); */
  
    //post({

        //FooBar form 
        // orderid; 
        // beertype; 
        // beeramount; 

        // orderid: e.elements.orderid.value, 
        

       /*  tablenumber: form.elements.table.value, 
        cardholdername: form.elements.cardholder_name.value, 
        cardnumber: form.elements.card_number.value, 
        month: form.elements.month.value, 
        year: form.elements.year.value, 
        ccv: form.elements.ccv.value, */ 






   /*    fullname: form.elements.fullname.value, 
      gamertag: form.elements.gamertag.value,
      profile_img: form.elements.profileimage.value, 
      email: form.elements.email.value,
      date_of_birth: form.elements.dob.value, 
      phonenumber: form.elements.phonenumber.value,
      password: form.elements.password.value, 
      console: console, 
      game_type: gametype,
      game_title: gametitle,
      game_level: gamelevel,
      game_hours: form.elements.hours.value,
      game_time_of_day: gametod,
      improve_areas: improve, 
      interested_areas: interest, 
      comment: form.elements.comments.value */
    
    //}); 
    //});}

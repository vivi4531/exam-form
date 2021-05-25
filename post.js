"use strict";

window.addEventListener("DOMContentLoaded", init);

const endpoint = "https://teamellewoods.herokuapp.com/order"; 
//const apiKey = "60740be1f592f7113340f013";
const headers = {
"Content-Type": "application/json; charset=utf-8",
// "x-apikey": apiKey,
"cache-control": "no-cache",
}; 


export function post(data){
    console.log(data); 
    const postData = JSON.stringify(data); 
    fetch(endpoint, {
      method : "POST", 
      headers : headers,
      body: postData,
    })
    .then((res) => res.json())
    .then((data) => console.log(data));  
  }
  
  const form = document.querySelector("form"); 

  export function sendData(){
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  

      //Send id, beer, amount
        const orderid = ; 
        const beertype = ; 
        const beeramount = ; 

        //NOTE
        //Fra Jonas GitHub 
        // const order = [
        //     { name: "Hoppily Ever After", amount: 1 },
        //     { name: "Row 26", amount: 2 },
        //   ];



      /* const console = getCheckboxValues("console"); 
      const gametype = getCheckboxValues("gametype");
      const gametitle = getCheckboxValues("gametitle");
      const gametod = getCheckboxValues("gametod");
      const gamelevel = getCheckboxValues("gamelevel");
      const improve = getCheckboxValues("improve");
      const interest = getCheckboxValues("interest"); */
  
    post({

        //FooBar form 
        orderid; 
        beertype; 
        beeramount; 

        orderid: form.elements.orderid.value, 
        beertype: form.elements.beer.value, 
        beeramount: form.elements.amount.value

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
    
    }); 
    });}
  
  sendData()
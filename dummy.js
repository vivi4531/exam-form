// import "./sass/style.scss";
// import "./form.js"; 
// import "./post.js";
// import "./cardvalidation.js"; 
// import { listenForClickOnSubmit } from "./post.js";
// import "./menu.js"; 

"use strict";

window.addEventListener("DOMContentLoaded", init);

let jsonData; 
let jsonPrices; 
let basket = []; 
let order = [];


function init() {
  console.log("Der er hul igennem 🥳");
  document.querySelector(".buttontobasket").addEventListener("click", buildBasket);
  document.querySelector(".sendordre").addEventListener("click", listenForClickOnSubmit);
  document.querySelector(".betalordre").addEventListener("click", post);
  document.querySelector(".buttontomenu").addEventListener("click", getData);
  
  // getData(); 
}

async function getData() {
  document.querySelector("#beer-menu").classList.remove("hide"); 
  document.querySelector("#frontpage").classList.add("hide");
  document.querySelector("#form-header").classList.remove("hide");

  //document.querySelector("#tilbageknap0").addEventListener("click",() => {document.querySelector("#beer-menu").classList.add("hide"); document.querySelector("#frontpage").classList.remove("hide"); document.querySelector("#form-header").classList.add("hide");});

  let url = "https://teamellewoods.herokuapp.com/beertypes";
 jsonData = await fetch(url);
  jsonData = await jsonData.json();

  let prices = "/prices.json"; 
   jsonPrices = await fetch(prices);
  jsonPrices = await jsonPrices.json();
  console.log({ jsonData });

  let container = document.querySelector("#beer-menu");
  let temp = document.querySelector(".beertemplate");
 
   


  //i = index 
  jsonData.forEach((beer, i) => {
    const clone = temp.cloneNode(true).content;

    //Tilføjer plads i basket array
    basket.push(0); 

    //Input feltet viser id for den valgte øl 
    clone.querySelector("#beer_").id = "beer_" + i;
    clone.querySelector("#beer_" + i).addEventListener("change", updateBasket); 

    clone.querySelector(".beer-image").src = `public/img/beer/${beer.label}`;
    clone.querySelector(".beer-name").textContent = beer.name;
    clone.querySelector(".beer-price").textContent = jsonPrices[i].price + " kr.";
    clone.querySelector(".alc").textContent = beer.alc + "% alc.";

    //Klik på øl og læs mere 
    //clone.querySelector(".template-article").addEventListener("click", () => showDetails(beer, beerName));

    container.appendChild(clone);
  });

  console.log(basket); 

}

function updateBasket(){
    console.log("Update basket");
    //.split = splitter id_x 
    //.pop = kun den sidste værdi (x) der bliver gemt i arrayet
    let beerid = this.id.split("_").pop();
    console.log(beerid);

    //Vælger plads i array der stemmer overens med beerid og gemmer værdi fra inputfeltet som et nummer
    basket[beerid] = Number(this.value); 
    console.log(basket.reduce((a,b) => a+b));
    console.log(basket); 

    //Opdater antal øl i kurven (vist i menulinje)
    document.querySelector("#basketamount").innerHTML = (basket.reduce((a,b) => a+b)).toString();
}

function buildBasket(){
    console.log("build basket");
    document.querySelector("#beer-menu").classList.add("hide"); 
    document.querySelector("#basket-overview").classList.remove("hide"); 
    document.querySelector("#tilbageknap1").addEventListener("click", updateInput); 

    let container = document.querySelector("#basket-overview");
  let temp = document.querySelector(".baskettemplate");
    
  
    basket.forEach((beer, i) => {
      //Hvis antallet af en bestemt øl er større end 0, så clon den 
      if(beer!=0){
      const clone = temp.cloneNode(true).content;
  
      //Input feltet viser id for den valgte øl 
      clone.querySelector("#beerbasket_").id = "beerbasket_" + i;
      clone.querySelector("#beerbasket_" + i).addEventListener("change", updateBasket); 
  
      clone.querySelector(".beer-image").src = `public/img/beer/${jsonData[i].label}`;
      clone.querySelector(".beer-name").textContent = jsonData[i].name;
      clone.querySelector(".beer-price").textContent = jsonPrices[i].price + " kr.";
      clone.querySelector(".alc").textContent = jsonData[i].alc + "% alc.";
      clone.querySelector(".beer-amount").value = beer;
  
      container.appendChild(clone);
      }
    });
    
  }


  function updateInput(){
    document.querySelector("#beer-menu").classList.remove("hide"); 
    document.querySelector("#basket-overview").classList.add("hide"); 

    //Løb gennem array og opdater antal øl
    basket.forEach((beer, i) => {
      document.querySelector("#beer_" + i).value = beer; 
    });
  }



  function listenForClickOnSubmit(){ 
    console.log("der er klikket på gå til betaling"); 
    document.querySelector("#basket-overview").classList.add("hide"); 
    document.querySelector("#basket-payment").classList.remove("hide");
    order = [];

    const form = document.querySelector("form"); 
    //console.log(basket);

    basket.forEach((beer, i) => {
      if(beer!=0){
        
  
        order.push({ name: jsonData[i].name, amount: beer });
      //orderlist.push(beer); 
      console.log(order); 
      }
    });
    
    //push til array i foreach
  
    // export function sendData(){
    form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // const beertype = document.querySelector(".beertype"); 
    // const beeramount = document.querySelector(".beeramount"); 
    // console.log(e.elements.beertype.value); 
    // console.log(beeramount.value); 

    })
  }
  

  function post(){
    const endpoint = "https://teamellewoods.herokuapp.com/order"; 

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', order);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    }
  









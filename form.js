"use strict";

window.addEventListener("DOMContentLoaded", init);

let jsonData; 
let jsonPrices; 
let basket = []; 
let order = [];


function init() {
  console.log("Der er hul igennem 🥳");
  document.querySelector(".buttontobasket").addEventListener("click", buildBasket);
  document.querySelector(".singleviewtobasket").addEventListener("click", buildBasket);
  document.querySelector(".sendordre").addEventListener("click", listenForClickOnSubmit);
  document.querySelector(".betalordre").addEventListener("click", post);
  document.querySelector(".buttontomenu").addEventListener("click", getData);
  
  // getData(); 
}

async function getData() {
  document.querySelector("#menu").classList.remove("hide"); 
  document.querySelector("#header").classList.remove("hide");
  document.querySelector("#frontpage").classList.add("hide");

  //Pil tilbage til forsiden fra menu
  document.querySelector("#buttontofrontpage").addEventListener("click",() => {document.querySelector("#menu").classList.add("hide"); document.querySelector("#frontpage").classList.remove("hide"); document.querySelector("#header").classList.add("hide");});

  let url = "https://teamellewoods.herokuapp.com/beertypes";
 jsonData = await fetch(url);
  jsonData = await jsonData.json();

  let prices = "/prices.json"; 
   jsonPrices = await fetch(prices);
  jsonPrices = await jsonPrices.json();
  console.log({ jsonData });

  let container = document.querySelector("#menu");
  let temp = document.querySelector(".beertemplate");
 


  //i = index 
  jsonData.forEach((beer, i) => {

    const beertype = [{ name: beer.name, amount: 1 }]; 
    fetchBeerStatus(beertype).then(beerdata => {
    
    //Hvis status er lig 200 (på lager) så klon øllen i menuen
    if(beerdata.status===200){
    const clone = temp.cloneNode(true).content;

    //Tilføjer plads i basket array
    basket.push(0); 

    //Input feltet viser id for den valgte øl 
    clone.querySelector("#beer_").id = "beer_" + i;
    clone.querySelector("#beer_" + i).addEventListener("change", updateBasket); 

    clone.querySelector(".beer-image").src = `public/img/beer/${beer.label}`;
    clone.querySelector(".beer-image").addEventListener("click", () => showDetails(i));

    clone.querySelector(".beer-name").textContent = beer.name;
    clone.querySelector(".beer-price").textContent = jsonPrices[i].price + " kr.";
    clone.querySelector(".alc").textContent = beer.alc + "% alc.";

  
    container.appendChild(clone);
    
  }
});
  });


  console.log(basket); 

}

function showDetails(i){
console.log("Vis deltajer om øl"); 

document.querySelector("#beer-single").classList.remove("hide"); 
document.querySelector("#menu").classList.add("hide"); 
document.querySelector("#buttonbacktomenu").addEventListener("click", updateInput); 

document.querySelector(".beersingle-input").id = "beersingle_" + i; 

document.querySelector("#beersingle_" + i ).addEventListener("change", updateBasket); 

//Opdater inputfelt med antal
document.querySelector("#beersingle_" + i).value = basket[i];

document.querySelector("#beer-single .beer-image").src = `public/img/beer/${jsonData[i].label}`;
document.querySelector("#header h1").textContent = `${jsonData[i].name}`;

document.querySelector("#beer-single .beer-name").textContent = jsonData[i].name;
document.querySelector("#beer-single .beer-price").textContent = jsonPrices[i].price + " kr.";
document.querySelector("#beer-single .alc").textContent = jsonData[i].alc + "% alc.";
document.querySelector("#beer-single .desc").textContent = jsonData[i].description.aroma;


document.querySelector(".singleviewtobasket")

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
    document.querySelector("#menu").classList.add("hide"); 
    document.querySelector("#beer-single").classList.add("hide"); 
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
    document.querySelector("#menu").classList.remove("hide"); 
    document.querySelector("#basket-overview").classList.add("hide"); 
    document.querySelector("#beer-single").classList.add("hide"); 

    //Løb gennem array og opdater antal øl
    basket.forEach((beer, i) => {
      if(document.querySelector("#beer_" + i)!==null){
      document.querySelector("#beer_" + i).value = beer; 
      }
    });
  
  }



  function listenForClickOnSubmit(){ 
    console.log("der er klikket på gå til betaling"); 
    document.querySelector("#basket-overview").classList.add("hide"); 
    document.querySelector("#basket-payment").classList.remove("hide");
    document.querySelector(".betalordre").addEventListener("click", post);
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

    });
  }

async function fetchBeerStatus(data){
  console.log(data)
  
  const endpoint = "https://teamellewoods.herokuapp.com/order"; 
  const tempdata = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }); 
  
  return await tempdata.json();
}

async function post(){

  const endpoint = "https://teamellewoods.herokuapp.com/order"; 

    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      //hent data.id
      console.log(data.id); 
      orderConfirmation(data.id);
    })
    .catch((error) => {
      console.error('Error:', error);
  });
  
}

function orderConfirmation(id){
console.log("tak for din ordre"); 
document.querySelector("#confirmation").classList.remove("hide");
document.querySelector("#basket-payment").classList.add("hide");

document.querySelector(".ordreid").innerHTML = id;
console.log(id); 
}








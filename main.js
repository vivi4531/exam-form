import "./sass/style.scss";
import "./form.js"; 
import "./post.js";
import "./cardvalidation.js"; 
import { listenForClickOnSubmit } from "./post.js";
import "./menu.js"; 

"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("Der er hul igennem 🥳");
  getData(); 
}

async function getData() {
  let url = "https://teamellewoods.herokuapp.com/beertypes";
  let prices = "/prices.json"; 
  let jsonData = await fetch(url);
  jsonData = await jsonData.json();
  console.log({ jsonData });

  let container = document.querySelector("#beerlist_container");
  let temp = document.querySelector("template");

  jsonData.forEach((beer) => {
    const clone = temp.cloneNode(true).content;

    const beerinfo = beer.name;
    clone.querySelector(".beer_image").src = `public/beer/${beername}.png`;
    clone.querySelector(".beername").textContent = beer.name;
    // clone.querySelector(".price").textContent = "40,-";
    clone.querySelector(".alc").textContent = beer.alc + "% alc.";

    //Klik på øl og læs mere 
    //clone.querySelector(".template-article").addEventListener("click", () => showDetails(beer, beerName));

    container.appendChild(clone);
  });
}







const order = [
        { name: "Hoppily Ever After", amount: 1 },
        { name: "Row 26", amount: 2 },
      ];

// post(order);

listenForClickOnSubmit(); 
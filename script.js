import { locations } from './location.js';
import { fightDragon } from './fight.js';
import { lose } from './endGame.js';

// xp handling
export let xp = 0;

// Health handling
export let health = 100;
export function addHealth(amount) {
  health += amount;
}
export function subtractHealth(amount) {
  if (health >= amount) {
    health -= amount;
  } else {
    lose();
    // Handle insufficient health, ie losing
  }
}

// Gold handling
export let gold = 50;
export function addGold(amount) {
  gold += amount;
}
export function subtractGold(amount) {
  if (gold >= amount) {
    gold -= amount;
    // Additional logic if needed
  } else {
    text.innerText = "You do not have enough gold to buy health.";
    // Handle insufficient gold
  }
}

// Changing weapons
export let inventory = ["stick"];
export let currentWeapon = 0;
export function weaponUp() {
  currentWeapon++;
  console.log("weaponUp");
}
export function weaponDown() {
  if (inventory.length > 0) {
    currentWeapon--;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

export let monsterHealth;

// DOM assignments
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
export const xpText = document.querySelector("#xpText");
export const healthText = document.querySelector("#healthText");
export const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
export const monsterNameText = document.querySelector("#monsterName");
export const monsterHealthText = document.querySelector("#monsterHealth");

// initialize buttons
button1.onclick = goStore;

/*
button1.onclick = () => {
  console.log("Store button clicked");
};
*/

button2.onclick = goCave;

/*
button2.onclick = () => {
  console.log("Cave button clicked");
};
*/

button3.onclick = fightDragon;

button3.onclick = () => {
  console.log("Dragon button clicked");
};

/*
button3.onclick = () => {
  console.log("Dragon button clicked");
};
*/


/**
 * Updates the UI based on the given location object.
 * 
 * @param {Object} location - The location object containing button text, 
 * button functions, text, and image properties.
 */
export function update(location) {
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
  console.log("update called")

  if (location.image == false) {
    monsterStats.style.display = "none";
    const monsterImage = document.getElementById("image");
    monsterImage.style.display = "none";
  }
}

/**
 * Updates the UI with the town location data.
 */
export function goTown() {
  update(locations[0]);
}

/**
 * Updates the UI with the cave location data.
 */
export function goCave() {
  update(locations[2]);
}

/**
 * Updates the UI with the store location data.
 */
export function goStore() {
  update(locations[1]);
  console.log("Store function called");
}

/**
 * Updates the UI with the easter egg location data.
 */
export function easterEgg() {
  update(locations[7]);
}
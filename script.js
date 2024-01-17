import { locations } from './location.js';
import { fightBoss } from './fight.js';
import { lose } from './endGame.js';
// DOM assignments
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
export const xpText = document.querySelector("#xpText");
export const healthText = document.querySelector("#healthText");
export const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
export const monsterNameText = document.querySelector("#monsterName");
export const monsterHealthText = document.querySelector("#monsterHealth");
export let health = 100;
export let gold = 50;
export let xp = 0;
let level =0;

// Entity
export class Entity {
  constructor(id) {
      this.id = id;
      this.components = {};
  }

  addComponent(componentType, component) {
      this.components[componentType] = component;
  }

  getComponent(componentType) {
      return this.components[componentType];
  }
}

// EntityManager
export class EntityManager {
  constructor() {
      this.entities = [];
      this.nextId = 0;
  }

  createEntity(initObject) {
      let entity = new Entity(this.nextId++);
      for (const key in initObject) {
        entity.addComponent(key, initObject[key]);
    }
      this.entities.push(entity);
      return entity;
  }

  getEntitiesWithComponent(componentType) {
      return this.entities.filter(entity => entity.getComponent(componentType));
  }
}

// initialize entity manager
export const entityManager = new EntityManager();

/* Handle player stats logic */

// xp handling
let previousXp = 100; //XP for level 1
let currentXp = 150; //XP for level 2
export let xpToNextLevel = xp;
function updateXpToNextLevel() {
  let nextXp = previousXp + currentXp;
  previousXp = currentXp;
  currentXp = nextXp;
  xpToNextLevel = nextXp;
}
/* Usage example when the player levels up
level++;
updateXpToNextLevel(); // Call this function each time the player levels up
*/

export function addXp(amount) {
  xp += amount;
}
export function subtractXp(amount) {
  xp -= amount;
}

// Health handling
export function addHealth(amount) {
  health += amount;
}
export function subtractHealth(amount) {
  if (health >= amount) {
    health -= amount;
  } else {
    health -= amount;
    lose();
    // Handle insufficient health, ie losing
  }
}

// Gold handling
export function addGold(amount) {
  gold += amount;
}
export function subtractGold(amount) {
  gold -= amount;
  eventEmitter.emit("goldUpdated");
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

/* End of player stats logic section */

function createButtons(location) {
  // Remove all existing buttons
  const buttonContainer = document.getElementById('controls');
  buttonContainer.innerHTML = '';

  // Create new buttons based on the location's data
  location['button text'].forEach((text, index) => {
      const button = document.createElement('button');
      button.innerText = text;
      button.onclick = location['button functions'][index];
      buttonContainer.appendChild(button);
  });
}

// initialize buttons
createButtons(locations[0]);

/**
 * Updates the UI based on the given location object.
 * 
 * @param {Object} location - The location object containing button text, 
 * button functions, text, and image properties.
 */
export function update(location) {
  createButtons(location); // Create buttons dynamically based on location
  text.innerText = location.text;
  console.log("update called")

  if (location.image == false) {
    monsterStats.style.display = "none";
    const monsterImage = document.getElementById("image");
    monsterImage.style.display = "none";
  }
}


/**
 * Resets the player stats and inventory to starting values, 
 * and updates the UI to the town view.
 */
export function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
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
 * Updates the UI with the store location data.
 */
export function goStats() {
  update(locations[5]);
  console.log("Stats function called");
}
/**
 * Updates the UI with the store location data.
 */
export function goInventory() {
  update(locations[5]);
  console.log("Inventory function called");
}

/**
 * Updates the UI with the easter egg location data.
 */
export function easterEgg() {
  update(locations[8]);
}
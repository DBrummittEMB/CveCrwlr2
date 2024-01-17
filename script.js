import { eventEmitter } from './eventEmitter.js';
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
let previousXp = 100; //XP for level 1
let currentXp = 150; //XP for level 2
export let xpToNextLevel = xp;
export let inventory = ["stick"];
export let currentWeapon = 0;



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


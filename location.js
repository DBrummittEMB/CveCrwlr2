import { eventEmitter } from './eventEmitter.js';
import { player, xpText, healthText, goldText, text, image, imageContainer, monsterStats } from './script.js';
import { buyHealth, buyWeapon, sellWeapon } from './store.js';
import { pickTwo, pickEight } from './easterEgg.js';
export const monsterNameText = document.querySelector("#monsterName");
export const monsterHealthText = document.querySelector("#monsterHealth");
export const monsterText = document.querySelector("#monsterText");
export const monsterHealthStat = document.querySelector("#monsterHealthStat");
export { monsterStats };

function health() {
  let healthComponent = player.getComponent('health');
  //console.log('healthComponent called');
  return healthComponent.currentHealth;
}
function gold() {
  let goldComponent = player.getComponent('gold');
  //console.log('goldComponent called');
  return goldComponent.gold;
}
function inventory() {
  let inventoryComponent = player.getComponent('inventory');
  //console.log(inventoryComponent.items);
  return inventoryComponent.items;
}
function xp() {
  let xpComponent = player.getComponent('xp');
  //console.log('xpComponent called');
  return xpComponent.xp;
}
function fightSmall() {
  eventEmitter.emit('fightSmall');
}
function fightMedium() {
  eventEmitter.emit('fightMedium');
}
function fightBoss() {
  eventEmitter.emit('fightBoss');
}
function attack() {
  eventEmitter.emit('attack');
}
function dodge() {
  eventEmitter.emit('dodge');
}
function useItem() {
  eventEmitter.emit('useItem');
}
function restart() {
  eventEmitter.emit('restart', player);
}

export const locations = [
    {
      name: "town square",
      "button text": ["Go to store", "Go to cave", "Stats", "Inventory", "Fight Boss"],
      "button functions": [goStore, goCave, goStats, goInventory, fightBoss],
      text: "You are in the town square. You see a sign that says \"Store.\"",
      imageUrl: "imgs/townSquare.png",
      image: true
    },
    {
      name: "store",
      "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Sell Weapon", "Go to town square"],
      "button functions": [buyHealth, buyWeapon, sellWeapon, goTown],
      text: "You enter the store.",
      imageUrl: "imgs/shop.png",
      image: true
    },
    {
      name: "cave",
      "button text": ["Fight small", "Fight medium", "Go to town square"],
      "button functions": [fightSmall , fightMedium, goTown],
      text: "You enter the cave. You see some monsters.",
      imageUrl: "imgs/cave.png",
      image: true
    },
    {
      name: "fight",
      "button text": ["Attack", "Use Item", "Run"],
      "button functions": [attack, useItem, goTown],
      text: "You are fighting a monster.",
      image: true
    },
    {
      name: "killMonster",
      "button text": ["Go to town square", "Go to town square", "Go to town square"],
      "button functions": [goTown, goTown, easterEgg],
      text: "The monster screams \"Arg!\" as it dies. You gain experience points and find gold.",
      image: false
    },
    {
      name: "stats",
      "button text": ["Go to town square", "Go to town square", "Go to town square"],
      "button functions": [goTown, goTown, easterEgg],
      text: `Health: ${health()} | Gold: ${gold()} | Weapon: ${inventory()} | Experience: ${xp()}`,
      image: false
    },
    {
      name: "lose",
      "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
      "button functions": [restart, restart, restart],
      text: "ded.",
      imageUrl: "imgs/gameOver.png",
      image: true
    },
    {
      name: "win",
      "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
      "button functions": [restart, restart, restart],
      text: "Winner Winner Chicken Dinner!.",
      imageUrl: "imgs/win.png",
      image: true
    },
    {
      name: "easterEgg",
      "button text": ["2", "8", "Go to town square?"],
      "button functions": [pickTwo, pickEight, goTown],
      text: "You find a secret game. Pick a number above. If you pick correctly, you win!",
      imageUrl: "",
      image: false
    },
    {
      name: "homeScreen",
      "button text": ["Start", "Settings", "Change log"],
      "button functions": [goPickCharacter, goSettings, goChangelog],
      text: "Welcome to CveCrwlr! Kill the stuff! Get the Levels! Beat the game!",
        imageUrl: "imgs/openScreen.png",
      image: true
    },
    {
      name: "pickCharacter",
      "button text": ["Character 1", "Character 2", "Back"],
      "button functions": [goTown, goTown, goHomeScreen],
      text: "Welcome to CveCrwlr! Kill the stuff! Get the Levels! Beat the game!",
        imageUrl: "imgs/openScreen.png",
      image: true
    },
    {
      name: "settings",
      "button text": ["Back"],
      "button functions": [goHomeScreen],
      text: "Settings are coming soon.",
      image: false
    },
    {
      name: "changelog",
      "button text": ["Back"],
      "button functions": [goHomeScreen],
      text: "Changelog:\n- Added Settings and Changelog screens.",
      image: false
    }
  ];

function createButtons(location) {
  // Remove all existing buttons
  const buttonContainer = document.getElementById('controls');
  buttonContainer.innerHTML = '';

  // Create new buttons based on the location's data
  location['button text'].forEach((text, index) => {
      const button = document.createElement('button');
      // Use textContent for broader compatibility (e.g., jsdom)
      button.textContent = text;
      button.onclick = location['button functions'][index];
      buttonContainer.appendChild(button);
  });
}
  
/**
 * Updates the UI based on the given location object.
 * 
 * @param {Object} location - The location object containing button text, 
 * button functions, text, and image properties.
 */
eventEmitter.on('update', (location) => {
  createButtons(location); // Create buttons dynamically based on location
  let xpComponent = player.getComponent('xp');
  let healthComponent = player.getComponent('health');
  let goldComponent = player.getComponent('gold');
  // Update on-screen stats using textContent for consistency
  text.textContent = location.text;
  goldText.textContent = goldComponent.gold;
  xpText.textContent = xpComponent.xp;
  healthText.textContent = healthComponent.currentHealth;
  console.log("update called")
  if (location.image == false) {
    imageContainer.style.display = "none";
    image.style.display = "none";
  } else if (location.image == true) {
    imageContainer.style.display = "block";
    image.style.display = "block";
    image.src = location.imageUrl;
  }
  if (location.name == "fight") {
    monsterStats.style.display = "block";
  } else {
    monsterStats.style.display = "none";
  }
});

// initialize UI after registering the update listener
eventEmitter.emit('update', locations[9]);

/**
 * Updates the UI with the town location data.
 */
export function goTown() {
  eventEmitter.emit('update', (locations[0]) );
  console.log("Town function called");
}
  
/**
 * Updates the UI with the cave location data.
 */
export function goCave() {
  eventEmitter.emit('update', (locations[2]) );
  console.log("Cave function called");
}
  
/**
 * Updates the UI with the store location data.
 */
export function goStore() {
  eventEmitter.emit('update', (locations[1]) );
  console.log("Store function called");
}
/**
 * Updates the UI with the stats location data.
 */
export function goStats() {
  let healthComp = player.getComponent('health').currentHealth;
  let goldComp = player.getComponent('gold').gold;
  let xpComp = player.getComponent('xp').xp;
  let inventoryComp = player.getComponent('inventory').items.join(', ');

  // Update the text property of the stats location
  locations[5].text = `Health: ${healthComp} | Gold: ${goldComp} | Weapon: ${inventoryComp} | Experience: ${xpComp}`;

  eventEmitter.emit('update', (locations[5]) );
  console.log("Stats function called");
}
/**
 * Updates the UI with the store location data.
 */
export function goInventory() {
  eventEmitter.emit('update', (locations[5]) );
  console.log("Inventory function called");
}
  
/**
 * Updates the UI with the easter egg location data.
 */
export function easterEgg() {
  eventEmitter.emit('update', (locations[8]) );
  console.log("Easter egg function called");
}

export function goHomeScreen() {
  eventEmitter.emit('update', (locations[9]) );
  console.log("Home screen function called");
}

export function goPickCharacter() {
  eventEmitter.emit('update', (locations[10]) );
  console.log("Pick character function called");
}

export function goSettings() {
  eventEmitter.emit('update', (locations[11]) );
  console.log("Settings function called");
}

export function goChangelog() {
  eventEmitter.emit('update', (locations[12]) );
  console.log("Changelog function called");
}

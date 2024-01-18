import { eventEmitter } from './eventEmitter.js';
import { gold, health, currentWeapon, restart } from './script.js';
import { fightBoss, fightSmall, fightMedium, combatSystem, combat } from './fight.js';
import { buyHealth, buyWeapon, sellWeapon } from './store.js';
import { pickTwo, pickEight } from './easterEgg.js';
import { weapons } from './item.js';



export const locations = [
    {
      name: "town square",
      "button text": ["Go to store", "Go to cave", "Stats", "Inventory", "Fight Boss"],
      "button functions": [goStore, goCave, goStats, goInventory, fightBoss],
      text: "You are in the town square. You see a sign that says \"Store.\"",
      imageUrl: "/imgs/townSquare.png",
      image: true
    },
    {
      name: "store",
      "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Sell Weapon", "Go to town square"],
      "button functions": [buyHealth, buyWeapon, sellWeapon, goTown],
      text: "You enter the store.",
      imageUrl: "/imgs/shop.png",
      image: true
    },
    {
      name: "cave",
      "button text": ["Fight small", "Fight medium", "Go to town square"],
      "button functions": [fightSmall, fightMedium, goTown],
      text: "You enter the cave. You see some monsters.",
      imageUrl: "/imgs/cave.png",
      image: true
    },
    {
      name: "fight",
      "button text": ["Attack", "Item(coming soon)", "Run"],
      "button functions": [combat.attack, combatSystem.dodge, goTown],
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
      text: `Health: ${health} | Gold: ${gold} | Weapon: ${weapons[currentWeapon].name}`,
      image: false
    },
    {
      name: "lose",
      "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
      "button functions": [restart, restart, restart],
      text: "ded.",
      imageUrl: "/imgs/gameOver.png",
      image: true
    },
    {
      name: "win",
      "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
      "button functions": [restart, restart, restart],
      text: "Winner Winner Chicken Dinner!.",
      imageUrl: "/imgs/win.png",
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
      imageUrl: "/imgs/openScreen.png",
      image: true
    },
    {
      name: "pickCharacter",
      "button text": ["Character 1", "Character 2", "Back"],
      "button functions": [goTown, goTown, goHomeScreen],
      text: "Welcome to CveCrwlr! Kill the stuff! Get the Levels! Beat the game!",
      imageUrl: "/imgs/openScreen.png",
      image: true
    }
  ];

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
  createButtons(locations[9]);
  
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
  } else if (location.image == true) {
    monsterStats.style.display = "block";
    const monsterImage = document.getElementById("image");
    monsterImage.style.display = "block";
    monsterImage.src = location.imageUrl;
  }
}
  
eventEmitter.on('update', update);
eventEmitter.on('goldUpdated', () => { goldText.innerText = gold; });
eventEmitter.on('healthUpdated', () => { healthText.innerText = health });
eventEmitter.on('restart', () => update(locations[9]));

/**
 * Updates the UI with the town location data.
 */
export function goTown() {
  update(locations[0]);
  console.log("Town function called");
}
  
/**
 * Updates the UI with the cave location data.
 */
export function goCave() {
  update(locations[2]);
  console.log("Cave function called");
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
  console.log("Easter egg function called");
}

export function goHomeScreen() {
  update(locations[9]);
  console.log("Home screen function called");
}

export function goPickCharacter() {
  update(locations[10]);
  console.log("Pick character function called");
}

export function goSettings() {

}

export function goChangelog() {

}
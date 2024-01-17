import { gold, health, currentWeapon } from './script.js';
import { fightBoss, fightSmall, fightMedium, combatSystem, combat } from './fight.js';
import { buyHealth, buyWeapon } from './store.js';
import { pickTwo, pickEight } from './easterEgg.js';
import { weapons } from './item.js';



export const locations = [
    {
      name: "town square",
      "button text": ["Go to store", "Go to cave", "Stats", "Inventory", "Fight Boss"],
      "button functions": [goStore, goCave, goStats, goInventory, fightBoss],
      text: "You are in the town square. You see a sign that says \"Store.\"",
      image: false
    },
    {
      name: "store",
      "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
      "button functions": [buyHealth, buyWeapon, goTown],
      text: "You enter the store.",
      image: false
    },
    {
      name: "cave",
      "button text": ["Fight small", "Fight medium", "Go to town square"],
      "button functions": [fightSmall, fightMedium, goTown],
      text: "You enter the cave. You see some monsters.",
      image: false
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
      imageUrl: "openScreen.png",
      image: true
    },
    {
      name: "pickCharacter",
      "button text": ["Character 1", "Character 2", "Back"],
      "button functions": [startGame, startGame, goHomeScreen],
      text: "Welcome to CveCrwlr! Kill the stuff! Get the Levels! Beat the game!",
      imageUrl: "openScreen.png",
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
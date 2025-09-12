import { eventEmitter } from './eventEmitter.js';
import {
  player,
  xpText,
  healthText,
  goldText,
  text,
  image,
  imageContainer,
  monsterStats,
  selectCharacter,
  characterPreview,
  getXpForNextLevel,
  xpBarFill
} from './script.js';
import { characterTemplates } from './playerTemplate.js';
import {
  buyHealth,
  buyHealthPotion,
  buyWeapon,
  buyArmor,
  buyAccessory,
  sellWeapon
} from './store.js';
import { pickTwo, pickEight } from './easterEgg.js';
import { getImageUrl } from './imageLoader.js';
import { weapons, accessories } from './item.js';
import { debugLog } from './debug.js';
// Preload character images so they're cached before the selection screen is shown
characterTemplates.forEach(t => {
  const img = new Image();
  img.src = t.imageUrl;
});
export const monsterNameText = document.querySelector("#monsterName");
export const monsterHealthText = document.querySelector("#monsterHealth");
export const monsterText = document.querySelector("#monsterText");
export const monsterHealthStat = document.querySelector("#monsterHealthStat");
export { monsterStats };

function health() {
  let healthComponent = player.getComponent('health');
  return healthComponent.currentHealth;
}
function gold() {
  let goldComponent = player.getComponent('gold');
  return goldComponent.gold;
}
function equippedWeapon() {
  let weaponComp = player.getComponent('currentWeapon');
  return weapons[weaponComp.weaponIndex].name;
}
function xp() {
  let xpComponent = player.getComponent('xp');
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

const accessoryButtonText = accessories.map(
  a => `Buy ${a.name} (${a.cost} gold)`
);
const accessoryButtonFunctions = accessories.map(
  (_, index) => () => buyAccessory(index)
);

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
      "button text": [
        'Buy 10 health (10 gold)',
        'Buy health potion (15 gold)',
        'Buy weapon (30 gold)',
        'Buy armor (40 gold)',
        ...accessoryButtonText,
        'Sell Weapon',
        'Go to town square'
      ],
      "button functions": [
        buyHealth,
        buyHealthPotion,
        buyWeapon,
        buyArmor,
        ...accessoryButtonFunctions,
        sellWeapon,
        goTown
      ],
      text: 'You enter the store.',
      imageUrl: 'imgs/shop.png',
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
      "button functions": [goTown, goTown, goTown],
      text: "The monster screams \"Arg!\" as it dies. You gain experience points and find gold.",
      image: false
    },
    {
      name: "stats",
      "button text": ["Go to town square", "Go to town square", "Go to town square"],
      "button functions": [goTown, goTown, goTown],
      text:
        `Health: ${health()} | Gold: ${gold()} | ` +
        `Weapon: ${equippedWeapon()} | Experience: ${xp()}`,
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
    },
    {
      name: 'inventory',
      'button text': ['Go to town square'],
      'button functions': [goTown],
      text: '',
      image: false
    }
  ];

export function generatePickCharacterLocation() {
  const buttonText = characterTemplates.map(t => t.name);
  const buttonFunctions = characterTemplates.map((_, index) => () => selectCharacter(index));
  const buttonImages = characterTemplates.map(t => t.imageUrl);
  buttonText.push('Back');
  buttonFunctions.push(goHomeScreen);
  buttonImages.push(null);
  const summaries = characterTemplates
    .map(t => `${t.name}: HP ${t.health.currentHealth}, STR ${t.strength.strength}, INT ${t.intelligence.intelligence}`)
    .join('\n');
  characterPreview.src = buttonImages[0];
  return {
    name: 'pickCharacter',
    'button text': buttonText,
    'button functions': buttonFunctions,
    'button images': buttonImages,
    text: `Choose your character:\n${summaries}`,
    image: false
  };
}

export let pickCharacterLocation = generatePickCharacterLocation();

function createButtons(location) {
  // Remove all existing buttons
  const buttonContainer = document.getElementById('controls');
  buttonContainer.innerHTML = '';

  const texts = location['button text'] || [];
  const functions = location['button functions'] || [];
  const limit = Math.min(texts.length, functions.length);

  if (texts.length !== functions.length) {
    console.warn(
      `Button text (${texts.length}) and functions (${functions.length}) length mismatch`
    );
  }

  for (let index = 0; index < limit; index++) {
    const text = texts[index];
    const button = document.createElement('button');
    button.innerText = text;
    button.id = `button${index + 1}`;
    button.addEventListener('click', functions[index]);
    if (location['button images'] && location['button images'][index]) {
      const buttonImage = location['button images'][index];

      const showImage = () => {
        characterPreview.src = buttonImage;
        characterPreview.alt = text;
        image.src = buttonImage;
        image.alt = text;
      };

      const revertImage = () => {
        const defaultSrc = location.imageUrl || 'imgs/openScreen.png';
        characterPreview.src = defaultSrc;
        characterPreview.alt = defaultSrc;
        image.src = defaultSrc;
        image.alt = defaultSrc;
      };

      button.addEventListener('mouseenter', showImage);
      button.addEventListener('focus', showImage);
      button.addEventListener('touchstart', showImage);
      button.addEventListener('mouseleave', revertImage);
      button.addEventListener('blur', revertImage);
      button.addEventListener('touchend', revertImage);
    }
    buttonContainer.appendChild(button);
  }
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
  let levelComponent = player.getComponent('level');
  let requiredXp = getXpForNextLevel(levelComponent.level);
  text.innerText = location.text;
  goldText.innerText = goldComponent.gold;
  xpText.innerText = `${xpComponent.xp}/${requiredXp}`;
  let progress = (xpComponent.xp / requiredXp) * 100;
  xpBarFill.style.width = `${progress}%`;
  healthText.innerText = healthComponent.currentHealth;
  debugLog('update called');
  if (location.name === 'pickCharacter') {
    characterPreview.style.display = 'block';
    if (location['button images'] && location['button images'][0]) {
      characterPreview.src = location['button images'][0];
    }
  } else {
    characterPreview.style.display = 'none';
    characterPreview.src = '';
  }
  if (location.image == false) {
    imageContainer.style.display = "none";
    image.style.display = "none";
  } else if (location.image == true) {
    imageContainer.style.display = "block";
    image.style.display = "block";
    image.src = getImageUrl(location.imageUrl);
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
  eventEmitter.emit('goTown');
  eventEmitter.emit('update', (locations[0]) );
  debugLog('Town function called');
}
  
/**
 * Updates the UI with the cave location data.
 */
export function goCave() {
  eventEmitter.emit('update', (locations[2]) );
  debugLog('Cave function called');
}
  
/**
 * Updates the UI with the store location data.
 */
export function goStore() {
  eventEmitter.emit('update', (locations[1]) );
  debugLog('Store function called');
}
/**
 * Updates the UI with the stats location data.
 */
export function goStats() {
  let healthComp = player.getComponent('health').currentHealth;
  let goldComp = player.getComponent('gold').gold;
  let xpComp = player.getComponent('xp').xp;
  let weaponName = equippedWeapon();

  locations[5].text =
    `Health: ${healthComp} | Gold: ${goldComp} | ` +
    `Weapon: ${weaponName} | Experience: ${xpComp}`;

  eventEmitter.emit('update', locations[5]);
  debugLog('Stats function called');
}
/**
 * Updates the UI with the inventory location data.
 */
export function goInventory() {
  let inventoryLoc = locations.find(l => l.name === 'inventory');
  let items = player.getComponent('inventory').items;
  let { weapons, armor, accessories, consumables } = items;
  let parts = [];
  if (weapons.length) parts.push('Weapons: ' + weapons.join(', '));
  if (armor.length) parts.push('Armor: ' + armor.join(', '));
  if (accessories.length) parts.push('Accessories: ' + accessories.join(', '));
  if (consumables.length) parts.push('Consumables: ' + consumables.join(', '));
  inventoryLoc.text = parts.length
    ? 'In your inventory you have: ' + parts.join('; ')
    : 'Your inventory is empty.';
  eventEmitter.emit('update', inventoryLoc);
  debugLog('Inventory function called');
}
  
/**
 * Updates the UI with the easter egg location data.
 */
export function easterEgg() {
  eventEmitter.emit('update', (locations[8]) );
  debugLog('Easter egg function called');
}

export function goHomeScreen() {
  eventEmitter.emit('update', (locations[9]) );
  debugLog('Home screen function called');
}

export function goPickCharacter() {
  pickCharacterLocation = generatePickCharacterLocation();
  eventEmitter.emit('update', pickCharacterLocation);
  debugLog('Pick character function called');
}

export function goSettings() {
  eventEmitter.emit('update', (locations[10]) );
  debugLog('Settings function called');
}

export function goChangelog() {
  eventEmitter.emit('update', (locations[11]) );
  debugLog('Changelog function called');
}

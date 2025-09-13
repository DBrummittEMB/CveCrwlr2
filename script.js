import { eventEmitter } from './eventEmitter.js';
import {
  nameComponent,
  healthComponent,
  levelComponent,
  imageUrlComponent,
  xpComponent,
  goldComponent,
  strengthComponent,
  defenseComponent,
  intelligenceComponent,
  agilityComponent,
  currentWeaponComponent,
  currentArmorComponent,
  inventoryComponent
} from './entityComponent.js';
import { weapons, armor, accessories } from './item.js';
import {
  characterTemplates,
  currentTemplate,
  setCurrentTemplate,
} from './playerTemplate.js';
import { preloadImages, getImageUrl } from './imageLoader.js';

export const text = document.querySelector("#text");
export const xpText = document.querySelector('#xpText');
export const healthText = document.querySelector("#healthText");
export const goldText = document.querySelector("#goldText");
export const image = document.querySelector("#image");
export const levelText = document.querySelector('#levelText');
export const monsterStats = document.querySelector("#monsterStats");
export const imageContainer = document.querySelector("#imageContainer");
export const characterPreview = document.querySelector("#characterPreview");
export const xpBarFill = document.querySelector('#xpBarFill');

/**
 * Update the global scale based on the window size.
 */
function updateScale() {
  const scale = Math.min(
    (window.innerWidth - 8) / 400,
    (window.innerHeight - 8) / 500
  );
  document.documentElement.style.setProperty('--scale', scale);
}

window.addEventListener('load', updateScale);
window.addEventListener('resize', updateScale);

// Preload all game images once the window has loaded
window.addEventListener('load', preloadImages);

// XP required for each level using a mildly exponential progression curve.
// Formula: Math.floor(100 * Math.pow(level, 1.2)).
// Adjust the multiplier (100) or exponent (1.2) to tweak progression.
export function getXpForNextLevel(level) {
  return Math.floor(100 * Math.pow(level, 1.2));
}

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

  removeEntity(entityId) {
    this.entities = this.entities.filter(entity => entity.id!== entityId);
  }

  getEntitiesWithComponent(componentType) {
      return this.entities.filter(entity => entity.getComponent(componentType));
  }
}

// initialize entity manager
export const entityManager = new EntityManager();

export let player = entityManager.createEntity({
  'name': new nameComponent("player"),
  'health': new healthComponent(100),
  'level': new levelComponent(1),
  'xp': new xpComponent(0),
  'gold': new goldComponent(50),
  'imageUrl': new imageUrlComponent('imgs/warrior.png'),
  'strength': new strengthComponent(10),
  'defense': new defenseComponent(0),
  'intelligence': new intelligenceComponent(10),
  'agility': new agilityComponent(10),
  'currentWeapon': new currentWeaponComponent(0),
  'currentArmor': new currentArmorComponent(-1),
  'inventory': new inventoryComponent()
  });
player.getComponent('inventory').items.weapons.push(weapons[0].name);


/**
 * Initialize the existing player entity with stats from a template.
 * Updates entity components and relevant UI elements.
 *
 * @param {Object} template - Character template containing starting values.
 */
export function initializePlayer(template) {
  if (template.name) {
    player.getComponent('name').name = template.name;
  }
  if (template.imageUrl) {
    player.getComponent('imageUrl').imageUrl = template.imageUrl;
    image.src = getImageUrl(template.imageUrl);
  }
  if (template.health) {
    const healthComp = player.getComponent('health');
    // Use template maxHealth when available; otherwise default to currentHealth.
    const maxHealth =
      template.health.maxHealth ?? template.health.currentHealth;
    // Clamp provided currentHealth to the calculated maxHealth.
    const currentHealth = Math.min(
      template.health.currentHealth ?? maxHealth,
      maxHealth
    );
    healthComp.maxHealth = maxHealth;
    healthComp.currentHealth = currentHealth;
    healthText.innerText = healthComp.currentHealth;
  }
  if (template.strength) {
    player.getComponent('strength').strength = template.strength.strength;
  }
  if (template.defense) {
    player.getComponent('defense').defense = template.defense.defense;
  }
  if (template.agility) {
    player.getComponent('agility').agility = template.agility.agility;
  }
  if (template.intelligence) {
    player.getComponent('intelligence').intelligence = template.intelligence.intelligence;
  }
  if (template.gold) {
    const goldComp = player.getComponent('gold');
    goldComp.gold = template.gold.gold;
    goldText.innerText = goldComp.gold;
  }

  const xpComp = player.getComponent('xp');
  if (template.xp) {
    xpComp.xp = template.xp.xp;
  }
  if (template.inventory) {
    const inventoryComp = player.getComponent('inventory');
    inventoryComp.items = {
      weapons: [...template.inventory.items.weapons],
      armor: [...template.inventory.items.armor],
      accessories: [...template.inventory.items.accessories],
      consumables: [...template.inventory.items.consumables]
    };
    const weaponComp = player.getComponent('currentWeapon');
    const index = weapons.findIndex(
      w => w.name === inventoryComp.items.weapons[0]
    );
    weaponComp.weaponIndex = index !== -1 ? index : 0;
    const armorComp = player.getComponent('currentArmor');
    const armorIndex = inventoryComp.items.armor.length ? armor.findIndex(
      a => a.name === inventoryComp.items.armor[0]
    ) : -1;
    armorComp.armorIndex = armorIndex !== -1 ? armorIndex : -1;
  }
  const levelComp = player.getComponent('level');
  if (template.level) {
    levelComp.level = template.level.level;
  }
  levelText.innerText = levelComp.level;

  const requiredXp = getXpForNextLevel(levelComp.level);
  xpText.innerText = `${xpComp.xp}/${requiredXp}`;
  const progress = (xpComp.xp / requiredXp) * 100;
  xpBarFill.style.width = `${progress}%`;
}

/**
 * Selects a character template and initializes the player.
 * Then starts the game in the town location.
 *
 * @param {number} index - Index of the character template to select.
 */
export function selectCharacter(index) {
  const template = typeof structuredClone === 'function'
    ? structuredClone(characterTemplates[index])
    : JSON.parse(JSON.stringify(characterTemplates[index]));
  setCurrentTemplate(template);
  initializePlayer(currentTemplate);
  import('./location.js').then(module => {
    eventEmitter.emit('update', module.locations[0]);
  });
}


/* Handle player stats logic */
eventEmitter.on('addXp',(amount) => {
  let xpComp = player.getComponent('xp');
  xpComp.xp += amount;
  eventEmitter.emit('xpUpdated');
});

// Handle level ups and update displayed XP whenever it changes
eventEmitter.on('xpUpdated', () => {
  const xpComp = player.getComponent('xp');
  const levelComp = player.getComponent('level');
  let requiredXp = getXpForNextLevel(levelComp.level);

  // Handle scenarios where accumulated XP grants multiple levels.
  while (xpComp.xp >= requiredXp) {
    xpComp.xp -= requiredXp;
    levelComp.level++;

    const healthComp = player.getComponent('health');
    healthComp.maxHealth += 10;
    healthComp.currentHealth = healthComp.maxHealth;
    eventEmitter.emit('healthUpdated');

    const strengthComp = player.getComponent('strength');
    strengthComp.strength += 2;

    levelText.innerText = levelComp.level;
    text.innerText = `You leveled up! You are now level ${levelComp.level}.`;
    requiredXp = getXpForNextLevel(levelComp.level);
  }
  xpText.innerText = `${xpComp.xp}/${requiredXp}`;
  const progress = (xpComp.xp / requiredXp) * 100;
  xpBarFill.style.width = `${progress}%`;
});

// Health handling
eventEmitter.on('healthUpdated', () => {
  const healthComp = player.getComponent('health');
  healthText.innerText = healthComp.currentHealth;
});
eventEmitter.on('addHealth', (amount) => {
  let healthComp = player.getComponent('health');
  let newHealth = Math.min(healthComp.currentHealth + amount, healthComp.maxHealth);
  if (newHealth !== healthComp.currentHealth) {
    healthComp.currentHealth = newHealth;
    eventEmitter.emit('healthUpdated');
  }
});
eventEmitter.on('playerDamaged', (damageAmount) => {
  let healthComp = player.getComponent('health');
  let armorComp = player.getComponent('currentArmor');
  let defenseComp = player.getComponent('defense');
  let baseDefense = defenseComp ? defenseComp.defense : 0;
  let armorDefense = 0;
  if (armorComp.armorIndex >= 0 && armorComp.armorIndex < armor.length) {
    armorDefense = armor[armorComp.armorIndex].defense;
  } else {
    armorComp.armorIndex = -1;
  }
  let totalDefense = baseDefense + armorDefense;
  let adjustedDamage = Math.max(0, damageAmount - totalDefense);
  let newHealth = Math.max(
    0,
    Math.min(healthComp.currentHealth - adjustedDamage, healthComp.maxHealth)
  );
  if (newHealth !== healthComp.currentHealth) {
    healthComp.currentHealth = newHealth;
    eventEmitter.emit('healthUpdated');
  }

  if (healthComp.currentHealth <= 0) {
    eventEmitter.emit('lose');
  }
});


// Gold handling
eventEmitter.on('addGold', (amount) => {
  let goldComp = player.getComponent('gold');
  goldComp.gold += amount;
  goldText.innerText = goldComp.gold;
});
eventEmitter.on('subtractGold', (amount) => {
  let goldComp = player.getComponent('gold');
  goldComp.gold -= amount;
  goldText.innerText = goldComp.gold;
});

// Changing weapons
eventEmitter.on('weaponUp',() => {
  let weaponComp = player.getComponent('currentWeapon');
  let inventory = player.getComponent('inventory').items.weapons;
  if (weaponComp.weaponIndex < weapons.length - 1) {
    weaponComp.weaponIndex++;
    let newWeapon = weapons[weaponComp.weaponIndex].name;
    text.innerText = 'You now have a ' + newWeapon + '.';
    inventory.push(newWeapon);
    text.innerText += ' In your inventory you have: ' + inventory.join(', ');
  } else {
    text.innerText = 'You already have the most powerful weapon!';
  }
});
eventEmitter.on('weaponDown',() => {
  let weaponComp = player.getComponent('currentWeapon');
  let inventory = player.getComponent('inventory').items.weapons;
  if (inventory.length > 1 && weaponComp.weaponIndex > 0) {
    inventory.pop();
    weaponComp.weaponIndex--;
  }
});
eventEmitter.on('armorUp', () => {
  let armorComp = player.getComponent('currentArmor');
  let inventory = player.getComponent('inventory').items.armor;
  if (armorComp.armorIndex < armor.length - 1) {
    armorComp.armorIndex++;
    let newArmor = armor[armorComp.armorIndex].name;
    text.innerText = 'You equipped ' + newArmor + '.';
    inventory.push(newArmor);
    text.innerText += ' In your inventory you have: ' + inventory.join(', ');
  } else {
    text.innerText = 'You already have the best armor!';
  }
});

eventEmitter.on('addAccessory', index => {
  let accessory = accessories[index];
  let inventory = player.getComponent('inventory').items.accessories;
  if (!accessory) {
    text.innerText = 'That accessory does not exist.';
    return;
  }
  if (inventory.includes(accessory.name)) {
    text.innerText = 'You already have ' + accessory.name + '.';
    return;
  }
  inventory.push(accessory.name);
  if (accessory.healthBonus) {
    let healthComp = player.getComponent('health');
    healthComp.maxHealth += accessory.healthBonus;
    healthComp.currentHealth += accessory.healthBonus;
    eventEmitter.emit('healthUpdated');
  }
  if (accessory.strengthBonus) {
    player.getComponent('strength').strength += accessory.strengthBonus;
  }
  if (accessory.agilityBonus) {
    player.getComponent('agility').agility += accessory.agilityBonus;
  }
  if (accessory.defenseBonus) {
    player.getComponent('defense').defense += accessory.defenseBonus;
  }
  text.innerText = 'You equipped ' + accessory.name + '.';
  text.innerText += ' In your inventory you have: ' + inventory.join(', ');
});


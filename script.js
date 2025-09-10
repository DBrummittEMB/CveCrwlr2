import { eventEmitter } from './eventEmitter.js';
import { nameComponent, healthComponent, levelComponent, imageUrlComponent, xpComponent, goldComponent, strengthComponent, intelligenceComponent, currentWeaponComponent, inventoryComponent } from './entityComponent.js';
import { weapons } from './item.js';
import { characterTemplates, currentTemplate } from './playerTemplate.js';
import { preloadImages, getImageUrl } from './imageLoader.js';

export const text = document.querySelector("#text");
export const xpText = document.querySelector("#xpText");
export const healthText = document.querySelector("#healthText");
export const goldText = document.querySelector("#goldText");
export const image = document.querySelector("#image");
export const levelText = document.querySelector('#levelText');
export const monsterStats = document.querySelector("#monsterStats");
export const imageContainer = document.querySelector("#imageContainer");
export const characterPreview = document.querySelector("#characterPreview");

// Preload all game images once the window has loaded
window.addEventListener('load', preloadImages);

// XP required for each level. Adjust the formula to tweak progression.
// Given a current level, returns the XP needed to reach the next level.
export function getXpForNextLevel(level) {
  return level * 100;
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
  'imageUrl': new imageUrlComponent("images/player.png"),
  'strength': new strengthComponent(10),
  'intelligence': new intelligenceComponent(10),
  'currentWeapon': new currentWeaponComponent(0),
  'inventory': new inventoryComponent()
})
player.getComponent('inventory').items.push(weapons[0].name);


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
    healthComp.currentHealth = template.health.currentHealth;
    healthComp.maxHealth = template.health.currentHealth;
    healthText.innerText = healthComp.currentHealth;
  }
  if (template.strength) {
    player.getComponent('strength').strength = template.strength.strength;
  }
  if (template.intelligence) {
    player.getComponent('intelligence').intelligence = template.intelligence.intelligence;
  }
  if (template.gold) {
    const goldComp = player.getComponent('gold');
    goldComp.gold = template.gold.gold;
    goldText.innerText = goldComp.gold;
  }
  if (template.xp) {
    const xpComp = player.getComponent('xp');
    xpComp.xp = template.xp.xp;
    xpText.innerText = xpComp.xp;
  }
  if (template.inventory) {
    const inventoryComp = player.getComponent('inventory');
    inventoryComp.items = [...template.inventory.items];
    const weaponComp = player.getComponent('currentWeapon');
    const index = weapons.findIndex(w => w.name === inventoryComp.items[0]);
    weaponComp.weaponIndex = index !== -1 ? index : 0;
  }
  const levelComp = player.getComponent('level');
  if (template.level) {
    levelComp.level = template.level.level;
  }
  levelText.innerText = levelComp.level;
}

/**
 * Selects a character template and initializes the player.
 * Then starts the game in the town location.
 *
 * @param {number} index - Index of the character template to select.
 */
export function selectCharacter(index) {
  Object.assign(currentTemplate, characterTemplates[index]);
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
eventEmitter.on('subtractXp', (amount) => {
  let xpComp = player.getComponent('xp');
  xpComp.xp -= amount;
  eventEmitter.emit('xpUpdated');
});

// Handle level ups and update displayed XP whenever it changes
eventEmitter.on('xpUpdated', () => {
  let xpComp = player.getComponent('xp');
  let levelComp = player.getComponent('level');
  xpText.innerText = xpComp.xp;

  // Check if player has enough XP to level up
  let nextLevelXp = getXpForNextLevel(levelComp.level);
  if (xpComp.xp >= nextLevelXp) {
    levelComp.level++;

    // Scale player stats on level up
    let healthComp = player.getComponent('health');
    healthComp.maxHealth += 10;
    healthComp.currentHealth = healthComp.maxHealth;
    healthText.innerText = healthComp.currentHealth;

    let strengthComp = player.getComponent('strength');
    strengthComp.strength += 2;

    text.innerText = `You leveled up! You are now level ${levelComp.level}.`;
    levelText.innerText = levelComp.level;
  }
});

// Health handling
eventEmitter.on('addHealth', (amount) => {
  let healthComp = player.getComponent('health');
  let newHealth = Math.min(healthComp.currentHealth + amount, healthComp.maxHealth);
  if (newHealth !== healthComp.currentHealth) {
    healthComp.currentHealth = newHealth;
    healthText.innerText = healthComp.currentHealth;
    eventEmitter.emit('healthUpdated');
  }
});
eventEmitter.on('playerDamaged', (damageAmount) => {
  let healthComp = player.getComponent('health');
  let newHealth = Math.max(
    0,
    Math.min(healthComp.currentHealth - damageAmount, healthComp.maxHealth)
  );
  if (newHealth !== healthComp.currentHealth) {
    healthComp.currentHealth = newHealth;
    healthText.innerText = healthComp.currentHealth;
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
  let inventory = player.getComponent('inventory').items;
  if (weaponComp.weaponIndex < weapons.length - 1) {
    weaponComp.weaponIndex++;
    let newWeapon = weapons[weaponComp.weaponIndex].name;
    text.innerText = "You now have a " + newWeapon + ".";
    inventory.push(newWeapon);
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "You already have the most powerful weapon!";
  }
});
eventEmitter.on('weaponDown',() => {
  let weaponComp = player.getComponent('currentWeapon');
  let inventory = player.getComponent('inventory').items;
  if (inventory.length > 1 && weaponComp.weaponIndex > 0) {
    inventory.pop();
    weaponComp.weaponIndex--;
    let newWeapon = weapons[weaponComp.weaponIndex].name;
    text.innerText = "You now have a " + newWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "You don't have any weapons in your inventory!";
  }
});

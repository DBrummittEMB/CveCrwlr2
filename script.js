import { eventEmitter } from './eventEmitter.js';
import { nameComponent, healthComponent, levelComponent, imageUrlComponent, xpComponent, goldComponent, strengthComponent, intelligenceComponent, currentWeaponComponent, inventoryComponent } from './entityComponent.js';
import { weapons } from './item.js';
const text = document.querySelector("#text");
export const xpText = document.querySelector("#xpText");
export const healthText = document.querySelector("#healthText");
export const goldText = document.querySelector("#goldText");

export const image = document.querySelector("#image");

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
  'gold': new goldComponent(200),
  'imageUrl': new imageUrlComponent("images/player.png"),
  'strength': new strengthComponent(10),
  'intelligence': new intelligenceComponent(10),
  'currentWeapon': new currentWeaponComponent(0),
  'inventory': new inventoryComponent()
})
player.getComponent('inventory').items.push(weapons[0].name);
//console.log(player);
//console.log(player.id);
// Log entities 
entityManager.entities.forEach(entity => {
  console.log(entity);
});


/* Handle player stats logic */
eventEmitter.on('addXp',(amount) => {
  let xpComp = player.getComponent('xp');
  let xpAmt = xpComp.xp + amount;
  xpComp.xp += amount;
  console.log(`Player gained ${amount} xp. Current xp: ${xpAmt}`);
  eventEmitter.emit("xpUpdated");
});
eventEmitter.on('subtractXp', (amount) => {
  let xpComp = player.getComponent('xp');
  let xpAmt = xpComp.xp;
  xpComp.xp -= amount;
  console.log(`Player lost ${amount} xp. Current xp: ${xpAmt}`);
  eventEmitter.emit("xpUpdated");
});

// Health handling
eventEmitter.on('addHealth', (amount) => {
  let healthComp = player.getComponent('health');
  console.log(healthComp.currentHealth);
  healthComp.currentHealth += amount;
  console.log(`Player gained ${amount} health. Current health: ${healthComp.currentHealth}`);
  healthText.innerText = healthComp.currentHealth;
  eventEmitter.emit("healthUpdated");
});
eventEmitter.on('playerDamaged', (damageAmount) => {
  let healthComp = player.getComponent('health');
  healthComp.currentHealth -= damageAmount;
  console.log(`Player took ${damageAmount} damage. Current health: ${healthComp.currentHealth}`);
  healthText.innerText = healthComp.currentHealth;

  if (healthComp.currentHealth <= 0) {
    eventEmitter.emit('lose'); // Call lose function if health drops to 0 or below
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
  //console.log(goldComp.gold);
  goldComp.gold -= amount;
  goldText.innerText = goldComp.gold;
});

// Changing weapons
eventEmitter.on('weaponUp',() => {
  let weaponComp = player.getComponent('currentWeapon');
  let inventory = player.getComponent('inventory').items;
  console.log('weaponUp listener called');
  if (weaponComp.weaponIndex < weapons.length - 1) {
    console.log(player)
    weaponComp.weaponIndex++;
    let newWeapon = weapons[weaponComp.weaponIndex].name;
    text.innerText = "You now have a " + newWeapon + ".";
    inventory.push(newWeapon);
    text.innerText += " In your inventory you have: " + inventory;
    console.log(inventory);
  } else {
    text.innerText = "You already have the most powerful weapon!";
  }
});
eventEmitter.on('weaponDown',() => {
  let weaponComp = player.getComponent('currentWeapon');
  let inventory = player.getComponent('inventory').items;
  if (inventory.length > 1 && weaponComp.weaponIndex > 1) {
    weaponComp.weaponIndex.shift;
  } else {
    text.innerText = "You don't have any weapons in your inventory!";
  }
});
import { player, text } from './script.js';
import { eventEmitter } from './eventEmitter.js';
import { weapons, armor, accessories } from './item.js';

/**
 * Subtracts gold from the player's total and adds health,
 * then updates the UI to reflect the new gold and health values.
 */
export function buyHealth() {
  let goldComponent = player.getComponent('gold');
  let healthComponent = player.getComponent('health');
  if (healthComponent.currentHealth >= healthComponent.maxHealth) {
    text.innerText = 'Your health is already full.';
    return;
  }
  if (goldComponent.gold >= 10) {
    eventEmitter.emit('subtractGold', 10);
    eventEmitter.emit('addHealth', 10);
  } else {
    text.innerText = 'You do not have enough gold to buy health.';
  }
}

/**
 * Buys a health potion for later use.
 * Subtracts gold and adds a potion to the player's consumables.
 */
export function buyHealthPotion() {
  let goldComponent = player.getComponent('gold');
  let inventory = player.getComponent('inventory').items.consumables;
  const cost = 15;
  if (goldComponent.gold >= cost) {
    eventEmitter.emit('subtractGold', cost);
    inventory.push('health potion');
    text.innerText = 'You bought a health potion.';
  } else {
    text.innerText = 'You do not have enough gold to buy a health potion.';
  }
}

/**
 * Buys a new weapon by subtracting gold, upgrading the weapon,
 * updating the gold text, setting the new weapon name, adding to inventory,
 * updating the text and logging. Checks if the current weapon is already
 * the most powerful and updates text and button if so.
*/
export function buyWeapon() {
  let goldComponent = player.getComponent('gold');
  let weaponComp = player.getComponent('currentWeapon');

  // Ensure a stronger weapon is available before purchasing
  if (weaponComp.weaponIndex >= weapons.length - 1) {
    text.innerText = "You already have the most powerful weapon!";
  } else if (goldComponent.gold >= 30) {
    // Upgrade weapon
    eventEmitter.emit('subtractGold', 30);
    eventEmitter.emit('weaponUp');
  } else {
    text.innerText = "You do not have enough gold to buy a weapon.";
  }
}

export function buyArmor() {
  let goldComponent = player.getComponent('gold');
  let armorComp = player.getComponent('currentArmor');
  if (armorComp.armorIndex >= armor.length - 1) {
    text.innerText = 'You already have the best armor!';
  } else if (goldComponent.gold >= 40) {
    eventEmitter.emit('subtractGold', 40);
    eventEmitter.emit('armorUp');
  } else {
    text.innerText = 'You do not have enough gold to buy armor.';
  }
}

export function buyAccessory(index) {
  let goldComponent = player.getComponent('gold');
  let accessory = accessories[index];
  if (!accessory) {
    text.innerText = 'That accessory does not exist.';
    return;
  }
  if (player.getComponent('inventory').items.accessories.includes(accessory.name)) {
    text.innerText = 'You already have ' + accessory.name + '.';
  } else if (goldComponent.gold >= accessory.cost) {
    eventEmitter.emit('subtractGold', accessory.cost);
    eventEmitter.emit('addAccessory', index);
  } else {
    text.innerText = 'You do not have enough gold to buy ' + accessory.name + '.';
  }
}

/**
 * Sells the most recently acquired weapon, adds its gold value,
 * downgrades the current weapon and updates the player text with
 * the sold weapon name and remaining inventory.
 */
export function sellWeapon() {
  let inventory = player.getComponent('inventory').items.weapons;
  if (inventory.length > 1) {
    let soldWeapon = inventory[inventory.length - 1];
    eventEmitter.emit('addGold', 20);
    eventEmitter.emit('weaponDown');
    text.innerText = 'You sold a ' + soldWeapon + '.';
    text.innerText += ' In your inventory you have: ' + inventory.join(', ');
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

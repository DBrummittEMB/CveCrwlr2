import { player } from './script.js';
import { eventEmitter } from './eventEmitter.js';
import { weapons } from './item.js';

/**
 * Subtracts gold from the player's total and adds health,
 * then updates the UI to reflect the new gold and health values.
 */
export function buyHealth() {
  let goldComponent = player.getComponent('gold');
  if (goldComponent.gold >= 10) {
    console.log(goldComponent.gold);
    eventEmitter.emit('subtractGold', 10);
    eventEmitter.emit('addHealth', 10);
  } else {
    text.innerText = "You do not have enough gold to buy health.";
    // Handle insufficient gold
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
  let inventoryComponent = player.getComponent('inventory');

  // Check if player can afford the next weapon
  if (goldComponent.gold >= 30) {
      // Upgrade weapon
      eventEmitter.emit('subtractGold', 30);
      eventEmitter.emit('weaponUp');
   } else {
    text.innerText = "You do not have enough gold to buy a weapon.";
  }
}

/**
 * Sells the oldest weapon in the inventory, subtracting its gold value, 
 * updating the gold text, removing the sold weapon from the inventory array,
 * updating the text with the sold weapon name, and updating the inventory text.
*/
export function sellWeapon() {
  let inventoryComponent = player.getComponent('inventory').items;
  if (inventoryComponent.length > 1) {
    eventEmitter.emit('addGold', 20);
    eventEmitter.emit('weaponDown');
    let soldWeapon = inventoryComponent.shift();
    text.innerText = "You sold a " + soldWeapon + ".";
    text.innerText += " In your inventory you have: " + inventoryComponent;
  } else {
    text.innerText = "Don't sell your only weapon!";
  };
}
import { addHealth, gold, subtractGold, weaponUp, currentWeapon, inventory, addGold } from './script.js';
import { weapons } from './item.js';

/**
 * Subtracts gold from the player's total and adds health,
 * then updates the UI to reflect the new gold and health values.
 */
export function buyHealth() {
  if (gold >= 10) {
    subtractGold(10);
    addHealth(10);
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
  if (gold >= 30) {
    if (currentWeapon < weapons.length - 1) {
      subtractGold(30);
      weaponUp();
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
      console.log("buyweapon function called");
    } else {
      text.innerText = "You already have the most powerful weapon!";
    }
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
  if (inventory.length > 1) {
    addGold(15);
    let soldWeapon = inventory.shift();
    text.innerText = "You sold a " + soldWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  };
}


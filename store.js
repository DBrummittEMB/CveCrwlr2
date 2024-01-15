import { addHealth, gold, subtractGold, weaponUp, health, currentWeapon, inventory } from './script.js';
import { weapons } from './item.js';

/**
 * Subtracts gold from the player's total and adds health,
 * then updates the UI to reflect the new gold and health values.
 */
export function buyHealth() {
  if (gold >= 10) {
    subtractGold(10);
    addHealth(10);
    goldText.innerText = gold;
    healthText.innerText = health;
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
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
      console.log("buyweapon function called");
    } else {
      text.innerText = "You already have the most powerful weapon!";
      button2.innerText = "Sell weapon for 15 gold";
      button2.onclick = sellWeapon;
    }
  } else {
    text.innerText = "You do not have enough gold to buy a weapon.";
  }
}

/**
 * Sells the oldest weapon, subtracting gold for its value,
 * updating the gold text, removing the sold weapon from inventory,
 * updating text with the sold weapon name, and updating inventory text.
*/
export function sellWeapon() {
  if (inventory.length > 1) {
    subtractGold(15);
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
   } else {
    text.innerText = "Don't sell your only weapon!";
  };
}
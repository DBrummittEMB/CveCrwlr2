import { addHealth, gold, subtractGold } from './script.js';
import { health } from './script.js';
import { currentWeapon } from './script.js';
import { weapons } from './item.js';
import { inventory } from './script.js';

export function buyHealth() {
  subtractGold(10);
  addHealth(10);
  goldText.innerText = gold;
  healthText.innerText = health;
  }

export function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
        text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

export function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
      text.innerText = "Don't sell your only weapon!";
  }
}
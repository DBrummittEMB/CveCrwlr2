import { locations } from './location.js';
import { monsters } from './monster.js';
import { winGame, lose } from './endGame.js';
import { weapons } from './item.js';
import { update, currentWeapon, health, xp, monsterNameText, monsterHealthText, subtractHealth, addXp, addGold, gold, inventory, weaponUp } from './script.js';

let fighting;
let monsterHealth;

/** Need to update the individual monsters to a single function that builds monsters from a class */

/**
 * Starts a fight with the Slime monster.
 * Calls goFight() to update the UI for the fight.
 */
export function fightSlime() {
  fighting = 0;
  goFight();
  console.log("Slime button clicked");
}

/**
 * Starts a fight with the Beast monster by setting the fighting variable and calling goFight().
 */
export function fightBeast() {
  fighting = 1;
  goFight();
}

/**
 * Starts a fight with the Dragon monster by setting the fighting variable to 2 and calling goFight().
 */
export function fightDragon() {
  fighting = 2;
  goFight();
}

/**
 * Updates the UI to start a fight with the monster specified by fighting.
 * Shows the monster's name, image, and health.
 * Hides other UI elements.
*/
export function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;

  const monsterImage = document.getElementById('image');
  monsterImage.src = monsters[fighting].imageUrl;
  monsterImage.style.display = "block";
}

/**
 * Handles attacking the monster in a fight.
 * Calculates damage dealt to player and monster.
 * Handles when monster or player health reaches 0.
 * Has a chance to break the player's weapon.
*/
export function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  subtractHealth(getMonsterAttackValue(monsters[fighting].level));
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }

  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    weaponUp;
  }
}

/**
 * Calculates the attack damage value for a monster based on its level.
 * Subtracts a random value based on player XP to add variability.
*/
export function getMonsterAttackValue(level) {
  let hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit;
}

/**
 * Checks if the monster is hit during an attack. 
 * Returns true if a random value is greater than 0.2, 
 * or if player health is below 20.
*/
export function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}
  
/**
 * Handles dodging an attack during a fight.
 * Updates the text to indicate the player dodged the attack.
*/
export function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

/**
 * Handles defeating a monster in battle.
 * Updates gold and XP rewards.
 * Transitions to the next location.
*/
export function defeatMonster() {
  addGold(Math.floor(monsters[fighting].level * 6.7));
  addXp(monsters[fighting].level);
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}
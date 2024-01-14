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





export function goFight() {
  update(locations[3]);
  let enemy = entityManager.createEntity(monsters[fighting]);
  monsterStats.style.display = "block";
  monsterNameText.innerText = enemy.name;
  monsterHealthText.innerText = enemy.health;

  const monsterImage = document.getElementById('image');
  monsterImage.src = monsters[fighting].imageUrl;
  monsterImage.style.display = "block";
}
export function attack() {
  let monsterDamage = getMonsterAttackValue(monsters[fighting].level);
  let playerDamage = getPlayerAttackValue(level);
  subtractHealth(monsterDamage);
  enemy.health -= playerDamage;
  monsterHealthText.innerText = enemy.health;
  text.innerText = "The " + enemy.name + " attacks for " + monsterDamage + ".";
  text.innerText += " You attack the " + enemy.name " with your " + weapons[currentWeapon].name + " for " + playerDamage + ".";




/**
 * Calculates the attack damage value for a monster based on its level.
 * Subtracts a random value based on player XP to add variability.
*/
export function getMonsterAttackValue(level) {
  let hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit;
}

// gets attack value of the player
export function getPlayerAttackValue(level) {
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
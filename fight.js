import { locations, update } from './location.js';
import { smallMonsters, mediumMonsters, bossMonsters } from './monster.js';
import { winGame, lose } from './endGame.js';
import { weapons } from './item.js';
import { currentWeapon, entityManager, health, xp, monsterNameText, monsterHealthText, subtractHealth, addXp, addGold, gold, inventory, weaponUp } from './script.js';

let fighting;

/**
 * Defines a combat system with functions to start a fight and attack.
 * Creates an enemy entity, sets its health and name.
 * Updates UI to show enemy stats and image.
 * Calculates monster and player attack damage based on levels.
 * Reduces enemy health when player attacks.
 * Checks for win or loss based on enemy health after attack.
*/
export const combatSystem = (function () {
  let enemy;
  let enemyHealth;
  let enemyName;

  function goFight() {
    update(locations[3]);
    enemy = entityManager.createEntity(fighting);
    enemyHealth = enemy.getComponent("health");
    enemyName = enemy.getComponent("name");
    monsterStats.style.display = "block";
    monsterNameText.innerText = enemyName;
    monsterHealthText.innerText = enemyHealth;

    const monsterImage = document.getElementById('image');
    monsterImage.src = fighting.imageUrl;
    monsterImage.style.display = "block";
  }
  function attack() {
    let monsterDamage = getMonsterAttackValue(enemy.getComponent("level"));
    let playerDamage = getPlayerAttackValue(enemy.getComponent("level"));
    subtractHealth(monsterDamage);
    enemyHealth -= playerDamage;
    monsterHealthText.innerText = enemyHealth;
    text.innerText = "The " + enemyName + " attacks for " + monsterDamage + ".";
    text.innerText += " You attack the " + enemyName + " with your " + weapons[currentWeapon].name + " for " + playerDamage + ".";
    console.log("Attack called");
    if (enemyHealth <= 0) {
      if (enemyName === "Dragon") {
        winGame();
      } else {
        defeatMonster();
      }
    }
  }

  return { goFight, attack };
})

export const combat = combatSystem();

/**
 * Starts a fight with a random small monster.
 * Sets the fighting variable to a random small monster index. 
 * Calls goFight() to update the UI for the fight.
*/
export function fightSmall() {
  fighting = smallMonsters[Math.floor(Math.random() * 3)];
  combat.goFight();
  console.log("Slime button clicked");
}

/**
 * Starts a fight with a random medium-difficulty monster.
 * Sets the fighting variable to a random medium monster index.
 * Calls goFight() to update the UI for the fight.
 */
export function fightMedium() {
  fighting = mediumMonsters[Math.floor(Math.random() * 3)];
  combat.goFight();
}

/**
 * Starts a fight with a random boss monster.
 * Sets the fighting variable to a random boss monster index.
 * Calls goFight() to update the UI for the fight.
*/
export function fightBoss() {
  fighting = bossMonsters[0];
  combat.goFight();
}

/**
 * Calculates the attack damage value for a monster based on its level.
 * Subtracts a random value based on player XP to add variability.
*/
function getMonsterAttackValue(level) {
  let hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit;
}

// gets attack value of the player
function getPlayerAttackValue(level) {
  let hit = (level * 15) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit;
}

/**
 * Checks if the monster is hit during an attack. 
 * Returns true if a random value is greater than 0.2, 
 * or if player health is below 20.
*/
function isMonsterHit() {
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
function defeatMonster() {
  addGold(Math.floor(fighting.level * 6.7));
  addXp(fighting.level);
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

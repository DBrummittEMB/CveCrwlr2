import { locations, monsterHealthText, monsterNameText } from './location.js';
import { weapons, } from './item.js';
import { eventEmitter, } from './eventEmitter.js';
import { smallMonsters, mediumMonsters, bossMonsters } from './monster.js';
import { winGame } from './endGame.js';
import { player, entityManager } from './script.js';


let fighting;

/**
 * Defines a combat system with functions to start a fight and attack.
 * Creates an enemy entity, sets its health and name.
 * Updates UI to show enemy stats and image.
 * Calculates monster and player attack damage based on levels.
 * Reduces enemy health when player attacks.
 * Checks for win or loss based on enemy health after attack.
*/

let enemy;
let enemyHealth;
let enemyName;

eventEmitter.on('goFight', () => {
  eventEmitter.emit('update', (locations[3]));
  enemy = entityManager.createEntity(fighting);
  enemyHealth = enemy.getComponent("health");
  enemyName = enemy.getComponent("name");
  monsterStats.style.display = "block";
  monsterNameText.innerText = enemyName;
  monsterHealthText.innerText = enemyHealth;

  const monsterImage = document.getElementById('image');
  monsterImage.src = fighting.imageUrl;
  monsterImage.style.display = "block";
});
eventEmitter.on('attack', () => {
  let enemyLevel = enemy.getComponent("level");
  let monsterDamage = getMonsterAttackValue(enemyLevel);
  let playerDamage = getPlayerAttackValue(enemyLevel);
  let currentWeaponComp = player.getComponent('currentWeapon');
  let weaponIndex = currentWeaponComp.weaponIndex;
  let weaponName = weapons[weaponIndex].name;
  eventEmitter.emit('playerDamaged', monsterDamage);
  enemyHealth -= playerDamage;
  monsterHealthText.innerText = enemyHealth;
  text.innerText = "The " + enemyName + " attacks for " + monsterDamage + ".";
  text.innerText += " You attack the " + enemyName + " with your " + weaponName + " for " + playerDamage + ".";
  console.log("Attack called " + weaponIndex);
  if (enemyHealth <= 0) {
    if (enemyName === "Dragon") {
      winGame();
    } else {
      defeatMonster();
    }
  }
});


/**
 * Starts a fight with a random small monster.
 * Sets the fighting variable to a random small monster index. 
 * Calls goFight() to update the UI for the fight.
*/
eventEmitter.on('fightSmall', () => {
  fighting = smallMonsters[Math.floor(Math.random() * 3)];
  eventEmitter.emit('goFight');
  console.log("Slime button clicked");
});

/**
 * Starts a fight with a random medium-difficulty monster.
 * Sets the fighting variable to a random medium monster index.
 * Calls goFight() to update the UI for the fight.
 */
eventEmitter.on('fightMedium', () => {
  fighting = mediumMonsters[Math.floor(Math.random() * 3)];
  eventEmitter.emit('goFight');
});

/**
 * Starts a fight with a random boss monster.
 * Sets the fighting variable to a random boss monster index.
 * Calls goFight() to update the UI for the fight.
*/
eventEmitter.on('fightBoss', () => {
  fighting = bossMonsters[0];
  eventEmitter.emit('goFight');
})

/**
 * Calculates the attack damage value for a monster based on its level.
 * Subtracts a random value based on player XP to add variability.
*/
function getMonsterAttackValue(level) {
  let xpComp = player.getComponent("xp");
  let hit = 1 + (level * 5) - (Math.floor(Math.random() * xpComp.xp));
  console.log(xpComp.xp);
  return hit;
}

// gets attack value of the player
function getPlayerAttackValue(level) {
  let xpComp = player.getComponent("xp");
  let hit = 1 + (level * 15) + (Math.floor(Math.random() * xpComp.xp));
  console.log(xpComp.xp);
  return hit;
}
  
/**
 * Handles dodging an attack during a fight.
 * Updates the text to indicate the player dodged the attack.
*/
eventEmitter.on('dodge', () => {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
});

/**
 * Handles defeating a monster in battle.
 * Updates gold and XP rewards.
 * Transitions to the next location.
*/
function defeatMonster() {
  let goldReward = (Math.floor(fighting.level * 6.7));
  let gold = player.getComponent("gold");
  let xp = player.getComponent("xp");
  eventEmitter.emit('addGold', goldReward);
  eventEmitter.emit('addXp', fighting.level);
  goldText.innerText = gold.gold;
  xpText.innerText = xp.xp;
  eventEmitter.emit('update', (locations[4]));
}

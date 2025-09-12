import { locations, monsterHealthText, monsterNameText, monsterStats } from './location.js';
import { weapons } from './item.js';
import { eventEmitter } from './eventEmitter.js';
import { smallMonsters, mediumMonsters, bossMonsters } from './monster.js';
import { player, entityManager, text, goldText, image } from './script.js';
import {
  nameComponent,
  healthComponent,
  levelComponent,
  imageUrlComponent,
  defenseComponent,
  strengthComponent,
  agilityComponent
} from './entityComponent.js';
import { getImageUrl } from './imageLoader.js';


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

function clearEnemy() {
  if (enemy) {
    entityManager.removeEntity(enemy.id);
    enemy = null;
    enemyHealth = null;
    enemyName = null;
    fighting = null;
  }
}

eventEmitter.on('goFight', () => {
  eventEmitter.emit('update', locations[3]);
  enemy = entityManager.createEntity({
    name: new nameComponent(fighting.name),
    health: new healthComponent(fighting.health),
    level: new levelComponent(fighting.level),
    imageUrl: new imageUrlComponent(fighting.imageUrl),
    defense: new defenseComponent(fighting.defense ?? 0),
    strength: new strengthComponent(fighting.power ?? fighting.level * 5),
    agility: new agilityComponent(fighting.agility ?? fighting.level * 5)
  });
  enemyHealth = enemy.getComponent('health');
  enemyName = enemy.getComponent('name');
  const enemyImageUrl = enemy.getComponent('imageUrl').imageUrl;
  monsterStats.style.display = 'block';
  monsterNameText.innerText = enemyName.name;
  monsterHealthText.innerText = enemyHealth.currentHealth;

  image.src = getImageUrl(enemyImageUrl);
  image.style.display = 'block';
});
eventEmitter.on('attack', () => {
  if (!enemy) {
    text.innerText = 'There is no enemy to attack.';
    return;
  }
  let playerAgility = player.getComponent('agility').agility;
  let enemyAgility = enemy.getComponent('agility').agility;
  let message = '';
  if (doesHit(enemyAgility, playerAgility)) {
    let monsterDamage = getMonsterAttackValue();
    eventEmitter.emit('playerDamaged', monsterDamage);
    if (!enemy || !enemyHealth || !enemyName) {
      return;
    }
    message += 'The ' + enemyName.name + ' attacks for ' + monsterDamage + '.';
  } else {
    message += 'The ' + enemyName.name + ' misses.';
  }
  if (doesHit(playerAgility, enemyAgility)) {
    let playerDamage = getPlayerAttackValue();
    let weaponComp = player.getComponent('currentWeapon');
    let weaponName = weapons[weaponComp.weaponIndex].name;
    let enemyDefense = enemy.getComponent('defense').defense;
    let damageToEnemy = Math.max(0, playerDamage - enemyDefense);
    enemyHealth.currentHealth = Math.max(
      0,
      enemyHealth.currentHealth - damageToEnemy
    );
    monsterHealthText.innerText = enemyHealth.currentHealth;
    message += ' You attack the ' + enemyName.name +
      ' with your ' + weaponName + ' for ' + damageToEnemy + '.';
    if (enemyHealth.currentHealth <= 0) {
      if (enemyName.name === 'Dragon') {
        eventEmitter.emit('winGame');
      } else {
        defeatMonster();
      }
    }
  } else {
    message += ' You miss the ' + enemyName.name + '.';
  }
  text.innerText = message;
});

eventEmitter.on('goTown', clearEnemy);
eventEmitter.on('winGame', clearEnemy);
eventEmitter.on('lose', clearEnemy);


/**
 * Starts a fight with a random small monster.
 * Sets the fighting variable to a random small monster index.
 * Calls goFight() to update the UI for the fight.
*/
eventEmitter.on('fightSmall', () => {
  fighting = smallMonsters[Math.floor(Math.random() * smallMonsters.length)];
  eventEmitter.emit('goFight');
});

/**
 * Starts a fight with a random medium-difficulty monster.
 * Sets the fighting variable to a random medium monster index.
 * Calls goFight() to update the UI for the fight.
 */
eventEmitter.on('fightMedium', () => {
  fighting = mediumMonsters[Math.floor(Math.random() * mediumMonsters.length)];
  eventEmitter.emit('goFight');
});

/**
 * Starts a fight with a random boss monster.
 * Sets the fighting variable to a random boss monster index.
 * Calls goFight() to update the UI for the fight.
*/
eventEmitter.on('fightBoss', () => {
  fighting = bossMonsters[Math.floor(Math.random() * bossMonsters.length)];
  eventEmitter.emit('goFight');
});

/**
 * Calculates the attack damage value for a monster based on its level.
 * Subtracts a random value based on player XP to add variability.
*/
function getMonsterAttackValue() {
  let strengthComp = enemy.getComponent('strength');
  let strength = strengthComp ? strengthComp.strength : 0;
  return Math.floor(Math.random() * strength) + 1;
}

// gets attack value of the player
function getPlayerAttackValue() {
  let strengthComp = player.getComponent('strength');
  let weaponComp = player.getComponent('currentWeapon');
  let weaponPower = weapons[weaponComp.weaponIndex].power;
  let strength = strengthComp.strength;
  return strength + weaponPower + Math.floor(Math.random() * (strength / 2));
}

function doesHit(attackerAgility, defenderAgility) {
  let hitChance = attackerAgility / (attackerAgility + defenderAgility);
  return Math.random() < hitChance;
}
  
/**
 * Handles using an item during a fight.
 * Currently supports using health potions to restore player health.
 */
eventEmitter.on('useItem', () => {
  let inventory = player.getComponent('inventory').items.consumables;
  let healthComp = player.getComponent('health');
  let potionIndex = inventory.indexOf('health potion');

  if (potionIndex === -1) {
    text.innerText = "You don't have any health potions.";
    return;
  }

  if (healthComp.currentHealth >= healthComp.maxHealth) {
    text.innerText = 'Your health is already full.';
    return;
  }

  inventory.splice(potionIndex, 1);
  const healAmount = 30;
  const healed = Math.min(healAmount, healthComp.maxHealth - healthComp.currentHealth);
  healthComp.currentHealth += healed;
  text.innerText = `You use a health potion and recover ${healed} health.`;
  eventEmitter.emit('healthUpdated');
});

/**
 * Handles defeating a monster in battle.
 * Updates gold and XP rewards.
 * Transitions to the next location.
*/
function defeatMonster() {
  let goldReward = Math.floor(fighting.level * 6.7);
  let gold = player.getComponent('gold');
  eventEmitter.emit('addGold', goldReward);
  const xpReward = Math.ceil(fighting.level * 5);
  eventEmitter.emit('addXp', xpReward);
  goldText.innerText = gold.gold;
  clearEnemy();
  eventEmitter.emit('update', locations[4]);
}

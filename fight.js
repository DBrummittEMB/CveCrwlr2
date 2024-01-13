import { locations } from './location.js';
import { monsters } from './monster.js';
import { winGame, lose } from './endGame.js';

export function fightSlime() {
    fighting = 0;
    goFight();
  }

export function fightBeast() {
    fighting = 1;
    goFight();
  }

export function fightDragon() {
    fighting = 2;
    goFight();
  }

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

export function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    health -= getMonsterAttackValue(monsters[fighting].level);
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
      currentWeapon--;
    }   
  }

export function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
  }

export function isMonsterHit() {
    return Math.random() > 0.2 || health < 20;
  }
  
export function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
  }

export function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
  }
import { goStore, goCave, goTown, easterEgg, restart } from './script.js';
import { fightBoss, fightSmall, fightMedium, combatSystem, combat } from './fight.js';
import { buyHealth, buyWeapon } from './store.js';
import { pickTwo, pickEight } from './easterEgg.js';

export const locations = [
    {
      name: "town square",
      "button text": ["Go to store", "Go to cave", "Stats", "Inventory", "Fight Boss"],
      "button functions": [goStore, goCave, fightBoss],
      text: "You are in the town square. You see a sign that says \"Store.\"",
      image: false
    },
    {
      name: "store",
      "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
      "button functions": [buyHealth, buyWeapon, goTown],
      text: "You enter the store.",
      image: false
    },
    {
      name: "cave",
      "button text": ["Fight small", "Fight medium", "Go to town square"],
      "button functions": [fightSmall, fightMedium, goTown],
      text: "You enter the cave. You see some monsters.",
      image: false
    },
    {
      name: "fight",
      "button text": ["Attack", "Item(coming soon)", "Run"],
      "button functions": [combat.attack, combatSystem.dodge, goTown],
      text: "You are fighting a monster.",
      image: true
    },
    {
      name: "killMonster",
      "button text": ["Go to town square", "Go to town square", "Go to town square"],
      "button functions": [goTown, goTown, easterEgg],
      text: "The monster screams \"Arg!\" as it dies. You gain experience points and find gold.",
      image: false
    },
    {
      name: "stats",
      "button text": ["Go to town square", "Go to town square", "Go to town square"],
      "button functions": [goTown, goTown, easterEgg],
      text: "Health: ${health} | Gold: ${gold} | Weapon: ${weapons[currentWeapon].name}",
      image: false
    },
    {
      name: "lose",
      "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
      "button functions": [restart, restart, restart],
      text: "ded.",
      imageUrl: "/imgs/gameOver.png",
      image: true
    },
    {
      name: "win",
      "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
      "button functions": [restart, restart, restart],
      text: "Winner Winner Chicken Dinner!.",
      imageUrl: "/imgs/win.png",
      image: true
    },
    {
      name: "easterEgg",
      "button text": ["2", "8", "Go to town square?"],
      "button functions": [pickTwo, pickEight, goTown],
      text: "You find a secret game. Pick a number above. If you pick correctly, you win!",
      imageUrl: "",
      image: false
    }
  ];
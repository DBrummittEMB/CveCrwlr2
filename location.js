import { goStore } from './script.js';
import { goCave } from './script.js';
import { goTown } from './script.js';
import { fightDragon } from './fight.js';
import { fightSlime } from './fight.js';
import { fightBeast } from './fight.js';
import { attack } from './fight.js';
import { dodge } from './fight.js';
import { buyHealth } from './store.js';
import { buyWeapon } from './store.js';
import { easterEgg } from './script.js';
import { pickTwo, pickEight } from './easterEgg.js';
import { restart } from './script.js';

/*
export class location {
    constructor(name, buttonTxt, buttonFunction, text, image) {
        this.name = name;
        this.buttonTxt = buttonTxt;
        this.buttonFunction = buttonFunction;
        this.text = text;
        this.image = image;
    }
}
*/

export const locations = [
    {
      name: "town square",
      "button text": ["Go to store", "Go to cave", "Fight dragon"],
      "button functions": [goStore, goCave, fightDragon],
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
      "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
      "button functions": [fightSlime, fightBeast, goTown],
      text: "You enter the cave. You see some monsters.",
      image: false
    },
    {
      name: "fight",
      "button text": ["Attack", "Dodge", "Run"],
      "button functions": [attack, dodge, goTown],
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
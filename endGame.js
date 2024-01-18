import { locations, update } from './location.js';
import { gold, health, currentWeapon, xp, inventory, healthText } from './script.js';


export function winGame() {
    update(locations[7]);
  
    const winImage = document.getElementById('image');
    winImage.src = locations[7].imageUrl;
    winImage.style.display = "block";
  }

export function lose() {
    update(locations[6]);
  
    const loseImage = document.getElementById('image');
    loseImage.src = locations[6].imageUrl;
    loseImage.style.display = "block";
    healthText.innerText = health;
    console.log(health);
  }

  /**
   * Resets the player stats and inventory to starting values, 
   * and updates the UI to the town view.
   */

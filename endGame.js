import { locations, } from './location.js';
import { eventEmitter, } from './eventEmitter.js';

export function winGame() {
    eventEmitter.emit('update'(locations[7]));
  
    const winImage = document.getElementById('image');
    winImage.src = locations[7].imageUrl;
    winImage.style.display = "block";
  }

eventEmitter.on('lose', () => {
    eventEmitter.emit('update', (locations[6]));
  
    const loseImage = document.getElementById('image');
    loseImage.src = locations[6].imageUrl;
    loseImage.style.display = "block";
  });

  /**
   * Resets the player stats and inventory to starting values, 
   * and updates the UI to the town view.
   */

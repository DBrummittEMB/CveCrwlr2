import { locations, } from './location.js';
import { eventEmitter, } from './eventEmitter.js';
import { defaultPlayer } from './playerTemplate.js';

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

eventEmitter.on('restart', (player) => {
  console.log(player);
  console.log("Default player object: ", defaultPlayer); // Log default player object
  // Loop through and reset player components
  for (let componentName in defaultPlayer) {
    console.log("Checking for component: ", componentName); // Log each component being checked
    let playerComponent = player.getComponent(componentName);
    console.log("Component retrieved: ", playerComponent); // Log component retrieved
    if (playerComponent) {
      if (componentName === 'inventoryComponent') {
        // Reset inventory
        playerComponent.items = [...defaultPlayer[componentName]];
      } else {
        // For other components, reset their properties
        let defaultValues = defaultPlayer[componentName];
        for (let prop in defaultValues) {
          playerComponent[prop] = defaultValues[prop];
        }
      }
    }
  }
  eventEmitter.emit('update', locations[0]);
  console.log("restart function called");
});

  /**
   * Resets the player stats and inventory to starting values, 
   * and updates the UI to the town view.
   */

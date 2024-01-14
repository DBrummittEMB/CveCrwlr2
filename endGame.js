import { update } from './script.js';
import { locations } from './location.js';

export function winGame() {
    update(locations[6]);
  
    const winImage = document.getElementById('image');
    winImage.src = locations[6].imageUrl;
    winImage.style.display = "block";
  }

export function lose() {
    update(locations[5]);
  
    const loseImage = document.getElementById('image');
    loseImage.src = locations[5].imageUrl;
    loseImage.style.display = "block";
  }
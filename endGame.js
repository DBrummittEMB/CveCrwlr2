export function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
  }

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
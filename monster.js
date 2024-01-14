/*
export class Monster {
    constructor(config) {
        this.name = name;
        this.level = level;
        this.health = health;
        this.imageUrl = imageUrl;
    }
}

let slime = new Monster(monsters[0]);

*/

export const monsters = [
  {
    name: "Slime",
    level: 2,
    health: 15,
    imageUrl: "/imgs/slimeImage.png"
  },
  {
    name: "Fanged Beast",
    level: 8,
    health: 60,
    imageUrl: "/imgs/fangedBeast.png"
  },
  {
    name: "Dragon",
    level: 20,
    health: 300,
    imageUrl: "/imgs/bossDragon.png"
  }
];
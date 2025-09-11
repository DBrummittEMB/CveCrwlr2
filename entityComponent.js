export class nameComponent {
    constructor(name) {
        this.name = name;
    }
}
export class healthComponent {
    constructor(health) {
        this.currentHealth = health;
        this.maxHealth = health;
    }
}
export class levelComponent {
    constructor(level) {
        this.level = level;
    }
}
export class imageUrlComponent {
    constructor(imageUrl) {
        this.imageUrl = imageUrl;
    }
}
export class xpComponent {
    constructor(xp) {
        this.xp = xp;
    }
}
export class goldComponent {
    constructor(gold) {
        this.gold = gold;
    }
}
export class strengthComponent {
    constructor(strength) {
        this.strength = strength;
    }
}
export class intelligenceComponent {
    constructor(intelligence) {
        this.intelligence = intelligence;
    }
}
export class currentWeaponComponent {
    constructor(weaponIndex) {
        this.weaponIndex = weaponIndex;
    }
}
export class inventoryComponent {
  constructor() {
    this.items = {
      weapons: [],
      armor: [],
      accessories: [],
      consumables: []
    };
  }
}

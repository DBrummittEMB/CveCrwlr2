let goInventory;
let player;
let weapons;
let armor;
let accessories;
let consumables;

beforeAll(async () => {
  global.Image = class {
    constructor() {
      this.src = '';
    }
  };
  document.body.innerHTML = `
    <div id='controls'></div>
    <div id='text'></div>
    <div id='xpText'></div>
    <div id='healthText'></div>
    <div id='goldText'></div>
    <img id='image'>
    <div id='levelText'></div>
    <div id='monsterStats'></div>
    <div id='imageContainer'></div>
    <img id='characterPreview'>
    <div id='xpBarFill'></div>
    <div id='inventoryIcons'></div>
  `;
  ({ goInventory } = await import('../location.js'));
  ({ player } = await import('../script.js'));
  ({ weapons, armor, accessories, consumables } = await import('../item.js'));
});

test('inventory displays icons for each item type', () => {
  const items = player.getComponent('inventory').items;
  items.weapons = [weapons[0].name];
  items.armor = [armor[0].name];
  items.accessories = [accessories[0].name];
  items.consumables = [consumables[0].name];

  goInventory();

  const icons = document.querySelectorAll('#inventoryIcons img');
  expect(icons.length).toBe(4);
  expect(icons[0].src).toContain(weapons[0].icon);
  expect(icons[1].src).toContain(armor[0].icon);
  expect(icons[2].src).toContain(accessories[0].icon);
  expect(icons[3].src).toContain(consumables[0].icon);
});


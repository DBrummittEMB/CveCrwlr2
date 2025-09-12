let buyAccessory;
let player;
let accessories;

beforeAll(async () => {
  document.body.innerHTML = `
    <div id='text'></div>
    <div id='xpText'></div>
    <div id='healthText'></div>
    <div id='goldText'></div>
    <div id='image'></div>
    <div id='levelText'></div>
    <div id='monsterStats'></div>
    <div id='imageContainer'></div>
    <div id='characterPreview'></div>
    <div id='xpBarFill'></div>
  `;
  ({ buyAccessory } = await import('../store.js'));
  ({ player } = await import('../script.js'));
  ({ accessories } = await import('../item.js'));
});

beforeEach(() => {
  const goldComp = player.getComponent('gold');
  goldComp.gold = 100;
  const healthComp = player.getComponent('health');
  healthComp.currentHealth = 100;
  healthComp.maxHealth = 100;
  const inventory = player.getComponent('inventory').items.accessories;
  inventory.length = 0;
});

test('buyAccessory adds ring and increases max health', () => {
  buyAccessory(0);
  const goldComp = player.getComponent('gold');
  const healthComp = player.getComponent('health');
  const inventory = player.getComponent('inventory').items.accessories;
  expect(goldComp.gold).toBe(100 - accessories[0].cost);
  expect(healthComp.maxHealth).toBe(100 + accessories[0].healthBonus);
  expect(healthComp.currentHealth).toBe(100 + accessories[0].healthBonus);
  expect(inventory[0]).toBe(accessories[0].name);
});


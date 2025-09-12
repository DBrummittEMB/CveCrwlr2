let buyHealthPotion;
let player;
let eventEmitter;

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
    <div id='controls'></div>
    <div id='monsterName'></div>
    <div id='monsterHealth'></div>
    <div id='monsterText'></div>
    <div id='monsterHealthStat'></div>
  `;
  ({ buyHealthPotion } = await import('../store.js'));
  ({ eventEmitter } = await import('../eventEmitter.js'));
  ({ player } = await import('../script.js'));
  await import('../fight.js');
});

beforeEach(() => {
  const goldComp = player.getComponent('gold');
  goldComp.gold = 100;
  const healthComp = player.getComponent('health');
  healthComp.maxHealth = 100;
  healthComp.currentHealth = 100;
  player.getComponent('inventory').items.consumables = [];
});

test('buyHealthPotion adds potion to inventory and subtracts gold', () => {
  buyHealthPotion();
  const goldComp = player.getComponent('gold');
  const inventory = player.getComponent('inventory').items.consumables;
  expect(goldComp.gold).toBe(85);
  expect(inventory[0]).toBe('health potion');
});

test('useItem consumes potion and restores health', () => {
  const inventory = player.getComponent('inventory').items.consumables;
  inventory.push('health potion');
  const healthComp = player.getComponent('health');
  healthComp.currentHealth = 50;
  eventEmitter.emit('useItem');
  expect(healthComp.currentHealth).toBe(80);
  expect(inventory.length).toBe(0);
});

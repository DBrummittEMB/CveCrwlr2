let buyArmor;
let player;
let armor;

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
  ({ buyArmor } = await import('../store.js'));
  ({ player } = await import('../script.js'));
  ({ armor } = await import('../item.js'));
});

beforeEach(() => {
  const goldComp = player.getComponent('gold');
  goldComp.gold = 100;
  const armorComp = player.getComponent('currentArmor');
  armorComp.armorIndex = -1;
  player.getComponent('inventory').items.armor = [];
});

test('buyArmor purchases next armor and subtracts gold', () => {
  buyArmor();
  const goldComp = player.getComponent('gold');
  const armorComp = player.getComponent('currentArmor');
  const inventory = player.getComponent('inventory').items.armor;
  expect(goldComp.gold).toBe(60);
  expect(armorComp.armorIndex).toBe(0);
  expect(inventory[0]).toBe(armor[0].name);
});


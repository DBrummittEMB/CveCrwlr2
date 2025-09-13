let buyArmor;
let buyWeapon;
let sellWeapon;
let player;
let armor;
let weapons;

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
  ({ buyArmor, buyWeapon, sellWeapon } = await import('../store.js'));
  ({ player } = await import('../script.js'));
  ({ armor, weapons } = await import('../item.js'));
});

beforeEach(() => {
  const goldComp = player.getComponent('gold');
  goldComp.gold = 100;
  const armorComp = player.getComponent('currentArmor');
  armorComp.armorIndex = -1;
  player.getComponent('inventory').items.armor = [];
  const weaponComp = player.getComponent('currentWeapon');
  weaponComp.weaponIndex = 0;
  player.getComponent('inventory').items.weapons = [weapons[0].name];
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

test('sellWeapon downgrades weapon and updates inventory', () => {
  buyWeapon();
  sellWeapon();
  const weaponComp = player.getComponent('currentWeapon');
  const inventory = player.getComponent('inventory').items.weapons;
  expect(weaponComp.weaponIndex).toBe(0);
  expect(inventory).toEqual([weapons[0].name]);
});


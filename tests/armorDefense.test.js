let eventEmitter;
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
  ({ eventEmitter } = await import('../eventEmitter.js'));
  ({ player } = await import('../script.js'));
  ({ armor } = await import('../item.js'));
});

beforeEach(() => {
  const healthComp = player.getComponent('health');
  healthComp.currentHealth = 100;
  const armorComp = player.getComponent('currentArmor');
  armorComp.armorIndex = 1;
  const defenseComp = player.getComponent('defense');
  defenseComp.defense = 0;
});

test('playerDamaged subtracts armor defense from damage', () => {
  const healthComp = player.getComponent('health');
  const armorComp = player.getComponent('currentArmor');
  const defenseComp = player.getComponent('defense');
  const damage = 20;
  const totalDefense = defenseComp.defense + armor[armorComp.armorIndex].defense;
  const expectedHealth = healthComp.currentHealth - Math.max(0, damage - totalDefense);
  eventEmitter.emit('playerDamaged', damage);
  expect(healthComp.currentHealth).toBe(expectedHealth);
});

test('playerDamaged resets invalid armor index to default defense', () => {
  const healthComp = player.getComponent('health');
  const armorComp = player.getComponent('currentArmor');
  armorComp.armorIndex = armor.length;
  const damage = 20;
  const expectedHealth = healthComp.currentHealth - damage;
  eventEmitter.emit('playerDamaged', damage);
  expect(healthComp.currentHealth).toBe(expectedHealth);
  expect(armorComp.armorIndex).toBe(-1);
});

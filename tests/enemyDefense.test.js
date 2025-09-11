let eventEmitter;
let player;
let entityManager;
let weapons;

beforeAll(async () => {
  document.body.innerHTML = `
    <div id='controls'></div>
    <div id='text'></div>
    <div id='xpText'></div>
    <div id='healthText'></div>
    <div id='goldText'></div>
    <div id='image'></div>
    <div id='monsterName'></div>
    <div id='monsterHealth'></div>
    <div id='monsterText'></div>
    <div id='monsterHealthStat'></div>
    <div id='levelText'></div>
    <div id='monsterStats'></div>
    <div id='imageContainer'></div>
    <div id='characterPreview'></div>
    <div id='xpBarFill'></div>
  `;
  ({ eventEmitter } = await import('../eventEmitter.js'));
  ({ player, entityManager } = await import('../script.js'));
  ({ weapons } = await import('../item.js'));
  await import('../fight.js');
});

test('enemy defense reduces player damage', () => {
  const strengthComp = player.getComponent('strength');
  strengthComp.strength = 20;
  const weaponComp = player.getComponent('currentWeapon');
  weaponComp.weaponIndex = 0;
  const xpComp = player.getComponent('xp');
  xpComp.xp = 0;
  const defenseComp = player.getComponent('defense');
  defenseComp.defense = 100;
  const armorComp = player.getComponent('currentArmor');
  armorComp.armorIndex = -1;

  eventEmitter.emit('fightSmall');
  const enemyEntity = entityManager.entities.find(e => e.getComponent('name').name !== 'player');
  const enemyHealth = enemyEntity.getComponent('health');
  enemyHealth.currentHealth = 50;
  const enemyDefenseComp = enemyEntity.getComponent('defense');
  enemyDefenseComp.defense = 10;

  const playerDamage = strengthComp.strength + weapons[weaponComp.weaponIndex].power;
  const expectedHealth = 50 - Math.max(0, playerDamage - enemyDefenseComp.defense);

  eventEmitter.emit('attack');
  expect(enemyHealth.currentHealth).toBe(expectedHealth);
  eventEmitter.emit('goTown');
});

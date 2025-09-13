let eventEmitter;
let player;
let entityManager;

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
  await import('../fight.js');
});

test('monster with zero strength deals no damage', () => {
  const healthComp = player.getComponent('health');
  healthComp.maxHealth = 100;
  healthComp.currentHealth = 100;
  const strengthComp = player.getComponent('strength');
  strengthComp.strength = 0;
  eventEmitter.emit('fightSmall');
  const enemyEntity = entityManager.entities.find(e => e.getComponent('name').name !== 'player');
  enemyEntity.getComponent('strength').strength = 0;
  const realRandom = Math.random;
  Math.random = () => 0;
  eventEmitter.emit('attack');
  Math.random = realRandom;
  expect(healthComp.currentHealth).toBe(100);
  eventEmitter.emit('goTown');
});

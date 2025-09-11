import { eventEmitter } from '../eventEmitter.js';

let getXpForNextLevel;
let player;
let baseHealth;
let baseStrength;

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
  ({ getXpForNextLevel, player } = await import('../script.js'));
  const healthComp = player.getComponent('health');
  const strengthComp = player.getComponent('strength');
  baseHealth = healthComp.maxHealth;
  baseStrength = strengthComp.strength;
});

beforeEach(() => {
  const xpComp = player.getComponent('xp');
  xpComp.xp = 0;
  const levelComp = player.getComponent('level');
  levelComp.level = 1;
  const healthComp = player.getComponent('health');
  healthComp.maxHealth = baseHealth;
  healthComp.currentHealth = baseHealth;
  const strengthComp = player.getComponent('strength');
  strengthComp.strength = baseStrength;
});

test('getXpForNextLevel returns increasing values', () => {
  const values = [];
  for (let i = 1; i <= 5; i++) {
    values.push(getXpForNextLevel(i));
  }
  for (let i = 1; i < values.length; i++) {
    expect(values[i]).toBeGreaterThan(values[i - 1]);
  }
});

test('xp deduction and level increment for single level', () => {
  const xpNeeded = getXpForNextLevel(1);
  eventEmitter.emit('addXp', xpNeeded + 50);
  const xpComp = player.getComponent('xp');
  const levelComp = player.getComponent('level');
  expect(levelComp.level).toBe(2);
  expect(xpComp.xp).toBe(50);
});

test('xp deduction and level increment for multiple levels', () => {
  const xpNeeded1 = getXpForNextLevel(1);
  const xpNeeded2 = getXpForNextLevel(2);
  eventEmitter.emit('addXp', xpNeeded1 + xpNeeded2 + 25);
  const xpComp = player.getComponent('xp');
  const levelComp = player.getComponent('level');
  expect(levelComp.level).toBe(3);
  expect(xpComp.xp).toBe(25);
});


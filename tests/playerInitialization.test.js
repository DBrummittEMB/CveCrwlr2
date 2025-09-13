let initializePlayer;
let player;

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
  ({ initializePlayer, player } = await import('../script.js'));
});

beforeEach(() => {
  const healthComp = player.getComponent('health');
  healthComp.currentHealth = 100;
  healthComp.maxHealth = 100;
});

test('initializePlayer uses maxHealth when provided', () => {
  const template = { health: { currentHealth: 50, maxHealth: 120 } };
  initializePlayer(template);
  const healthComp = player.getComponent('health');
  expect(healthComp.maxHealth).toBe(120);
  expect(healthComp.currentHealth).toBe(50);
});

test('initializePlayer clamps current health to maxHealth', () => {
  const template = { health: { currentHealth: 150, maxHealth: 100 } };
  initializePlayer(template);
  const healthComp = player.getComponent('health');
  expect(healthComp.maxHealth).toBe(100);
  expect(healthComp.currentHealth).toBe(100);
});


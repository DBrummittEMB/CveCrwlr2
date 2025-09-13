let doesHit;

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
  ({ doesHit } = await import('../fight.js'));
});

describe('doesHit', () => {
  let realRandom;

  beforeEach(() => {
    realRandom = Math.random;
  });

  afterEach(() => {
    Math.random = realRandom;
  });

  test('returns false when both combatants have zero agility', () => {
    Math.random = () => 0.5;
    expect(doesHit(0, 0)).toBe(false);
  });

  test('calculates hit when defender has zero agility', () => {
    Math.random = () => 0.5;
    expect(doesHit(10, 0)).toBe(true);
  });
});

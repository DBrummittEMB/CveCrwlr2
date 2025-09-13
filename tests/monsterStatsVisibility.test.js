import { expect, test } from '@jest/globals';

test('monster stats panel toggles on fight and town', async () => {
  document.body.innerHTML = `
    <div id='text'></div>
    <div id='xpText'></div>
    <div id='healthText'></div>
    <div id='goldText'></div>
    <img id='image'/>
    <div id='levelText'></div>
    <div id='monsterStats' style='display: none;'></div>
    <div id='imageContainer'></div>
    <img id='characterPreview'/>
    <div id='xpBarFill'></div>
    <div id='monsterName'></div>
    <div id='monsterHealth'></div>
    <div id='monsterText'></div>
    <div id='monsterHealthStat'></div>
    <div id='controls'></div>
  `;

  const { eventEmitter } = await import('../eventEmitter.js');
  const locationModule = await import('../location.js');
  await import('../fight.js');

  const { goTown, monsterStats } = locationModule;

  expect(monsterStats.style.display).toBe('none');

  eventEmitter.emit('fightSmall');
  expect(monsterStats.style.display).toBe('block');

  goTown();
  expect(monsterStats.style.display).toBe('none');
});


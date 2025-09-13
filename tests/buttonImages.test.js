let goStore;
let locations;

beforeAll(async () => {
  global.Image = class {
    constructor() {
      this.src = '';
    }
  };
  document.body.innerHTML = `
    <div id='controls'></div>
    <div id='text'></div>
    <div id='xpText'></div>
    <div id='healthText'></div>
    <div id='goldText'></div>
    <img id='image'>
    <div id='imageContainer'></div>
    <img id='characterPreview'>
    <div id='xpBarFill'></div>
    <div id='monsterStats'></div>
  `;
  ({ goStore, locations } = await import('../location.js'));
});

test('store buttons show matching icons', () => {
  goStore();
  const store = locations.find(l => l.name === 'store');
  const buttons = document.querySelectorAll('#controls button');
  const images = store['button images'];
  const texts = store['button text'];
  expect(buttons.length).toBe(texts.length);
  buttons.forEach((btn, index) => {
    expect(btn.innerText).toBe(texts[index]);
    if (images[index]) {
      btn.dispatchEvent(new Event('mouseenter'));
      expect(document.getElementById('characterPreview').src).toContain(
        images[index]
      );
    }
  });
});

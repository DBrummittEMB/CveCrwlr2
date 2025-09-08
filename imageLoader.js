const imageCache = {};

// Preload images from locations, monsters, and player templates
export async function preloadImages() {
  const [locModule, monsterModule, templateModule] = await Promise.all([
    import('./location.js'),
    import('./monster.js'),
    import('./playerTemplate.js')
  ]);

  const urls = [];

  // gather location images
  locModule.locations.forEach(loc => {
    if (loc.imageUrl) {
      urls.push(loc.imageUrl);
    }
  });

  // gather monster images
  const monsters = [
    ...monsterModule.smallMonsters,
    ...monsterModule.mediumMonsters,
    ...monsterModule.bossMonsters
  ];
  monsters.forEach(monster => {
    if (monster.imageUrl) {
      urls.push(monster.imageUrl);
    }
  });

  // gather player template images
  templateModule.characterTemplates.forEach(template => {
    if (template.imageUrl) {
      urls.push(template.imageUrl);
    }
  });

  // preload and cache images
  urls.forEach(url => {
    if (!imageCache[url]) {
      const img = new Image();
      img.src = url;
      imageCache[url] = img;
    }
  });
}

// Retrieve cached image source
export function getImageUrl(url) {
  return imageCache[url]?.src || url;
}

export default {
  preloadImages,
  getImageUrl
};

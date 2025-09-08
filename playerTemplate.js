import { weapons } from './item.js';

// Preset templates for different playable character archetypes.
// Each template defines the initial stats and starting weapon for the character.
export const characterTemplates = [
  {
    name: 'Warrior',
    imageUrl: 'imgs/warrior.png',
    health: { currentHealth: 150 },
    strength: { strength: 20 },
    intelligence: { intelligence: 5 },
    gold: { gold: 100 },
    xp: { xp: 0 },
    inventory: { items: [weapons[3].name] },
  },
  {
    name: 'Mage',
    imageUrl: 'imgs/mage.png',
    health: { currentHealth: 80 },
    strength: { strength: 5 },
    intelligence: { intelligence: 25 },
    gold: { gold: 75 },
    xp: { xp: 0 },
    inventory: { items: [weapons[1].name] },
  },
  {
    name: 'Rogue',
    imageUrl: 'imgs/rogue.png',
    health: { currentHealth: 100 },
    strength: { strength: 15 },
    intelligence: { intelligence: 10 },
    gold: { gold: 60 },
    xp: { xp: 0 },
    inventory: { items: [weapons[2].name] },
  },
];

// Track which template is currently selected.
export let currentTemplate = characterTemplates[0];

// Provide a default export for compatibility with existing code expecting a default player.
export const defaultPlayer = characterTemplates[0];


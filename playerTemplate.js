import { weapons } from './item.js';

export const defaultPlayer = {
  health: { currentHealth: 100 },
  xp: { xp: 0 },
  gold: { gold: 50 },
  inventory: { items: [weapons[0].name] },
  // Add other components with their default values as needed
};

import { weapons } from './item.js';

export const defaultPlayer = {
  healthComponent: { currentHealth: 100 },
  xpComponent: { xp: 0 },
  goldComponent: { gold: 50 },
  inventoryComponent: { items: [weapons[0].name] },
  // Add other components with their default values as needed
};

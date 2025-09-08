# Functionality and Features

## Character Choice Screen
- Currently has two buttons for choosing between two characters.
- Display both character choices with starting stats and images.
- Store stats in an array similar to the monsters array.
- Allow for many characters with unique starting equipment, stats, and images.

## Stats Screen
- Present stats in two columns.
- First section: image of the chosen character and current stats (HP, gold, strength, etc.).
- Second section: gameplay statistics:
  - list of monsters killed and how many
  - total damage done
  - total clicks
  - total number of fights
  - gold earned
  - gold spent

## Inventory System and Store Overhaul
- Inventory screen lists all player items with sub-screens for:
  - usable items (e.g., health potions)
  - equipable items (armor and weapons)
  - miscellaneous or story items
- Update the store to sell more than weapons and determine what appears for sale.
- Allow the player to sell any items.
- Start the player with "fist" to represent having no weapon.
- Rework the inventory management system.

## Leveling System
- Design and implement a system for leveling up.

## Score System
- Design and implement a system for keeping score.

## Text Outputs
- Current outputs are generic. Define the game's flavor and write richer text where appropriate.

## Dynamic UI Updates
- Use event listeners for automatic UI updates, likely via an `update` event.
- Ensure the UI reflects character choices everywhere.

## Combat
- Design and implement a new combat system with additional stats.
- Add a **Use Magic** button for spells.
- Consider a context menu to choose different attacks.
- Add a button for using items during combat.
- Display a red slash image across the monster when the player hits.

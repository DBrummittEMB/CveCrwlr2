# CveCrwlr Beginner's Guide

CveCrwlr is a simple browser-based adventure game. This guide explains how anyone, even without programming experience, can play and test the game locally.

## Prerequisites
- A modern web browser such as Chrome, Firefox, or Edge.
- Python 3 (needed to run the launcher script).
- (Optional) Git if you prefer cloning the repository instead of downloading a ZIP file.

## Setup
1. **Download the game files**
   - **Option A:** On GitHub, click the green `Code` button and choose **Download ZIP**. Extract the ZIP to a folder on your computer.
   - **Option B:** If you use Git, run:
     ```bash
     git clone <repository-url>
     ```
     Then open the newly created `CveCrwlr2` folder.
2. **Launch the game**
   - **Windows:** double-click `launch_game.bat`.
   - **Mac/Linux or command line:** run `python launch_game.py`.
   - The script starts a local server and opens the game in your default browser.

## How to Play
1. On the home screen, click **Start** to begin.
2. Use the buttons to explore:
   - **Go to store** – buy health or weapons and sell your current weapon.
   - **Go to cave** – fight small or medium monsters for experience and gold.
   - **Stats / Inventory** – check your health, gold, experience, and items.
   - **Fight Boss** – challenge the boss when you are ready.
3. During combat, choose **Attack** to damage the monster, **Item** (coming soon), or **Run** to return to town.
4. If you defeat a monster, you earn experience and gold. If your health reaches zero, the **REPLAY?** buttons let you start over.

## Testing Tips
- Try buying and selling items to ensure the store works as expected.
- Fight different monster types to verify combat and rewards.
- Use the stats screen to confirm that health, gold, experience, and inventory update correctly.

Enjoy exploring CveCrwlr!

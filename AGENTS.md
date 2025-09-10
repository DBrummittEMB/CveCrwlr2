# AGENTS Instructions

- Only create or commit images in SVG format.
- Do not create or commit binary image files (e.g., PNG, JPG, GIF).

## Style Guide
- Use two spaces for indentation.
- End each statement with a semicolon.
- Prefer single quotes for strings; use double quotes only when necessary.
- Use camelCase for variable and function names.
- Leave a trailing newline at the end of each file.
- Keep line length under 100 characters.

## Coding Guide
- Write small, focused functions and modules.
- Add comments or JSDoc for nontrivial logic.
- Avoid committing commented-out or dead code.
- Run `npm test` (or any available test suite) and ensure it passes before committing.
- Commit only relevant source files; do not commit build artifacts or dependencies.
- Use descriptive commit messages summarizing the change.

## Visual Style Guide
- Keep the game as a simple text-based clicker with no animations.
- Evoke nostalgia for Windows 95, 1980s text-based PC RPGs, and early 1990s retro tech.
- Embrace a retro pixel-art aesthetic throughout the game.
- Use 'Press Start 2P', cursive as the primary font for text and UI elements.
- Set the body background to dark blue and use black panels with white text for game areas.
- Keep the main game area at 400x500 pixels, scaling via the `--scale` CSS variable.
- Render images with `image-rendering: pixelated` and keep sprites at fixed sizes (e.g., 200px square).
- Style buttons with a black background, white border, inverted hover colors, and limegreen focus outline.

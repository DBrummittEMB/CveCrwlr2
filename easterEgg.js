import { player, text } from './script.js';
import { eventEmitter } from './eventEmitter.js';

export function pickTwo() {
  pick(2);
}

/**
 * Picks a random number 8.
 * Calls the pick() function, passing 8 as the guess.
 */
export function pickEight() {
  pick(8);
}

export function pick(guess) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  let output = 'You picked ' + guess + '. Here are the random numbers:\n';
  for (let i = 0; i < 10; i++) {
    output += numbers[i] + '\n';
  }
  if (numbers.indexOf(guess) !== -1) {
    output += 'Correct! You win 20 gold!';
    eventEmitter.emit('addGold', 20);
  } else {
    output += 'Wrong! You lose 10 health!';
    eventEmitter.emit('playerDamaged', 10);
  }
  text.innerText = output;
}


import Phaser from "phaser"

// Shared bridge between React (page chrome, HUD, dialogs) and Phaser (the game canvas).
// One instance per page load — imported wherever either side needs to emit/listen.
export const gameEvents = new Phaser.Events.EventEmitter()

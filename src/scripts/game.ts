import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import * as Colyseus from "colyseus.js";

var client = new Colyseus.Client('ws://localhost:2567');

const connect = async () => {
  try {
    const room = await client.joinOrCreate("game_room");
    room.onStateChange(state => {
      console.log(state);
    })
    console.log('joined room', room.sessionId);
    room.send('pickCard', {name: 'Endorsi Jahad'})
  } catch {
    console.log('could not join room');
  }  
}

connect();

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720



const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  }
}

window.addEventListener('load', () => {
  /* const game = new Phaser.Game(config) */
})

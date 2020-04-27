import 'phaser';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import GameConfig = Phaser.Types.Core.GameConfig;
import labScene from './scenes/labScene';

const DEFAULT_WIDTH = 1920;
const DEFAULT_HEIGHT = 1080;
const GRAVITY = 1700;


const config: GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#ffffff',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, MainScene, labScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: GRAVITY }
        }
    }
};

window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});

//

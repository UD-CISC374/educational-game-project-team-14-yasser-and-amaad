import 'phaser';
import PreloadScene from './scenes/preloadScene';
import LevelOneScene from './scenes/levelOne';
import LevelTwoScene from './scenes/levelTwo';
import LevelThreeScene from './scenes/levelThree';
import MainMenu from './scenes/MainMenu'
import GameConfig = Phaser.Types.Core.GameConfig;

const DEFAULT_WIDTH = 1920;
const DEFAULT_HEIGHT = 1080;
const GRAVITY = 2000;


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
    scene: [PreloadScene, MainMenu, LevelOneScene, LevelTwoScene, LevelThreeScene],
    physics: {
        default: 'arcade',
        arcade: {   
            debug: false,
            gravity: { y: GRAVITY }
        }
    }
};

window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});

//

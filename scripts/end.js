//simple test for Pixi
PIXI.utils.sayHello();
var stageIndex = 4;

var blockList = [{"type": "blank"},{"type": "final", "color": 0xff0000, "scale": 2}];

//this creates a renderer and sets it to work inside the appropriate space
var renderer = new PIXI.autoDetectRenderer(800, 600, {resolution: 1, backgroundColor: 0x000000});
document.getElementById('gamescreen').appendChild(renderer.view);

//this creates a container to work within the renderer
var stage = new PIXI.Container();

lineMaker = new PIXI.Graphics();

var text = new PIXI.Text('THE END',{fontFamily : 'Arial', fontSize: 50, fill : 0xffffff});

text.anchor.x = 0.5;
text.anchor.y = 0.5;
text.x = renderer.width / 2;
text.y = renderer.height / 2;

stage.addChild(text);

renderer.render(stage);
update();

function update() {
    requestAnimationFrame(update);
    renderer.render(stage);
}
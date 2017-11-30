//simple test for Pixi
PIXI.utils.sayHello();
var stageIndex = 3;

var blockList = [{"type": "blue"},{"type": "grow"},{"type": "final", "color": 0x0000ff, "scale": 2}];

//this creates a renderer and sets it to work inside the appropriate space
var renderer = new PIXI.autoDetectRenderer(800, 600, {resolution: 1, backgroundColor: 0x000000});
document.getElementById('gamescreen').appendChild(renderer.view);

//this creates a container to work within the renderer
var stage = new PIXI.Container();

lineMaker = new PIXI.Graphics();

//this creates the line that represents the main block's path
lineMaker.lineStyle(5, 0xffffff);
lineMaker.moveTo(100, renderer.height/2);
lineMaker.lineTo(700, renderer.height/2);
stage.addChild(lineMaker);

//this creates the sprites for each block in the path, including the one at the end
var completeBlocks = positionBlocks(blockList);

//this calls makePlayer from game_main.js
var clickBox = makePlayer(100, renderer.height / 2, 0xff0000, 1);

//this makes the sprite interactive as a button and will cause the mouse to become the hand pointer on PCs
clickBox.interactive = true;
clickBox.buttonMode = true;

//this creates the timeline of animations the main block will go through
var tl = moveBlock(clickBox, completeBlocks, blockList);

//this sets the main block to play its animations and, when done, to check its state in comparison to the intended state
clickBox.on('pointerdown', function(){
	tl.play();
	tl.call(checkCompletion,[clickBox, blockList[blockList.length-1], stageIndex]);
});

//this adds the blocks' sprites to the screen
for(var i = 0; i < completeBlocks.length; i++){
	stage.addChild(completeBlocks[i]);
}

//this adds the sprite for the main block on screen
stage.addChild(clickBox);

renderer.render(stage);
update();

function update() {
    requestAnimationFrame(update);
    renderer.render(stage);
}
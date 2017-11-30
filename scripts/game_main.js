var urls = [
	"../html/stage1.html",
	"../html/stage2.html",
	"../html/stage3.html",
	"../html/stage4.html",
	"../html/stage5.html",
	"../html/end.html"
]

//this function creates the rectangle which will go through changes as the stages progress
function makePlayer(posX, posY, color, scale){
	//this is the graphics element which will be the base for the rectangle sprite
	var rectangle = new PIXI.Graphics();

	//this is the info needed to make the rectangle
	rectangle.posX = posX;
	rectangle.posY = posY;
	rectangle.dimX = 100;
	rectangle.dimY = 100;
	rectangle.color = 0xffffff;

	//this creates the rectangle for the sprite
	rectangle.beginFill(rectangle.color);
	rectangle.drawRect(rectangle.posX, rectangle.posY, rectangle.dimX, rectangle.dimY);
	rectangle.endFill();

	//this creates the sprite from the graphics element
	rectangle.boundsPadding = 0;
	var rectTexture = rectangle.generateCanvasTexture();
	var clickBox = new PIXI.Sprite(rectTexture);

	//this sets the anchor point for the sprite as the middle of it
	clickBox.anchor.x = 0.5;
	clickBox.anchor.y = 0.5;

	//this positions the sprite where it's needed
	clickBox.x = posX;
	clickBox.y = posY;

	//this scales the height of the sprite as needed
	clickBox.scale.y = scale;

	clickBox.tint = color;

	return clickBox;
}

function makeModifier(type, color, scale){

	//scale and color are only necessary for the final block
	if(typeof color === 'undefined'){
		color = 0;
	}
	if(typeof scale === 'undefined'){
		scale = 0;
	}

	var blockSprite;

	if(type == "shrink"){
		blockSprite = PIXI.Sprite.fromImage('../png/shrink_block.png');
	}
	else if(type == "grow"){
		blockSprite = PIXI.Sprite.fromImage('../png/grow_block.png');
	}
	else if(type == "blue"){
		blockSprite = PIXI.Sprite.fromImage('../png/blue_block.png');
	}
	else if(type == "red"){
		blockSprite = PIXI.Sprite.fromImage('../png/red_block.png');
	}
	else if(type == "green"){
		blockSprite = PIXI.Sprite.fromImage('../png/green_block.png');
	}
	else if(type == "blank"){
		blockSprite = PIXI.Sprite.fromImage('../png/blank_block.png');
		blockSprite.interactive = true;
		blockSprite.buttonMode = true;
		blockSprite.buttonIndex = 0;
		blockSprite.on('pointerdown', function(){
			blankBlockChange(blockSprite);
		});
	}
	else if(type == "final"){
		blockSprite = makePlayer(700, 300, color, scale);
		blockSprite.tint =  (blockSprite.tint & 0x999999);
	}
	return blockSprite;
}

function positionBlocks(blocksArray){

	var blockList = [];
	var positioning = 600/blocksArray.length;
	for(var i = 0; i < blocksArray.length; i++){
		var block = makeModifier(blocksArray[i].type, blocksArray[i].color, blocksArray[i].scale);
		block.anchor.x = 0.5;
		block.anchor.y = 0.5;
		block.x = positioning * (i+1) + 100;
		block.y = 300;
		blockList.push(block);
	}
	return blockList;
}

function moveBlock(playerBlock, completeList, blocksList){

	var tl = new TimelineLite({paused: true});

	for(var i = 0; i < completeList.length; i++){
		if(i == 0){
			tl.to(playerBlock, 1, {x:completeList[i].x});
		}
		else {
			tl.to(playerBlock, 1, {x:completeList[i].x}, "+=0.25");
		}
		if(blocksList[i].type == "shrink" || completeList[i].buttonIndex == 1){
			console.log(completeList[i].buttonIndex);
			tl.to(playerBlock.scale, 1, {y:"-=1", onComplete:makeInvisible, onCompleteParams:[completeList[i]]}, "+=0.25");
		}
		else if(blocksList[i].type == "grow" || completeList[i].buttonIndex == 2){
			console.log(completeList[i].buttonIndex);
			tl.to(playerBlock.scale, 1, {y:"+=1", onComplete:makeInvisible, onCompleteParams:[completeList[i]]}, "+=0.25");
		}
		else if(blocksList[i].type == "blue" || completeList[i].buttonIndex == 3){
			console.log(completeList[i].buttonIndex);
			tl.to(playerBlock, 1, {tint:"0x0000ff", onComplete:changeColor, onCompleteParams:[playerBlock, 0x0000ff]}, "+=0.25");
			tl.call(makeInvisible, [completeList[i]]);
		}
		else if(blocksList[i].type == "red" || completeList[i].buttonIndex == 4){
			console.log(completeList[i].buttonIndex);
			tl.to(playerBlock, 1, {tint:"0xff0000", onComplete:changeColor, onCompleteParams:[playerBlock, 0xff0000]}, "+=0.25");
			tl.call(makeInvisible, [completeList[i]]);
		}
		else if(blocksList[i].type == "green" || completeList[i].buttonIndex == 5){
			console.log(completeList[i].buttonIndex);
			tl.to(playerBlock, 1, {tint:"0x00ff00", onComplete:changeColor, onCompleteParams:[playerBlock, 0x00ff00]}, "+=0.25");
			tl.call(makeInvisible, [completeList[i]]);
		}
		else{
			console.log("this is wrong");
		}
	}

	return tl;
}

function changeColor(block, color){
	block.tint = color;
}

function makeInvisible(block){
	block.visible = false;
}

function blankBlockChange(block){
	if(block.buttonIndex == 0){
		var texture = PIXI.Texture.fromImage('../png/shrink_block.png');
		block.setTexture(texture);
		block.interactive = true;
		block.buttonMode = true;
		block.buttonIndex = 0;
		console.log("shrink");
	}
	else if(block.buttonIndex == 1){
		var texture = PIXI.Texture.fromImage('../png/grow_block.png');
		block.setTexture(texture);
		console.log("grow");
	}
	else if(block.buttonIndex == 2){
		var texture = PIXI.Texture.fromImage('../png/blue_block.png');
		block.setTexture(texture);
		console.log("blue");
	}
	else if(block.buttonIndex == 3){
		var texture = PIXI.Texture.fromImage('../png/red_block.png');
		block.setTexture(texture);
		console.log("red");
	}
	else if(block.buttonIndex == 4){
		var texture = PIXI.Texture.fromImage('../png/green_block.png');
		block.setTexture(texture);
		console.log("green");
	}
	else if(block.buttonIndex == 5){
		var texture = PIXI.Texture.fromImage('../png/blank_block.png');
		block.setTexture(texture);
		console.log("blank");
	}
	block.buttonIndex+=1;
	if(block.buttonIndex > 5){
		block.buttonIndex = 0;
	}
}

function checkCompletion(playerBlock, finalBlock, pageIndex){
	 var isComplete = (playerBlock.scale.y == finalBlock.scale) && (playerBlock.tint == (finalBlock.color));
	 if(isComplete){
	 		window.location.replace(urls[pageIndex+1]);
	 }
	 else{
	 	window.location.reload(false);
	 }
}
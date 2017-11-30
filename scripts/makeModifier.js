function makeModifier(type, color){

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
	else if(type == "final"){
		blockSprite = makePlayer(700, 300, color);
		blockSprite.tint = 0x999999;
	}
	return blockSprite;
}

function positionBlocks(stage, blocksArray){
	var positioning = 600/blocksArray.length;
	for(var i = 0; i < blocksArray.length; i++){
		var block = makeModifier(blocksArray[i].type, blocksArray[i].color);
		block.anchor.x = 0.5;
		block.anchor.y = 0.5;
		block.x = positioning * (i+1) + 100;
		block.y = 300;
		stage.addChild(block);
	}
}
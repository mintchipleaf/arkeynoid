var canvas = document.getElementById("game");

var manifest = {
	"images": {
		"square0":"images/square0.png",
		"square1":"images/square1.png",
		"square2":"images/square2.png",
		"square3":"images/square3.png",
		"square4":"images/square4.png"
	},
	"sounds": {
	},
	"fonts": [
	],
	"animations": {
	}
};

var game = new Splat.Game(canvas, manifest);

var score = 0;
var row1 = [4,4,4,4,4,4,4,4,4,4];
var keys1 = ["q","w","e","r","t","y","u","i","o","p"];
var row2 = [4,4,4,4,4,4,4,4,4,4];
var keys2 = ["a","s","d","f","g","h","j","k","l","semicolon"];
var row3 = [4,4,4,4,4,4,4,4,4,4];
var keys3 = ["z","x","c","v","b","n","m","comma","period","forwardslash"];


function checkKB(){
	for (var i = 0; i <= keys1.length - 1; i++) {

		if(game.keyboard.consumePressed(keys1[i]) && row1[i] > 0){
			row1[i] -= 1;
			console.log(keys1[i] + " " + row1[i]);
		}if(game.keyboard.consumePressed(keys2[i]) && row2[i] > 0){
			row2[i] -= 1;
			console.log(keys2[i] + " " + row2[i]);
		}if(game.keyboard.consumePressed(keys3[i]) && row3[i] > 0){
			row3[i] -= 1;
			console.log(keys3[i] + " " + row3[i]);
		}
	}
}

game.scenes.add("title", new Splat.Scene(canvas, function() {
	/*var playerLeftImg = game.images.get("playerLeft");
	playerLeft = new Splat.AnimatedEntity(50, canvas.height / 2  - playerLeftImg.height / 2, playerLeftImg.width, playerLeftImg.height, playerLeftImg, 0, 0);
*/
}, function(elapsedMillis) {
	/*playerLeft.move(elapsedMillis);

	playerRight.move(elapsedMillis);
*/
	/*if(waitingToStart) {
		var startTimer = this.timer("start");
		this.camera.vy = player.vy;
		player.vy = 1;
		if(startTimer > 100 && anythingWasPressed()){
			//game.sounds.play("music", true);
			this.stopTimer("start");
			startPos = player.y;
			waitingToStart = false;
		}

	}*/
/*
	if (game.keyboard.isPressed("up") && playerRight.y > 0) {
		playerRight.vy = -0.7;
	}
*/

checkKB();

/*for (var i =0; i < row1.length - 1; i++) {
	if(row1[i] != 1 && index)
	{
			//just use i as index goddamn wtf
			//check keyboard.isPressed(key1 value) if true, change that index in row1 to 1
	}
}*/

}, function(context) {
	//draw background gradient
	this.camera.drawAbsolute(context, function() {
		context.fillStyle="white";
		context.fillRect(0,0,canvas.width,canvas.height);
	});
/*
	playerLeft.draw(context); //draw player
*/

	var keyX = 0;
	for (var i =0; i < row1.length; i++) {
		//console.log(row1[i].Counted);
		context.fillStyle="red";
		//drawTiles(context);

			this.camera.drawAbsolute(context, function(){
				//context.fillStyle="green";
				//context.fillRect(25 + keyX, 100, 100, 100);
				context.drawImage(game.images.get("square"+row1[i]),25 +keyX, 100 - (10*row1[i]));
				context.fillStyle="black";
				context.font = "30px arial"
				context.fillText(keys1[i], 50 + keyX, 130)

		});
			this.camera.drawAbsolute(context, function(){
				context.fillStyle="green";
				//context.fillRect(25 + keyX, 200, 100, 100);
				context.drawImage(game.images.get("square"+row2[i]),25 +keyX, 200 - (10*row2[i]));
				context.fillStyle="black";
				context.font = "30px arial"
				context.fillText(keys2[i], 50 + keyX, 230)
			});
		
			this.camera.drawAbsolute(context, function(){
				context.fillStyle="green";
				//context.fillRect(25 + keyX, 300, 100, 100);
				context.drawImage(game.images.get("square"+row3[i]),25 +keyX, 300 - (10*row3[i]));
				context.fillStyle="black";
				context.font = "30px arial"
				context.fillText(keys3[i], 50 + keyX, 330)
			});
		
		keyX += 100;
	};
	

	this.camera.drawAbsolute(context, function() {
			context.fillStyle = "#ffffff";
			context.font = "100px arial";
			//context.fillText(score, canvas.width / 2, 100);
	});

}));
game.scenes.switchTo("loading");

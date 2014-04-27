var canvas = document.getElementById("game");

var manifest = {
	"images": {
		"square0":"images/square0.png",
		"square1":"images/square1.png",
		"square2":"images/square2.png",
		"square3":"images/square3.png",
		"square4":"images/square4.png",
		"ball":"images/ball.png"
	},
	"sounds": {
	},
	"fonts": [
	],
	"animations": {
	}
};

var game = new Splat.Game(canvas, manifest);

var paddle;
var entity;
var gameOver = false;
var score = 0;
var balls = [];
var row1 = [];
var row2 = [];
var row3 = [];
var keys1 = ["q","w","e","r","t","y","u","i","o","p"];
var keys2 = ["a","s","d","f","g","h","j","k","l","semicolon"];
var keys3 = ["z","x","c","v","b","n","m","comma","period","forwardslash"];

function setHeights(){
	row1 = [4,4,4,4,4,4,4,4,4,4];
	row2 = [4,4,4,4,4,4,4,4,4,4];
	row3 = [4,4,4,4,4,4,4,4,4,4];
}

function setTimers(scene){
	for (var i = 0; i < keys1.length; i++) {
		scene.timers[keys1[i]] = new Splat.Timer(undefined, 300, function(){this.reset()});
		scene.timers[keys2[i]] = new Splat.Timer(undefined, 300, function(){this.reset()});
		scene.timers[keys3[i]] = new Splat.Timer(undefined, 300, function(){this.reset()});
	}	
}

function checkKB(scene){
	var key;
	for (var i = 0; i < keys1.length; i++) {
			if(game.keyboard.consumePressed(keys1[i]) && row1[i] > 0){
				row1[i] -= 1;
				//console.log(keys1[i] + " " + row1[i]);
				//checkCollisions(1,i);
				key = true;
				scene.timers[keys1[i]].start();
			}if(game.keyboard.consumePressed(keys2[i]) && row2[i] > 0){
				row2[i] -= 1;
				//console.log(keys2[i] + " " + row2[i]);
				//checkCollisions(2,i);
				key = true;
				scene.timers[keys2[i]].start();
			}if(game.keyboard.consumePressed(keys3[i]) && row3[i] > 0){
				row3[i] -= 1;
				//console.log(keys3[i] + " " + row3[i]);
				//checkCollisions(3,i);
				key = true;
				scene.timers[keys3[i]].start();
			}
		if(key && gameOver){
			game.scenes.switchTo("title");
		}
	}
}

function checkTimers(scene){
	for (var i = 0; i < keys1.length; i++) {
		if(scene.timers[keys1[i]].running){
			checkCollisions(1,i);
		}if(scene.timers[keys2[i]].running){
			checkCollisions(2,i);
		}if(scene.timers[keys3[i]].running){
			checkCollisions(3,i);
		}
	}
}

function checkCollisions(row,column){
	entity = new Splat.AnimatedEntity(0, 0, 100, 140, game.images.get("square0"), 0, 0);
	entity.x = column *100;
	entity.y = (row*100) - 40;
	for (var i = 0; i < balls.length; i++)  {
		if(balls[i].collides(entity) && balls[i].vy < 0){
			collide(balls[i]);
		}
	}
	//timer?
}

function collide(ball){
	ball.vy *= -1;
	score += 1;
	if(Math.random() > 0.8){
		addBall();
	}
}

function addBall(){
	var ballImg = game.images.get("ball");
	var direction = 1;
	var speed = .3 + (Math.random() * 0.4);
	//context.drawImage(game.images.get("ball"),canvas.width / 2 - 15,canvas.height - 30);	
	var ball = new Splat.AnimatedEntity(canvas.width / 2 - ballImg.width, canvas.height -50, ballImg.height, ballImg.width, ballImg, 0, 0);
	if(balls.length == 0){
		speed = 0.5;
	}
	if(Math.random() > 0.5){
		direction = -1;
	}

	ball.vx = speed * direction;
	ball.vy = speed * -1;
	balls.push(ball);
}

game.scenes.add("title", new Splat.Scene(canvas, function() {
	balls = [];
	gameOver = false;
	addBall();
	setTimers(this);
	setHeights();
}, function(elapsedMillis) {
//scene.timers("")
this.timers.timerName = new Splat.Timer();

checkKB(this);

checkTimers(this);

var gameOverTest = true;
for (var i = 0; i < balls.length; i++){
	var b = balls[i];
	b.move(elapsedMillis);
	
	if(b.x + b.width >= canvas.width){
		b.vx *= -1;
	}if(b.x <= 0){
		b.vx *= -1;
	}if(b.y + b.height >= canvas.height){
		b.vy *= -1;
	}if(b.y > 0 && !gameOver){
		gameOverTest = false;
	}
}
if(gameOverTest){
		gameOver = true;
	}

if(gameOver){
	addBall(); //Hell yeah
}

}, function(context) {
	//draw background gradient
	this.camera.drawAbsolute(context, function() {
		context.fillStyle="black";
		context.fillRect(0,0,canvas.width,canvas.height);
	});

	var keyX = 0;
	var scene = this;
	for (var i =0; i < row1.length; i++) {
			this.camera.drawAbsolute(context, function(){
				var timer = scene.timers[keys1[i]];
				//context.fillStyle="green";
				//context.fillRect(25 + keyX, 100, 100, 100);
				if(timer.running){
					context.drawImage(game.images.get("square"+row1[i]),keyX, 100 - (10*row1[i]) - ((timer.time * .001) * 40));
					//console.log(timer.time);
				}else{
					context.drawImage(game.images.get("square"+row1[i]),keyX, 100 - (10*row1[i]));
				}
				context.fillStyle="black";
				context.font = "30px arial"
				context.fillText(keys1[i], 50 + keyX, 130)
			});
			this.camera.drawAbsolute(context, function(){
				var timer = scene.timers[keys2[i]];
				context.fillStyle="green";
				//context.fillRect(25 + keyX, 200, 100, 100);
				if(timer.running){
					context.drawImage(game.images.get("square"+row2[i]),keyX, 200 - (10*row2[i]) - ((timer.time * .001) * 40));
					//console.log(timer.time);
				}else{
					context.drawImage(game.images.get("square"+row2[i]),keyX, 200 - (10*row2[i]));
				}
				context.fillStyle="black";
				context.font = "30px arial"
				context.fillText(keys2[i], 50 + keyX, 230)
			});
		
			this.camera.drawAbsolute(context, function(){
				var timer = scene.timers[keys3[i]];
				context.fillStyle="green";
				//context.fillRect(25 + keyX, 300, 100, 100);
				if(timer.running){
					context.drawImage(game.images.get("square"+row3[i]),keyX, 300 - (10*row3[i]) - ((timer.time * .001) * 40));
					//console.log(timer.time);
				}else{
					context.drawImage(game.images.get("square"+row3[i]),keyX, 300 - (10*row3[i]));
				}
				context.fillStyle="black";
				context.font = "30px arial"
				context.fillText(keys3[i], 50 + keyX, 330)
			});
		
		keyX += 100;
	};

	for (var i = 0; i < balls.length; i++) {
		if (!balls[i].counted) {
			balls[i].draw(context);		//draw walls 
		} else {
			pickups.splice(pickups[i], 1);
		}
	}

	if(gameOver){
		//this.camera.drawAbsolute(context, function() {
			context.fillStyle = "#ffffff";
			context.font = "190px arial";
			context.fillText("Game Over", 0, canvas.height / 2 + 100);
		//});
	}

	this.camera.drawAbsolute(context, function() {
			context.fillStyle = "#ffffff";
			context.font = "50px arial";
			context.fillText(score, canvas.width / 50, 50);
	});

}));
game.scenes.switchTo("loading");

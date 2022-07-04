
let screen = document.querySelector("body");
let bg = document.querySelector("#video-bg");

let lifesBlock = document.querySelector("#lifes");
let countLifes = 5;

let score = document.querySelector("#score span");

let startBlock = document.querySelector("#start");
let startButton = document.querySelector("#begin");

let gameBlock = document.querySelector("#game");
let gamer = document.querySelector("#player");
let gamerSkin = "skin_1";

let endBlock = document.querySelector("#end");

// Show game when click on 'Start'
startButton.onclick = function() {
	startBlock.style.display = "none";
	gameBlock.style.display = "block";
	gamer.className = gamerSkin;
	createLifes();
	// Enemies creation
	createEnemy();
	setTimeout(function() {
		createEnemy();
	}, 1000);
}

// Turn on(off) music when click on 'Speaker'
let audioPlayer = document.querySelector("audio");
let soundButton = document.querySelector("#sound img");
let sound = "off"; // "on"
soundButton.onclick = function() {
	if (sound == "off") {
		soundButton.src = "images/sound_on.png";
		audioPlayer.play();
		sound = "on";
	} else {
		soundButton.src = "images/mute_sound.png";
		audioPlayer.pause();
		sound = "off";
	}
}

// Gamer movement
document.onkeydown = function(event) {
	console.dir(event);
	// Move player upward
	if (event.keyCode == 38 && gamer.offsetTop > 70) {
		gamer.style.top = gamer.offsetTop - 40 + "px";
	}
	// Move player downward
	if (event.keyCode == 40 && gamer.offsetTop < bg.clientHeight - 200) {
		gamer.style.top = gamer.offsetTop + 40 + "px";
	}
	// Show bullet
	if (event.keyCode == 32) {
		createBullet();
	}
}

// Enemy creation
function createEnemy() {
	let enemy = document.createElement("div");
	enemy.className = "enemy " + typeEnemy();
	enemy.style.top = random(150, document.querySelector("#app").clientHeight - 200) + "px";
	gameBlock.appendChild(enemy);
	moveEnemy(enemy);
}

// Enemy type creation
function typeEnemy() {
	if (random(1, 2) == 1) {
		return "type-1";
	} else {
		return "type-2";
	}
}

// Enemy movement
function moveEnemy(enemy) {
	let timerID = setInterval(function() {
		enemy.style.left = enemy.offsetLeft - 10 + "px";
		if (enemy.offsetLeft < -100) {
			enemy.remove();
			createEnemy(enemy.className);
			clearInterval(timerID);
			die();
		}
	}, 50)
}

// Bullet creation
function createBullet() {
	let bullet = document.createElement("div");
	bullet.className = "bullet";
	bullet.style.top = gamer.offsetTop + 140 + "px";
	bullet.style.left = gamer.offsetLeft + gamer.clientWidth - 25 + "px";
	gameBlock.appendChild(bullet);
	moveBullet(bullet);
}

// Bullet movement
function moveBullet(bullet) {
	let timerID = setInterval(function() {
		bullet.style.left = bullet.offsetLeft + 10 + "px";
		if (bullet.offsetLeft > screen.clientWidth) {
			bullet.remove();
			clearInterval(timerID);
		}
		isBoom(bullet);
	}, 5)
}

// Hit the enemy
function isBoom(bullet) {
	let enemy = document.querySelector(".enemy");
	if(bullet.offsetTop > enemy.offsetTop
		&& bullet.offsetTop < enemy.offsetTop + enemy.clientHeight
		&& bullet.offsetLeft > enemy.offsetLeft) {
		createBoom(enemy);
		bullet.remove();
		enemy.remove();
		score.innerText = Number(score.innerText) + 1;
		createEnemy(enemy.className);
	}
}

// Boom creation
function createBoom(enemy) {
	let boom = document.createElement("div");
	boom.className = "boom";
	boom.style.left = enemy.offsetLeft - 40 + "px";
	boom.style.top = enemy.offsetTop - 40 + "px";
	gameBlock.appendChild(boom);
	setTimeout(function() {
		boom.remove();
	}, 1000);
}

// Life loss
function die() {
	countLifes = countLifes - 1;
	if (countLifes <= 0) {
		endGame();
	}
	createLifes();
}

// Lifes recreation
function createLifes() {
	lifesBlock.innerHTML = "";
	let count = 0;
	while(count < countLifes) {
		let span = document.createElement("span");
		lifesBlock.appendChild(span);
		count += 1;
	}
}

// Gamer selection via mouse click
let selectSkin1 = document.querySelector("#skin_1");
selectSkin1.onclick = function() {
	selectSkin1.className = "selected";
	selectSkin2.className = "";
	gamerSkin = "skin_1";
}
let selectSkin2 = document.querySelector("#skin_2");
selectSkin2.onclick = function() {
	selectSkin1.className = "";
	selectSkin2.className = "selected";
	gamerSkin = "skin_2";
}

// Show game result and finish when click on 'Restart'
function endGame() {
	let endBlockScore = document.querySelector("#end h3 span");
	endBlockScore.innerText = score.innerText;
	gameBlock.style.display = "none";
	endBlock.style.display = "block";
	let restartButton = document.querySelector("#end button");
	restartButton.onclick = function() {
		location.reload();
	}
}

// Random number creation
function random(min, max) {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}
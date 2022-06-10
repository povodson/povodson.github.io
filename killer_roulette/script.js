var countShot = 0;
var bulletPosition = random(1, 6);
var btnShot = document.querySelector('#shot');
var currentPlayer = 1;
var baraban = document.querySelector('#baraban');

btnShot.onclick = start;

// the first click on button "start"
function start() {
	btnShot.className = 'off';
	var bullet = document.querySelector('#bullet');
		bullet.style.display = 'block';

	var revolver = document.querySelector('#revolver');
		revolver.style.display = 'block';

	btnShot.onclick = '';
	var rotate = 0;
	var timer = setInterval(function() {
		rotate += 10;
		baraban.style.transform = 'rotate(' + rotate + 'deg)';
		if (rotate > 300) {
			bullet.style.display = 'none';
		}
		if (rotate == 720) {
			clearInterval(timer);
			btnShot.innerText = 'Зробити постріл';
			btnShot.onclick = shot;

			btnShot.className = '';
		}
	}, 50)
}

// define the bullet position
function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

// a click on button "make a shot"
var rotateBaraban = 0;
function shot() {
	countShot += 1;

	if (bulletPosition == countShot) {
		var blood = document.createElement('div');
			blood.id = 'blood';
		var player = document.querySelector('#player' + currentPlayer);
			player.appendChild(blood);

		endGame();

	} else {

		// change gun position
		if (currentPlayer == 1) {
			rotationRight();
			currentPlayer = 2;
		} else {
			rotationLeft();
			currentPlayer = 1;
		}

		// a small rotation
		var rotate = rotateBaraban;
		var timer = setInterval(function() {
			rotate += 10;
			baraban.style.transform = 'rotate(' + rotate + 'deg)';

			if (rotate == rotateBaraban + 60) {
				clearInterval(timer);
				rotateBaraban = rotate;
			}

		}, 10)
	}
}

// change gun position to the right
function rotationRight() {
	revolver.style.background = 'url("images/revolver-right.png") no-repeat';
}

// change gun position to the left
function rotationLeft() {
	revolver.style.background = 'url("images/revolver-left.png") no-repeat';
}

// the end
function endGame() {
	alert('GAME OVER');
	btnShot.innerText = 'Наново';
	btnShot.onclick = restart;
}

// a click on button "again"
function restart() {
	location.reload();
}
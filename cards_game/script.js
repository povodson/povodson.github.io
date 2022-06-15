var cardsField = document.querySelector("#cards");

var resetBlock = document.querySelector("#reset");

var resetBtn = document.querySelector("#reset-btn");

var countCards = 16;

// mixed paired cards set
var images = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
images.sort(() => Math.random() - 0.5);
images = images.slice(0, 8);
images = images.concat(images);
images.sort(() => Math.random() - 0.5);

var deletedCards = 0;

var selected = [];

var pause = false;

console.dir(images);

// create cards in the game field
for (var i = 0; i < countCards; i += 1) {
	var li = document.createElement("li");
		li.id = i;
	cardsField.appendChild(li);
}

// open the card when click
cardsField.onclick = function(event) {
	if (pause == false) {

		var element = event.target;

		if (element.tagName == "LI" && element.className != "active") {
			selected.push(element);
			element.className = "active";
			var img = images[element.id];
			element.style.backgroundImage = "url(images/" + img + ".png)";

			if (selected.length == 2) {
				pause = true;
				if (images[selected[0].id] == images[selected[1].id]) {
					selected[0].style.visibility = "hidden";
					selected[1].style.visibility = "hidden";
					deletedCards += 2;
				}
				setTimeout(refreshCards, 600);

			}
		}

	}
}

// close all cards
function refreshCards() {
	for (var i = 0; i < countCards; i += 1) {
		cardsField.children[i].className = "";
		cardsField.children[i].style.backgroundImage = "url(images/back.png)";
	}
	if (deletedCards == countCards) {
		resetBlock.style.display = "block";
	}
	selected = [];
	pause = false;
}

// restart the game
resetBtn.onclick = function() {
	location.reload();
}
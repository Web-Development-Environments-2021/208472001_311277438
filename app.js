let context;
let shape = new Object();
let board;
let score;
let pac_color;
let start_time;
let time_elapsed;
let interval;
let current;
let last_press_direction;

$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	let cnt = 100;
	let food_remain = 5;
	let pacman_remain = 1;
	start_time = new Date();
	for (let i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (let j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				let randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	Draw(4)
	while (food_remain > 0) {
		let emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 150);
}

function findRandomEmptyCell(board) {
	let i = Math.floor(Math.random() * 9 + 1);
	let j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Drawplayer(center, x){
	if (x == 1){
		context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // up
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		
		context.beginPath();
		context.arc(center.x + 17, center.y , 5, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
		last_press_direction = 1;
	}
	if (x == 2){
		context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI); // down
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		
		context.beginPath();
		context.arc(center.x + 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
		last_press_direction = 2;
	}
	if (x == 3){
		context.arc(center.x, center.y, 30, 1.20 * Math.PI, 0.85 * Math.PI); // left
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		
		context.beginPath();
		context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
		last_press_direction = 3;
	}
	if (x == 4){
		context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // right
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		
		context.beginPath();
		context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
		last_press_direction = 4;
	}
}


function Draw(x) {
	let moves = [1, 2, 3, 4];
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			let center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				if (moves.includes(x,0))
					Drawplayer(center, x);
				else
					Drawplayer(center, last_press_direction);
				

			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {

	board[shape.i][shape.j] = 0;
	let x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) { //up
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) { //down
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) { //left
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) { //right
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	let currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score >= 100) {
		window.clearInterval(interval);
		window.alert("Winner!!!");
	} else {
		Draw(x);
	}
}

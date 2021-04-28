let context;
let shape = new Object();
var mons1 = new Object();
var mons2 = new Object();
var mons3 = new Object();
var mons4 = new Object();
let board;
let score;
let pacman_remain;
let pac_color;
let start_time;
let time_elapsed;
let interval;
let current;
let last_press_direction;
let Up_key;
let Down_key;
let Right_key;
let left_key;
let Balls_amount;
let color_balls;
let game_time;
let moster_amount;
let user_login;
let pass_login;
var usernames = ["k"];
var passwords = ["k"];
let threeColors = new Array();
var audio = new Audio("pics/pacmanSong.mp3");
var movingInterval;
var i1 = 5;
var j1 = 5;
var secBoard = new Array();
var choice;
var sum_balls;
var ateShape = false;
var inGame = false;
var playMusic = false;
var existBalls = false;
var found_m = false;
var choice_m;
var distance;
var min_distance;
var movingMon1Interval;
var movingMon2Interval;
var movingMon3Interval;
var movingMon4Interval;
let clockImage = new Image();
let monster = new Image();
let fiftyPoints = new Image;
let lives = new Image;
let slow = new Image();
let nameUpKey;
let nameDownKey;
let nameLeftKey;
let nameRightKey;


$(document).ready(function() {
	slow.src = 'pics/slow.png';
	lives.src = 'pics/lives.png';
	fiftyPoints.src = 'pics/fiftyPoints.png';
	monster.src = 'pics/monster.png';
	context = canvas.getContext("2d");

});

function showAboutDialog() {
	$('#aboutt').show();
	$(document).mouseup(function (e) {


		if (!$("#aboutt").is(e.target) && $("#aboutt").has(e.target).length === 0) {
			$("#aboutt").hide();
	}
	});
	$(document).on('keydown', function (e) {
		if (e.keyCode == 27) {
			$('#aboutt').hide();
		}
	});
	$('#closeAbout').click(function () {
		$('#aboutt').hide()
	})
}

$(document).ready(function() {
	$('#regForm').submit(function(e) {
	e.preventDefault();
	var Fname = $('#Fname').val();
	var Lname = $('#Lname').val();
	var username = $('#myUsername').val();
	var email = $('#email').val();
	var password = $('#myPassword').val();
	var birth = $('#start').val();
	var isValidForm = true;

	$(".error").remove();

	if (username.length < 1) {
		$('#myUsername').after('<span class="error"><br>This field is required</span>');
		isValidForm = false;
	}
	if (Fname.length < 1) {
		$('#Fname').after('<span class="error"><br>This field is required</span>');
		isValidForm = false;
	} 
	else {
		var validName = /^[a-zA-Z]+$/.test(Fname);
		if (!validName)
		{
			$('#Fname').after('<span class="error"><br>First name can only contain letters</span>');
			isValidForm = false;
		}
	}
	if (Lname.length < 1) {
		$('#Lname').after('<span class="error"><br>This field is required</span>');
		isValidForm = false;
	} 
	else {
		var validName = /^[a-zA-Z]+$/.test(Lname);
		if (!validName)
		{
			$('#Lname').after('<span class="error"><br>Last name can only contain letters</span>');
			isValidForm = false;
		}
	}
	if (birth.length < 1) {
		$('#start').after('<span class="error"><br>This field is required</span>');
		isValidForm = false;
	}
	if (email.length < 1) {
		$('#email').after('<span class="error"><br>This field is required</span>');
		isValidForm = false;
	} else {
		var regEx = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var validEmail = regEx.test(email);
		if (!validEmail) {
			$('#email').after('<span class="error"><br>Enter a valid email</span>');
			isValidForm = false;
		}
	}
	if (password.length < 1) {
		$('#myPassword').after('<span class="error"><br>This field is required</span>');
		isValidForm = false;
		} else if (password.length < 6) {
				$('#myPassword').after('<span class="error"><br>Password must be at least 6 characters long</span>');
				isValidForm = false;
			} else {
				var regexPass1 = /^[a-zA-Z]+$/;
				var onlyLettersCheck = regexPass1.test(password);
				var regexPass2 = /^[0-9]+$/;
				var onlyNumbersCheck = regexPass2.test(password);
				if (onlyLettersCheck || onlyNumbersCheck)
				{
					$('#myPassword').after('<span class="error"><br>Password must include both numbers and letters</span>');
					isValidForm = false;
				}
			}
	if (isValidForm)
	{
		usernames.push(username);
		passwords.push(password);
		scrennUsernameRegister();
		playMusic = false;
		inGame = false;
		audio.pause();
		audio.currentTime = 0
		show('gameSettings','welcome', 'register', 'login', 'game');
	}


});
});

// setting
function upKeyListener(event){
	Up_key = event.keyCode;
	nameUpKey = event.key;
	$('#Up_key').val(nameUpKey);
}
function downKeyListener(event){
	Down_key = event.keyCode;
	nameDownKey = event.key;
	$('#Down_key').val(nameDownKey);
}
function leftKeyListener(event){
	left_key = event.keyCode;
	nameLeftKey = event.key;
	$('#left_key').val(nameLeftKey);
}
function rightKeyListener(event){
	Right_key = event.keyCode;
	nameRightKey = event.key;
	$('#Right_key').val(nameRightKey);
}

$(document).ready(function () {
	$('#form_settings').submit(function (e) {
		e.preventDefault();
		let isValidForm = true;
		Balls_amount = $('#Balls_amount').val();
		game_time = $('#game_time').val();
		moster_amount = $('#moster_amount').val();

		if ($('#small_balls_amount').val() == $('#medium_balls_amount').val() || $('#small_balls_amount').val() == $('#big_balls_amount').val() || $('#big_balls_amount').val() == $('#medium_balls_amount').val()) {
			alert('Must be 3 different colors');
			isValidForm = false;
		}

		threeColors[0] = $('#small_balls_amount').val();
		threeColors[1] = $('#medium_balls_amount').val();
		threeColors[2] = $('#big_balls_amount').val();

		$(".error").remove();

		if (Up_key == undefined) {
			Up_key = 38;
			nameUpKey = "ArrowUp";
		}
		if (Down_key == undefined) {
			Down_key = 40;
			nameDownKey = "ArrowDown";
		}
		if (Right_key == undefined) {
			Right_key = 39;
			nameRightKey = "ArrowRight";
		}
		if (left_key == undefined) {
			left_key = 37;
			nameLeftKey = "ArrowLeft";
		}

		if (Up_key == Down_key || Up_key == left_key || Up_key == Right_key || Down_key == left_key || Down_key == Right_key || left_key == Right_key) {
			alert("Cant play with same keys");
			isValidForm = false;
		}

		let Balls_amountNumber = /^\d+$/.test(Balls_amount);
		if (!Balls_amountNumber) {
			$('#Balls_amount').after('<span class="error"><br>Must be a number</span>');
			isValidForm = false;
		}
		else if (Math.floor(Balls_amount) < 50 || Math.floor(Balls_amount) > 90) {
			$('#Balls_amount').after('<span class="error"><br>Number must be between 60 - 90</span>');
			isValidForm = false;
		}

		let game_timeNumber = /^\d+$/.test(game_time);
		if (!game_timeNumber) {
			$('#game_time').after('<span class="error"><br>Must be a number</span>');
			isValidForm = false;
		}
		else if (Math.floor(game_time) < 60) {
			$('#game_time').after('<span class="error"><br>Number must atlist 60</span>');
			isValidForm = false;
		}

		if (isValidForm) {
			inGame = false;
			playMusic = false;
			audio.pause();
			audio.currentTime = 0
			show('game', 'welcome', 'register', 'gameSettings', 'login');
			Start();
		}
	});
});

function randomsettings(){
	// alert("DSfsdf");
	$("#moster_amount")[0].selectedIndex = randomNumberFromRange(0, 3);
	randomNumberFromRangeBalls(0, 5);
	$("#game_time").val(randomNumberFromRange(60, 80));
	$("#Balls_amount").val(randomNumberFromRange(50, 90));

	nameUpKey = "ArrowUp";
	nameDownKey = "ArrowDown";
	nameRightKey = "ArrowRight";
	nameLeftKey = "ArrowLeft";

	$('#Up_key').val('ArrowUp');
	$('#Down_key').val('ArrowDown');
	$('#left_key').val('ArrowLeft');
	$('#Right_key').val('ArrowRight');
}

function randomNumberFromRange(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}



function randomNumberFromRangeBalls(min, max) {
	let first = randomNumberFromRange(min, max);
	$("#big_balls_amount")[0].selectedIndex = first;
	let second = randomNumberFromRange(min, max);
	let third = randomNumberFromRange(min, max);
	while (true){
		second = randomNumberFromRange(min, max);
		third = randomNumberFromRange(min, max);
		$("#medium_balls_amount")[0].selectedIndex = second;
		$("#small_balls_amount")[0].selectedIndex = third;
		if($('#big_balls_amount').val() != $('#medium_balls_amount').val() && $('#big_balls_amount').val() != $('#small_balls_amount').val() && $('#medium_balls_amount').val() != $('#small_balls_amount').val())
		break;
	}
	
	Up_key = 38;
	Down_key = 40;
	left_key = 37;
	Right_key = 39;
}

function checkIfExist() {
	user_login = document.getElementById("usernameLogin").value;
	pass_login = document.getElementById("passwordLogin").value;
	if (user_login.length == 0 || pass_login.length == 0) {
		alert("Failed to Login. Please fill the fields")
		return;
	}
	for (var i = 0; i < usernames.length; i++) {
		if (user_login == usernames[i] && pass_login == passwords[i]) {
			scrennUsernameLogin();
			inGame = false;
			show('gameSettings', 'welcome', 'register', 'login', 'game');
			return;
		}
	}
	alert('Failed to Login. Incorrect username or password');
}

function stopGame(){
	inGame = false;
	playMusic = false;
	audio.pause();
	audio.currentTime = 0
	document.getElementById("music").value = "Stop Music";
}

function setMusic(){
	if (playMusic == false)	{
		playMusic = true;
		audio.play();
		document.getElementById("music").value = "Stop Music";
	}
	else if (playMusic == true)	{
		playMusic = false;
		audio.pause();
		document.getElementById("music").value = "Play Music";
	}
}

function setValuesToSettings(){
	$("#upKey").val(nameUpKey);
	$("#downKey").val(nameDownKey);
	$("#leftKey").val(nameLeftKey);
	$("#rightKey").val(nameRightKey);
	$("#ballsAmount").val(Balls_amount);
	$("#firstBall").val(threeColors[0]);
	$("#secondBall").val(threeColors[1]);
	$("#thirdBall").val(threeColors[2]);
	$("#timeInSeconds").val(game_time);
	$("#monsterAmount").val(moster_amount);
}

//0 - empty
//1 - ball color1
//2 - ball color2
//3 - ball color3
//4 - wall
//5 - player
//6 - monsters
//7 - movingShape - extra 50 points
//8 - medicines
//9 - slow motion

function Start() {

	setValuesToSettings();
	audio.currentTime = 0
	audio.play();
	playMusic = true;
	board = new Array();
	inGame = true;
	score = 0;
	pac_color = "yellow";
	pacman_remain = 5;
	ateShape = false;
	start_time = new Date();

	for (let i = 0; i < 10; i++) {
		board[i] = new Array();
		for (let j = 0; j < 10; j++) {
			board[i][j] = 0;
		}
	}

	for (let i = 0; i < 10; i++) {
		secBoard[i] = new Array();
		for (let j = 0; j < 10; j++) {
			secBoard[i][j] = 0;
		}
	}

	setObjects();
	i1 = 5;
	j1 = 5;
	secBoard[i1][j1] = 7; //moving shape
	window.clearInterval(movingInterval);
	movingInterval = setInterval(movingShape, 800);
	setMonsters();
	setPlayerPosition();
	setBalls();
	Draw(4);

	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
}

function setPlayerPosition()
{
	window.clearInterval(interval);
	interval = setInterval(UpdatePosition, 160);

	let emptyCell = findRandomEmptyCell();
	board[emptyCell[0]][emptyCell[1]] = 5;
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];
	
}


function setMonsters() {

	window.clearInterval(movingMon1Interval);
	window.clearInterval(movingMon2Interval);
	window.clearInterval(movingMon3Interval);
	window.clearInterval(movingMon4Interval);

	secBoard[0][0] = 6;
	mons1.i = 0;
	mons1.j = 0;
	clearInterval(movingMon1Interval);
	movingMon1Interval = setInterval( function() {movingMonster(mons1.i, mons1.j, 1); }, 800);

	if (moster_amount == 2)
	{
		secBoard[0][9] = 6;
		mons2.i = 0;
		mons2.j = 9;
		movingMon2Interval = setInterval( function() {movingMonster(mons2.i, mons2.j, 2); }, 800);

	}
	else if (moster_amount == 3)
	{
		secBoard[0][9] = 6;
		secBoard[9][0] = 6;
		mons2.i = 0;
		mons2.j = 9;
		mons3.i = 9;
		mons3.j = 0;
		movingMon2Interval = setInterval( function() {movingMonster(mons2.i, mons2.j, 2); }, 800);
		movingMon3Interval = setInterval( function() {movingMonster(mons3.i, mons3.j, 3); }, 800);
	}
	else if (moster_amount == 4)
	{
		secBoard[0][9] = 6;
		secBoard[9][0] = 6;
		secBoard[9][9] = 6;
		mons2.i = 0;
		mons2.j = 9;
		mons3.i = 9;
		mons3.j = 0;
		mons4.i = 9;
		mons4.j = 9;
		movingMon2Interval = setInterval( function() {movingMonster(mons2.i, mons2.j, 2); }, 800);
		movingMon3Interval = setInterval( function() {movingMonster(mons3.i, mons3.j, 3); }, 800);
		movingMon4Interval = setInterval( function() {movingMonster(mons4.i, mons4.j, 4); }, 800);
	}

}

function setObjects() {

	//set walls	
	board[2][2] = 4;
	board[2][3] = 4;
	board[2][4] = 4;
	board[6][2] = 4;
	board[7][2] = 4;
	board[8][2] = 4;
	board[7][5] = 4;
	board[7][6] = 4;
	board[7][7] = 4;

	//set extra life object
	board[1][6] = 8;
	board[9][1] = 8;

	//set slow motion object
	board[8][8] = 9;

}

function setBalls() {

	let small_balls_amount = Math.floor(Balls_amount * 0.1);
	let medium_balls_amount = Math.floor(Balls_amount * 0.3);
	let big_balls_amount = Balls_amount - small_balls_amount - medium_balls_amount;
	sum_balls = small_balls_amount + medium_balls_amount + big_balls_amount;

	for(let k1 = 0; k1 < small_balls_amount; k1++){
		let emptyCell = findRandomEmptyCell();
		board[emptyCell[0]][emptyCell[1]] = 1;
	}
	for(let k2 = 0; k2 < medium_balls_amount; k2++){
		let emptyCell = findRandomEmptyCell();
		board[emptyCell[0]][emptyCell[1]] = 2;
	}
	for(let k3 = 0; k3 < big_balls_amount; k3++){
		let emptyCell = findRandomEmptyCell();
		board[emptyCell[0]][emptyCell[1]] = 3;
	}
}


function findRandomEmptyCell() {

	let i;
	let j;

	do {
		i = Math.floor(Math.random() * 10);
		j = Math.floor(Math.random() * 10);
	} while (board[i][j] != 0);

	return [i, j];
}

function GetKeyPressed() {

	if (keysDown[Up_key]) { // up
		return 1;
	}
	if (keysDown[Down_key]) { // down
		return 2;
	}
	if (keysDown[left_key]) { // left
		return 3;
	}
	if (keysDown[Right_key]) { // right
		return 4;
	}
}

function Drawplayer(center, x){
	if (x == 1){
		context.arc(center.x, center.y, 21, 1.65 * Math.PI, 1.35 * Math.PI); // up
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		
		context.beginPath();
		context.arc(center.x + 17, center.y , 3, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
		last_press_direction = 1;
	}
	if (x == 2){
		context.arc(center.x, center.y, 21, 0.65 * Math.PI, 0.35 * Math.PI); // down
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		
		context.beginPath();
		context.arc(center.x + 15, center.y - 5, 3, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
		last_press_direction = 2;
	}
	if (x == 3){
		context.arc(center.x, center.y, 21, 1.20 * Math.PI, 0.85 * Math.PI); // left
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		
		context.beginPath();
		context.arc(center.x + 5, center.y - 15, 3, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
		last_press_direction = 3;
	}
	if (x == 4){
		context.arc(center.x, center.y, 21, 0.15 * Math.PI, 1.85 * Math.PI); 
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		
		context.beginPath();
		context.arc(center.x + 5, center.y - 15, 3, 0, 2 * Math.PI); // circle
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
	lblpacman_remain.value = pacman_remain;
	existBalls = false;
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			center = new Object();
			center.x = i * 50 + 30;
			center.y = j * 50 + 30;
			if (board[i][j] == 5) {
				context.beginPath();
				if (moves.includes(x,0))
					Drawplayer(center, x);
				else
					Drawplayer(center, last_press_direction);
			} else if (secBoard[i][j] == 6) {
					context.beginPath();
					context.drawImage(monster, center.x - 20, center.y - 25, 40, 40);
					context.fillStyle = "#FF0000"; //color
					context.fill();
			}else if (secBoard[i][j] == 7){
				context.beginPath();
				context.drawImage(fiftyPoints, center.x - 25, center.y - 25, 40, 40);
				context.fillStyle = "green"; //color
				context.fill();
			} else if (board[i][j] == 8){
				context.beginPath();
				context.drawImage(lives, center.x - 25, center.y - 25, 40, 40);
				context.fillStyle = "purple"; //color
				context.fill();
			} else if (board[i][j] == 9){
				context.beginPath();
				context.drawImage(slow, center.x - 25, center.y - 25, 40, 40);
				context.fillStyle = "orange"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI);
				context.fillStyle = threeColors[0]; 
				context.fill();
				existBalls = true;
			} else if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI);
				context.fillStyle = threeColors[1]; 
				context.fill();
				existBalls = true;
			} else if (board[i][j] == 3) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI);
				context.fillStyle = threeColors[2];
				context.fill();	
				existBalls = true;	
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 50, 50);
				context.fillStyle = "#0F1852"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	
	board[shape.i][shape.j] = 0; //clear player position
	let x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) { //up
			if (secBoard[shape.i][shape.j - 1] == 7) {
				if (board[shape.i[shape.j - 1] != 0])
					sum_balls -= 1;
				ateShape = true;
				score += 50;
				board[shape.i][shape.j - 1] = 0;
				secBoard[shape.i][shape.j - 1] = 0;
				window.clearInterval(movingInterval);
			}
			else if (secBoard[shape.i][shape.j - 1] == 6){
				pacman_remain --;
				score -= 10;
				secBoard[shape.i][shape.j - 1] = 0;
				clearMonsters(); //clear monsters positions
				setMonsters();
				setPlayerPosition();
			}
			else if (board[shape.i][shape.j - 1] == 8){
				pacman_remain ++;
				board[shape.i][shape.j - 1] = 0;
			}
			else if (board[shape.i][shape.j - 1] == 9){
				slowMotionMonsters()
				board[shape.i][shape.j - 1] = 0;
			}
			else
				shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) { //down
			if (secBoard[shape.i][shape.j + 1] == 7) {
				if (board[shape.i][shape.j + 1] != 0)
					sum_balls -= 1;
				ateShape = true;
				score += 50;
				board[shape.i][shape.j + 1] = 0;
				secBoard[shape.i][shape.j + 1] = 0;
				window.clearInterval(movingInterval);
			}
			else if (secBoard[shape.i][shape.j + 1] == 6){
				pacman_remain --;
				score -= 10;
				secBoard[shape.i][shape.j + 1] = 0;
				clearMonsters(); //clear monsters positions
				setMonsters();
				setPlayerPosition();
			}
			else if (board[shape.i][shape.j + 1] == 8){
				pacman_remain ++;
				board[shape.i][shape.j + 1] = 0;
			}
			else if (board[shape.i][shape.j + 1] == 9){
				slowMotionMonsters();
				board[shape.i][shape.j + 1] = 0;
			}
			else
				shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) { //left
			if (secBoard[shape.i - 1][shape.j] == 7) {
				if (board[shape.i - 1[shape.j] != 0])
					sum_balls -= 1;
				ateShape = true;
				score += 50;
				board[shape.i - 1][shape.j] = 0;
				secBoard[shape.i - 1][shape.j] = 0;
				window.clearInterval(movingInterval);
			}
			else if (secBoard[shape.i - 1][shape.j] == 6){
				pacman_remain --;
				score -= 10;
				secBoard[shape.i - 1][shape.j] = 0;
				clearMonsters(); //clear monsters positions
				setMonsters();
				setPlayerPosition();
			}
			else if (board[shape.i - 1][shape.j] == 8){
				pacman_remain ++;
				board[shape.i - 1][shape.j] = 0;
			}
			else if (board[shape.i - 1][shape.j] == 9){
				slowMotionMonsters();
				board[shape.i - 1][shape.j] = 0;
			}
			else
				shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) { //right
			if (secBoard[shape.i + 1][shape.j] == 7) {
				if (board[shape.i + 1[shape.j] != 0])
					sum_balls -= 1;
				ateShape = true;
				score += 50;
				board[shape.i + 1][shape.j] = 0;
				secBoard[shape.i + 1][shape.j] = 0;
				window.clearInterval(movingInterval);
			}
			else if (secBoard[shape.i + 1][shape.j] == 6){
				pacman_remain --;
				score -= 10;
				secBoard[shape.i + 1][shape.j] = 0;
				clearMonsters(); //clear monsters positions
				setMonsters();
				setPlayerPosition();
			}
			else if (board[shape.i + 1][shape.j] == 8){
				pacman_remain ++;
				board[shape.i + 1][shape.j] = 0;
			}
			else if (board[shape.i + 1][shape.j] == 9){
				slowMotionMonsters();
				board[shape.i + 1][shape.j] = 0;

			}
			else
				shape.i++;
		}
	}


	if (board[shape.i][shape.j] == 1) {
		score += 25;
		sum_balls -= 1;
	} else if (board[shape.i][shape.j] == 2) {
		score += 15;
		sum_balls -= 1;
	} else if (board[shape.i][shape.j] == 3) {
		score += 5;
		sum_balls -= 1;
	}

	board[shape.i][shape.j] = 5;
	let currentTime = new Date();
	time_elapsed = game_time - (currentTime - start_time) / 1000;
	time_elapsed = Math.round(time_elapsed, 1);
	if (score <= 100 && time_elapsed <= 0 && inGame) {
		window.clearInterval(interval);
		window.alert("You are better than " + score + " points!");
		inGame = false;
	}
	else if (score >= 100 && time_elapsed <= 0 && inGame) {
		window.clearInterval(interval);
		window.alert("Winner!!!");
		inGame = false;
	} 
	else if (pacman_remain == 0 && inGame){
		window.clearInterval(interval);
		window.alert("Loser!");
		inGame = false;
	}
	else if (sum_balls <= 1 && !existBalls && inGame)
	{
		window.clearInterval(interval);
		window.alert("Winner!!!");
		inGame = false;
	} 

	if (!inGame)
	{
		window.clearInterval(movingMon1Interval);
		window.clearInterval(movingMon2Interval);
		window.clearInterval(movingMon3Interval);
		window.clearInterval(movingMon4Interval);
	}

	Draw(x);

}
function slowMotionMonsters()
{
	window.clearInterval(movingMon1Interval);
	movingMon1Interval = setInterval( function() {movingMonster(mons1.i, mons1.j, 1); }, 1800);

	if (moster_amount == 2)
	{
		window.clearInterval(movingMon2Interval);
		movingMon2Interval = setInterval( function() {movingMonster(mons2.i, mons2.j, 2); }, 1800);
	}
	else if (moster_amount == 3)
	{
		window.clearInterval(movingMon2Interval);
		window.clearInterval(movingMon3Interval);
		movingMon2Interval = setInterval( function() {movingMonster(mons2.i, mons2.j, 2); }, 1800);
		movingMon3Interval = setInterval( function() {movingMonster(mons3.i, mons3.j, 3); }, 1800);
	}
	else if (moster_amount == 4)
	{
		window.clearInterval(movingMon2Interval);
		window.clearInterval(movingMon3Interval);
		window.clearInterval(movingMon4Interval);
		movingMon2Interval = setInterval( function() {movingMonster(mons2.i, mons2.j, 2); }, 1800);
		movingMon3Interval = setInterval( function() {movingMonster(mons3.i, mons3.j, 3); }, 1800);
		movingMon4Interval = setInterval( function() {movingMonster(mons4.i, mons4.j, 4); }, 1800);
	}
}

function clearMonsters()
{

	secBoard[mons1.i][mons1.j] = 0;

	if (moster_amount == 2)
	{
		secBoard[mons2.i][mons2.j] = 0;
	}
	else if (moster_amount == 3)
	{
		secBoard[mons2.i][mons2.j] = 0;
		secBoard[mons3.i][mons3.j] = 0;
	}
	else if (moster_amount == 4)
	{
		secBoard[mons2.i][mons2.j] = 0;
		secBoard[mons3.i][mons3.j] = 0;
		secBoard[mons4.i][mons4.j] = 0;
	}
}

function movingMonster(i2, j2, k2)
{

	secBoard[i2][j2] = 0;
	min_distance = Number.MAX_VALUE;
	
	findBesttMonsterMove(i2, j2);
	doTheMonsterMove(i2, j2, k2);

}

function findBesttMonsterMove(i2, j2)
{
	//choice = 1 - up
	//choice = 2 - down
	//choice = 3 - left
	//choice = 4 - right

	if (j2 > 0 && board[i2][j2-1] != 4 && secBoard[i2][j2-1] != 6) //check up
	{
		min_distance = Math.sqrt(Math.pow((i2-shape.i),2)+Math.pow((j2-1-shape.j),2));
		choice_m = 1;
	}
	if (j2 < 9 && board[i2][j2+1] != 4 && secBoard[i2][j2+1] != 6) //check down
	{
		distance = Math.sqrt(Math.pow((i2-shape.i),2)+Math.pow((j2+1-shape.j),2));
		if (distance < min_distance)
		{
			min_distance = distance;
			choice_m = 2;
		}
	}
	if (i2 > 0 && board[i2-1][j2] != 4 && secBoard[i2-1][j2] != 6) //check left
	{
		distance = Math.sqrt(Math.pow((i2-1-shape.i),2)+Math.pow((j2-shape.j),2));
		if (distance < min_distance)
		{
			min_distance = distance;
			choice_m = 3;
		}
	}
	if (i2 < 9 && board[i2+1][j2] != 4 && secBoard[i2+1][j2] != 6) //check right
	{
		distance = Math.sqrt(Math.pow((i2+1-shape.i),2)+Math.pow((j2-shape.j),2));
		if (distance < min_distance)
		{
			min_distance = distance;
			choice_m = 4;
		}
	}
}

function doTheMonsterMove(i2, j2, k2) {

	//k2 = 1 monster1
	//k2 = 2 monster2
	//k2 = 3 monster3
	//k2 = 4 monster4

	if (choice_m == 1) //go up
	{
		j2-=1;
		secBoard[i2][j2] = 6;
		if (k2 == 1)
			mons1.j-=1;
		else if (k2 == 2)
			mons2.j-=1;
		else if (k2 == 3)
			mons3.j-=1;
		else if (k2 == 4)
			mons4.j-=1;
			
	}
	else if (choice_m == 2) //go down
	{
		j2+=1;
		secBoard[i2][j2] = 6;
		if (k2 == 1)
			mons1.j+=1;
		else if (k2 == 2)
			mons2.j+=1;
		else if (k2 == 3)
			mons3.j+=1;
		else if (k2 == 4)
			mons4.j+=1;

	}
	else if (choice_m == 3) //go left
	{
		i2-=1;
		secBoard[i2][j2] = 6;
		if (k2 == 1)
			mons1.i-=1;
		else if (k2 == 2)
			mons2.i-=1;
		else if (k2 == 3)
			mons3.i-=1;
		else if (k2 == 4)
			mons4.i-=1;
		
	}
	else if (choice_m == 4) // - go right
	{
		i2+=1;
		secBoard[i2][j2] = 6;
		if (k2 == 1)
			mons1.i+=1;
		else if (k2 == 2)
			mons2.i+=1;
		else if (k2 == 3)
			mons3.i+=1;
		else if (k2 == 4)
			mons4.i+=1;
	}

	if (i2 == shape.i && j2 == shape.j)
	{
		board[i2][j2] = 0; //clear playerposition
		setPlayerPosition();
		clearMonsters(); //clear monsters positions
		setMonsters();
		pacman_remain --;
		score -= 10;
	}
}

function movingShape() {

	found = false;
	secBoard[i1][j1] = 0;

	do {
		choice = Math.floor(Math.random() * 4 + 1);

		if (choice == 1) //up
		{
			if (j1 > 0 && board[i1][j1-1] != 4 && board[i1][j1-1] != 5)
			{
				j1 -= 1;
				secBoard[i1][j1] = 7;
				found = true;
			}
		}
		else if (choice == 2) //down
		{
			if (j1 < 9 && board[i1][j1+1] != 4 && board[i1][j1+1] != 5)
			{
				j1 += 1;
				secBoard[i1][j1] = 7;
				found = true;
			}
		}
		else if (choice == 3) //left
		{
			if (i1 > 0 && board[i1-1][j1] != 4 && board[i1-1][j1] != 5)
			{
				i1 -= 1;
				secBoard[i1][j1] = 7;
				found = true;
			}
		}
		else if (choice == 4) //right
		{
			if (i1 < 9 && board[i1+1][j1] != 4 && board[i1+1][j1] != 5)
			{
				i1 += 1;
				secBoard[i1][j1] = 7;
				found = true;
			}
		}
	} while (!found)
}

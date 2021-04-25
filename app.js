let context;
let shape = new Object();
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
let threeColors =new Array();
var audio = new Audio("pics/blingbling.mp3");
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
var endGame = false;

function aboutt(){
	$(function () {
		$("#dialog_show").click(function () {
			//Use Jquery load function
			$("#div_content2").load("TimerTest.aspx");
			$("#div_content2").dialog({
				modal: true,
				buttons: {
					Ok: function () {
						$(this).dialog("close");
					}
				}
			});
		});
	});
}



	$(document).ready(function() {
		$('#regForm').submit(function(e) {
		e.preventDefault();
		var name = $('#name').val();
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
		if (name.length < 1) {
			$('#name').after('<span class="error"><br>This field is required</span>');
			isValidForm = false;
		} 
		else {
			var validName = /^[a-zA-Z]+$/.test(name);
			if (!validName)
			{
				$('#name').after('<span class="error"><br>Full name can only contain letters</span>');
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
			} else 
			{
				if (password.length < 6)
				{
					$('#myPassword').after('<span class="error"><br>Password must be at least 6 characters long</span>');
					isValidForm = false;
				}
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
			show('gameSettings','welcome', 'register', 'login', 'about', 'game');
		}

	});
});

// setting

$(document).ready(function() {
	$('#form_settings').submit(function(e) {
	e.preventDefault();
	let isValidForm = true;

	Up_key = $('#Up_key').val(); 
	Down_key = $('#Down_key').val(); 
	Right_key = $('#Right_key').val(); 
	left_key = $('#left_key').val(); 
	Balls_amount = $('#Balls_amount').val();
	game_time = $('#game_time').val();
	moster_amount = $('#moster_amount').val();
	let counterKeys = 0;

	if($('#small_balls_amount').val() == $('#medium_balls_amount').val() || $('#small_balls_amount').val() == $('#big_balls_amount').val() || $('#big_balls_amount').val() == $('#medium_balls_amount').val()){
		alert('Must be 3 different colors');
		isValidForm = false;
	}

	threeColors[0] = $('#small_balls_amount').val();
	threeColors[1] = $('#medium_balls_amount').val();
	threeColors[2] = $('#big_balls_amount').val();

	$(".error").remove();

	if (Up_key.length == 1 ) {
		counterKeys++;		}
	if (Down_key.length == 1) {
		counterKeys++;		}
	if (Right_key.length == 1) {
		counterKeys++;		}
	if (left_key.length == 1) {
		counterKeys++;
	}
	if(counterKeys == 0){
		Up_key = 38;
		Down_key = 40;
		left_key = 37;
		Right_key = 39;
	}
	else if (counterKeys == 4) {
		Up_key = Up_key.toUpperCase().charCodeAt(0);
		Down_key =Down_key.toUpperCase().charCodeAt(0);
		left_key = left_key.toUpperCase().charCodeAt(0);
		Right_key = Right_key.toUpperCase().charCodeAt(0);
	}
	else{
		$('#Up_key').after('<span class="error"><br>Must be one key</span>');
		$('#Down_key').after('<span class="error"><br>Must be one key</span>');
		$('#Right_key').after('<span class="error"><br>Must be one key</span>');
		$('#left_key').after('<span class="error"><br>Must be one key</span>');
		isValidForm = false;
	}


	let Balls_amountNumber = /^\d+$/.test(Balls_amount);
	if (!Balls_amountNumber)
	{
		$('#Balls_amount').after('<span class="error"><br>Must be a number</span>');
		isValidForm = false;
	}
	else if (Math.floor(Balls_amount) < 50 || Math.floor(Balls_amount) > 90){
		$('#Balls_amount').after('<span class="error"><br>Number must be between 60 - 90</span>');
		isValidForm = false;
	}

	let game_timeNumber = /^\d+$/.test(game_time);
	if (!game_timeNumber)
	{
		$('#game_time').after('<span class="error"><br>Must be a number</span>');
		isValidForm = false;
	}
	else if (Math.floor(game_time) < 60){
		$('#game_time').after('<span class="error"><br>Number must atlist 60</span>');
		isValidForm = false;
	}
		
		if (isValidForm)
		{
			inGame = false;
			playMusic = false;
			audio.pause();
			audio.currentTime = 0
			show('game','welcome', 'register', 'gameSettings', 'about', 'login');
			Start();			
		}
	});
});



function randomsettings(){
	// alert("DSfsdf");
    $("#moster_amount")[0].selectedIndex = randomNumberFromRange(0, 3);
	randomNumberFromRangeBalls(0, 4);
	$("#game_time").val(randomNumberFromRange(60, 80));
	$("#Balls_amount").val(randomNumberFromRange(50, 90));

}


function randomNumberFromRange(min,max)
{
    return  Math.floor(Math.random()*(max-min+1)+min);
}

function randomNumberFromRangeBalls(min,max)
{
	let first = randomNumberFromRange(min, max);
	let second = randomNumberFromRange(min, max);
	let third = randomNumberFromRange(min, max);
    while (first == second || first == third || second == third){
		second = randomNumberFromRange(min, max);
		third = randomNumberFromRange(min, max);
	}

	$("#big_balls_amount")[0].selectedIndex = first;
	$("#medium_balls_amount")[0].selectedIndex = second;
	$("#small_balls_amount")[0].selectedIndex = third;

	Up_key = 38;
	Down_key =40;
	left_key = 37;
	Right_key = 39;
}


function checkIfExist()
{
	user_login = document.getElementById("usernameLogin").value;
	pass_login = document.getElementById("passwordLogin").value;
	if (user_login.length == 0 || pass_login.length == 0)
	{
		alert("Failed to Login. Please fill the fields")
		return;
	}
	for (var i = 0; i < usernames.length; i++) {
			if (user_login == usernames[i] && pass_login == passwords[i]) 
			{
				scrennUsernameLogin();
				inGame = false;
				show('gameSettings','welcome', 'register', 'login', 'about', 'game');
				return;
			} 
		}
		alert('Failed to Login. Incorrect username or password');
}

function stopGame()
{
	inGame = false;
	playMusic = false;
	audio.pause();
	audio.currentTime = 0
	if (!playMusic)
	document.getElementById("music").value = "Stop Music";
}

function setMusic()
{
	if (playMusic == false)
	{
		playMusic = true;
		audio.play();
		document.getElementById("music").value = "Stop Music";
	}
	else if (playMusic == true)
	{
		playMusic = false;
		audio.pause();
		document.getElementById("music").value = "Play Music";
	}
}

//before
//0 - empty
//1 - ball
//2 - player
//4 - wall

//now
//0 - empty
//1 - ball color1
//2 - ball color2
//3 - ball color3
//4 - wall
//5 - player
//6 - monster1, monster2, monster3, monster4
//7 - movingShape - extra 50 points
//8 - medicines
//9 - slow motion


function Start() {

	context = canvas.getContext("2d");
	audio.currentTime = 0
	audio.play();
	playMusic = true;
	board = new Array();
	inGame = true;
	score = 0;
	pac_color = "yellow";
	pacman_remain = 5;
	ateShape = false;
	endGame = false;
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
	setMonsters();


	let emptyCell = findRandomEmptyCell(); //set player
	board[emptyCell[0]][emptyCell[1]] = 5;
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];


	i1 = 5;
	j1 = 5;
	secBoard[i1][j1] = 7; //moving shape
	window.clearInterval(movingInterval);
	movingInterval = setInterval(movingShape, 800);
	Draw(4)

	setBalls();

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

	window.clearInterval(interval);
	interval = setInterval(UpdatePosition, 160);
}

function setMonsters() {

	if (moster_amount == 1)
	{
		board[0][0] = 6;
	}
	else if (moster_amount == 2)
	{
		board[0][0] = 6;
		board[0][9] = 6;
	}
	else if (moster_amount == 3)
	{
		board[0][0] = 6;
		board[0][9] = 6;
		board[9][0] = 6;
	}
	else // monster amount = 4
	{
		board[0][0] = 6;
		board[0][9] = 6;
		board[9][0] = 6;
		board[9][9] = 6;
	}

}

function setObjects() {

	board[1][3] = 4;
	board[2][2] = 4;
	board[2][3] = 4;
	board[2][4] = 4;
	board[2][5] = 4;
	board[3][5] = 4;
	board[7][4] = 4;
	board[3][6] = 4;
	board[3][7] = 4;
	board[7][2] = 4;
	board[8][2] = 4;
	board[8][4] = 4;
	board[8][1] = 4;
	board[6][4] = 4;
	board[7][6] = 4;
	board[7][7] = 4;
	board[7][8] = 4;
	board[8][6] = 4;
	board[9][6] = 4;

	board[1][4] = 8;
	board[9][2] = 8;
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
		context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); 
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
	lblpacman_remain.value = pacman_remain;
	existBalls = false;
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 5) {
				context.beginPath();
				if (moves.includes(x,0))
					Drawplayer(center, x);
				else
					Drawplayer(center, last_press_direction);
			} else if (secBoard[i][j] == 7){
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "green"; //color
				context.fill();
			} else if (board[i][j] == 8){
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "purple"; //color
				context.fill();
			} else if (board[i][j] == 9){
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "orange"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI);
				context.fillStyle = threeColors[0]; 
				context.fill();
				existBalls = true;
			} else if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI);
				context.fillStyle = threeColors[1]; 
				context.fill();
				existBalls = true;
			} else if (board[i][j] == 3) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI);
				context.fillStyle = threeColors[2];
				context.fill();	
				existBalls = true;	
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			} else if (board[i][j] == 6) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "#FF0000"; //color
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
			if (secBoard[shape.i][shape.j - 1] == 7) {
				if (board[shape.i[shape.j - 1] != 0])
					sum_balls -= 1;
				ateShape = true;
				score += 50;
				board[shape.i][shape.j - 1] = 0;
				secBoard[shape.i][shape.j - 1] = 0;
				window.clearInterval(movingInterval);
			}
			else if (board[shape.i][shape.j - 1] == 6){
				pacman_remain --;
				score -= 10;
				board[shape.i][shape.j - 1] = 0;
			}
			else if (board[shape.i][shape.j - 1] == 8){
				pacman_remain ++;
				board[shape.i][shape.j - 1] = 0;
			}
			else if (board[shape.i][shape.j - 1] == 9){
				if (!ateShape)
				{
					window.clearInterval(movingInterval);
					movingInterval = setInterval(movingShape, 2000);
				}
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
			else if (board[shape.i][shape.j + 1] == 6){
				pacman_remain --;
				score -= 10;
				board[shape.i][shape.j + 1] = 0;
			}
			else if (board[shape.i][shape.j + 1] == 8){
				pacman_remain ++;
				board[shape.i][shape.j + 1] = 0;
			}
			else if (board[shape.i][shape.j + 1] == 9){
				if (!ateShape)
				{
					window.clearInterval(movingInterval);
					movingInterval = setInterval(movingShape, 2000);
				}
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
			else if (board[shape.i - 1][shape.j] == 6){
				pacman_remain --;
				score -= 10;
				board[shape.i - 1][shape.j] = 0;
			}
			else if (board[shape.i - 1][shape.j] == 8){
				pacman_remain ++;
				board[shape.i - 1][shape.j] = 0;
			}
			else if (board[shape.i - 1][shape.j] == 9){
				if (!ateShape)
				{
					window.clearInterval(movingInterval);
					movingInterval = window.setInterval(movingShape, 2000);
				}
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
			else if (board[shape.i + 1][shape.j] == 6){
				pacman_remain --;
				score -= 10;
				board[shape.i + 1][shape.j] = 0;
			}
			else if (board[shape.i + 1][shape.j] == 8){
				pacman_remain ++;
				board[shape.i + 1][shape.j] = 0;
			}
			else if (board[shape.i + 1][shape.j] == 9){
				if (!ateShape)
				{
					window.clearInterval(movingInterval);
					movingInterval = setInterval(movingShape, 2000);
				}
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
	}
	else if (score >= 100 && time_elapsed <= 0 && inGame) {
		window.clearInterval(interval);
		window.alert("Winner!!!");
	} 
	else if (pacman_remain == 0 && inGame){
		window.clearInterval(interval);
		window.alert("Loser!");
	}
	else if (sum_balls <= 1 && !existBalls && inGame)
	{
		window.clearInterval(interval);
		window.alert("Winner!!!");
	} 
	else {
		Draw(x);
	}
}


function movingShape() {

	found = false;
	secBoard[i1][j1] = 0;

	do {
		choice = Math.floor(Math.random() * 4 + 1);

		if (choice == 1) //up
		{
			if (j1 > 0 && board[i1][j1-1] != 4 && board[i1][j1-1] != 5 && board[i1][j1-1] != 6)
			{
				j1 -= 1;
				secBoard[i1][j1] = 7;
				found = true;
			}
		}
		else if (choice == 2) //down
		{
			if (j1 < 9 && board[i1][j1+1] != 4 && board[i1][j1+1] != 5 && board[i1][j1+1] != 6)
			{
				j1 += 1;
				secBoard[i1][j1] = 7;
				found = true;
			}
		}
		else if (choice == 3) //left
		{
			if (i1 > 0 && board[i1-1][j1] != 4 && board[i1-1][j1] != 5 && board[i1-1][j1] != 6)
			{
				i1 -= 1;
				secBoard[i1][j1] = 7;
				found = true;
			}
		}
		else if (choice == 4) //right
		{
			if (i1 < 9 && board[i1+1][j1] != 4 && board[i1+1][j1] != 5 && board[i1+1][j1] != 6)
			{
				i1 += 1;
				secBoard[i1][j1] = 7;
				found = true;
			}
		}
	} while (!found)
	

}
  

 

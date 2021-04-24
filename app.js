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
let red;
let blue;
let green;
let black;
let purple;
let pink;
let user_login;
let pass_login;
var usernames = ["k"];
var passwords = ["k"];
let threeColors =new Array();
var audio = new Audio("pics/blingbling.mp3");
var list = [];
var movingShape;
// var col = "#b5e61d";
let center = new Object();
var i1 = 5;
var j1 = 5;
var secBoard = new Array();

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
		let colorsNumber = 0;

		if($("#Red").prop('checked') == true){
			red = "red";
			threeColors[colorsNumber] = red;
			colorsNumber = colorsNumber + 1;
		}
		if($("#Blue").prop('checked') == true){
			blue = "blue";
			threeColors[colorsNumber] = blue;
			colorsNumber = colorsNumber + 1;
		}
		if($("#Green").prop('checked') == true){
			green = "green";
			threeColors[colorsNumber] = green;
			colorsNumber = colorsNumber + 1;
		}
		if($("#Black").prop('checked') == true){
			black = "black";
			threeColors[colorsNumber] = black;
			colorsNumber = colorsNumber + 1;
		}
		if($("#Purple").prop('checked') == true){
			purple = "purple";
			threeColors[colorsNumber] = purple;
			colorsNumber = colorsNumber + 1;
		}
		if($("#Pink").prop('checked') == true){
			pink = "pink";
			threeColors[colorsNumber] = pink;
			colorsNumber = colorsNumber + 1;
		}

		$(".error").remove();
	
		if (Up_key.length != 1 ) {
			$('#Up_key').after('<span class="error"><br>Must be one key</span>');
			isValidForm = false;		}
		if (Down_key.length != 1) {
			$('#Down_key').after('<span class="error"><br>Must be one key</span>');
			isValidForm = false;		}
		if (Right_key.length != 1) {
			$('#Right_key').after('<span class="error"><br>Must be one key</span>');
			isValidForm = false;		}
		if (left_key.length != 1) {
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
		if (!Balls_amountNumber)
		{
			$('#game_time').after('<span class="error"><br>Must be a number</span>');
			isValidForm = false;
		}
		else if (Math.floor(game_time) < 60){
			$('#game_time').after('<span class="error"><br>Number must atlist 60</span>');
			isValidForm = false;
		}
		
		if(colorsNumber != 3){
			$('#colorNumber').after('<span class="error"><br>Must be exactly 3 colors!</span>');
			isValidForm = false;
		}
		
		if (isValidForm)
		{
			show('game','welcome', 'register', 'gameSettings', 'about', 'login');
			context = canvas.getContext("2d");
			Start();
		}
	});
});


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
				show('gameSettings','welcome', 'register', 'login', 'about', 'game');
				return;
			} 
		}
		alert('Failed to Login. Incorrect username or password');
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


function Start() {
	// audio.play();
	board = new Array();
	score = 0;
	pac_color = "yellow";
	pacman_remain = 5;
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

	setWalls();
	setBalls();
	setMonsters();

	let emptyCell = findRandomEmptyCell(); //set player
	board[emptyCell[0]][emptyCell[1]] = 5;
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];

	secBoard[i1][j1] = 7; //moving shape
	setInterval(movingShape, 1000);
	Draw(4)

	
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

function setWalls() {

	board[1][3] = 4;
	board[2][2] = 4;
	board[2][3] = 4;
	board[2][4] = 4;
	board[2][5] = 4;
	board[3][5] = 4;
	// board[4][5] = 4;
	board[6][5] = 4;
	board[7][4] = 4;
	board[3][6] = 4;
	board[3][7] = 4;
	board[7][2] = 4;
	board[8][2] = 4;
	board[8][1] = 4;
	board[6][4] = 4;
	board[7][6] = 4;
	board[7][7] = 4;
	board[8][6] = 4;
	board[9][6] = 4;

}

function setBalls() {

	let small_balls_amount = Math.floor(Balls_amount * 0.1);
	let medium_balls_amount = Math.floor(Balls_amount * 0.3);
	let big_balls_amount = Balls_amount - small_balls_amount - medium_balls_amount;

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
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	} while (board[i][j] == 4);

	return [i, j];
}

function GetKeyPressed() {
	// var up1 = up.which || up.keyCode;
	// var down1 = down.which || down.keyCode;
	// var left1 = left.which || left.keyCode;
	// var right1 = right.which || right.keyCode;

	// alert(up1);
	if (keysDown[38]) { // up
		return 1;
	}
	if (keysDown[40]) { // down
		return 2;
	}
	if (keysDown[37]) { // left
		return 3;
	}
	if (keysDown[39]) { // right
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
				// context.clearReact(prevCenterX - 30, prevCenterY - 30, 60, 60);
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "green"; //color
				context.fill();
				// prevCenterX = center.x;
				// prevCenterY = center.y;
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI);
				context.fillStyle = threeColors[0]; 
				context.fill();
			} else if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI);
				context.fillStyle = threeColors[1]; 
				context.fill();
			} else if (board[i][j] == 3) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI);
				context.fillStyle = threeColors[2];
				context.fill();		
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
			if (board[shape.i][shape.j - 1] == 6){
				pacman_remain --;
				score -= 10;
				board[shape.i][shape.j - 1] = 0;
			}
			else
				shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) { //down
			if (board[shape.i][shape.j + 1] == 6){
				pacman_remain --;
				score -= 10;
				board[shape.i][shape.j + 1] = 0;
			}
			else
				shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) { //left
			if (board[shape.i - 1][shape.j] == 6){
				pacman_remain --;
				score -= 10;
				board[shape.i - 1][shape.j] = 0;
			}
			else
				shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) { //right
			if (board[shape.i + 1][shape.j] == 6){
				pacman_remain --;
				score -= 10;
				board[shape.i + 1][shape.j] = 0;
			}
			else
				shape.i++;
		}
	}
	if( pacman_remain == 0){
		window.clearInterval(interval);
		window.alert("Loser!");
	}

	if (board[shape.i][shape.j] == 1) {
		score += 25;
	} else if (board[shape.i][shape.j] == 2) {
		score += 15;
	} else if (board[shape.i][shape.j] == 3) {
		score += 5;
	}
	board[shape.i][shape.j] = 5;
	let currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 100 && time_elapsed >= game_time) {
		window.clearInterval(interval);
		window.alert("You are better than " + score + " points!");
	}
	if (score >= 100 && time_elapsed >= game_time) {
		window.clearInterval(interval);
		window.alert("Winner!!!");
	} else {
		Draw(x);
	}
}


	function movingShape() {

		var choice;

		secBoard[i1][j1] = 0;

		foundNext = false;

		do{
			choice = Math.floor(Math.random() * 4 + 1);

			if (choice == 1) //up
			{
				if (j1 > 0 && board[i1][j1-1] != 4 && board[i1][j1-1] != 5 && board[i1][j1-1] != 6)
				{
					j1 -= 1;
					secBoard[i1][j1] = 7;
					foundNext = true;
				}
			}
			else if (choice == 2) //down
			{
				if (j1 < 9 && board[i1][j1+1] != 4 && board[i1][j1+1] != 5 && board[i1][j1+1] != 6)
				{
					j1 += 1;
					secBoard[i1][j1] = 7;
					foundNext = true;
				}
			}
			else if (choice == 3) //left
			{
				if (i1 > 0 && board[i1-1][j1] != 4 && board[i1-1][j1] != 5 && board[i1-1][j1] != 6)
				{
					i1--;
					secBoard[i1][j1] = 7;
					foundNext = true;
				}
			}
			else if (choice == 4) //right
			{
				if (i1 < 9 && board[i1+1][j1] != 4 && board[i1+1][j1] != 5 && board[i1+1][j1] != 6)
				{
					i1++;
					secBoard[i1][j1] = 7;
					foundNext = true;
				}
			}
		} while (!foundNext)
		

	}
  

 

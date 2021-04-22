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
			show('gameSettings','welcome', 'register', 'login', 'about', 'game');
		}

	});
});

// setting

$(document).ready(function() {
		$('#form_settings').submit(function(e) {
		e.preventDefault();
		let isValidForm = true;
	
		Up_key = $('#Up_key').val(); //
		Down_key = $('#Down_key').val(); //
		Right_key = $('#Right_key').val(); //
		left_key = $('#left_key').val(); //
		Balls_amount = $('#Balls_amount').val();//
		game_time = $('#game_time').val();//
		moster_amount = $('#moster_amount').val();
		let colorsNumber = 0;

		if($("#Red").prop('checked') == true){
			red = "red";
			colorsNumber = colorsNumber + 1;
		}
		if($("#Blue").prop('checked') == true){
			blue = "blue";
			colorsNumber = colorsNumber + 1;
		}
		if($("#Green").prop('checked') == true){
			green = "green";
			colorsNumber = colorsNumber + 1;
		}
		if($("#Black").prop('checked') == true){
			black = "black";
			colorsNumber = colorsNumber + 1;
		}
		if($("#Purple").prop('checked') == true){
			purple = "purple";
			colorsNumber = colorsNumber + 1;
		}
		if($("#Pink").prop('checked') == true){
			pink = "pink";
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
		else if (Number(Balls_amount) < 50 || Number(Balls_amount) > 90){
			$('#Balls_amount').after('<span class="error"><br>Number must be between 60 - 90</span>');
			isValidForm = false;
		}

		let game_timeNumber = /^\d+$/.test(game_time);
		if (!Balls_amountNumber)
		{
			$('#game_time').after('<span class="error"><br>Must be a number</span>');
			isValidForm = false;
		}
		else if (Number(game_time) < 60){
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
	user_login = document.getElementById("username").value;
	pass_login = document.getElementById("password").value;
	if (user_login.length == 0 || pass_login.length == 0)
	{
		alert("Failed to Login. Please fill the fields")
		return;
	}
	for (var i = 0; i < usernames.length; i++) {
			if (user_login == usernames[i] && pass_login == passwords[i]) {
			show('gameSettings','welcome', 'register', 'login', 'about', 'game');
			return;
			} 
		}
		alert('Failed to Login. Incorrect username or password');
}



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
	interval = setInterval(UpdatePosition, 160);
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

//now
//0 - empty
//1 - ball
//2 - player
//4 - wall

//needs to be
//0 - empty
//1 - ball color1
//2 - ball color2
//3 - ball color3
//4 - wall
//5 - player

//6 - monster1
//7 - monster2
//8 - monster3
//9 - monster4
//or
//6 - 

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

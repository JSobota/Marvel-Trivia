// Make a variable array with Multiple questions
//create multiple answers for each question
//create correct answer/ list as correct array arrangement
//make an array to hold the gif images
//create varriables for current questions, correct answer, incorrect answer, answered, and unanswered
//create a variable for seconds and time
// creat a user select variable
// make a group of messages that respond to answers
//create a click event for start and start over button




var triviaQuestions = [{
	question: "What is the name of the man who created the Marvel characters Spider-Man, Hulk, & The Fantastic Four?",
	answerList:["Stan Lee", "Mark Zuckerberg", "Jim Lee", "John Romita Sr"],
	answer: 0
},{
	question:"What triggered the 'Civil-War' storyline in the comic-book series?",
	answerList:["Tony Stark Kills Captain America", "Captain America pledges allegence to Hydra", "Wolverine Kills Proffesor X","An Elementary School Blows Up"],
	answer: 3
},{
	question: "Captain America's real name is?",
	answerList:["Tony Stark", "Bruce Banner", "Chris Evans", "Steve Rodgers"],
	answer: 3
},{
	question: "Which character does NOT have the ability to regenerate limbs and organs?",
	answerList:["Deadpool", "Wolverine", "Magneto","Sabertooth"],
	answer: 2
},{
	question: "Spider-Man first appeared in what comic-book issue?",
	answerList:["Amazing Spider-Man #1", "Amazing Fantasy #15", "Marvel Comics #5", "Tales to Astonish #7"],
	answer: 1
},{
	question:"Iron-Man convinces which character to reveal his secret identiy in the Civil War comic series?",
	answerList: ["Captain America", "Black Widow", "Spider-Man", "The Punisher"],
	answer: 2
},{
	question: "Which character is known as 'The Man Without Fear'?",
	answerList: ["Daredevil", "Ghost Rider", "Doctor Strange", "Vision"],
	answer: 0
},{
	question: "Who said originally dawned the phrase 'With Great Power, there must also come Great Responsibility'?",
	answerList: ["Spider-Man", "Mary Jane Watson", "Uncle Ben", "Aunt May"],
	answer: 2
},{
	question: "What character is NOT part of the Marvel Comics Universe?",
	answerList: ["Rocket Racoon",  "Crimson Tornado", "Howard the Duck", "Cosmo the dog"],
	answer: 1
},{
	question: "What is the name of Dr. Stephen Strange cape?",
	answerList: [ "Cloak of Levitation", "Cape of Cod", "The Cloak of Agamoto", "Dark Force Dimensional Cape"],
	answer: 0
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}











var timer = document.getElementById("timer");
var questionContainer = document.getElementById("question-container");
var questionTitle = document.getElementById("question-title");
var answerChoices = document.getElementById("answer-choices");
var endScreen = document.getElementById("end-screen");
var nameInput = document.getElementById("name-input");
var submitBtn = document.getElementById('submit-btn');
var startScreen = document.getElementById("start-screen");
var score = document.getElementById("score");
var correctWrong = document.getElementById("correct-wrong");
var userInitials = document.getElementById("user-initials");
var timeLeft = 60;
var questionIndex = 0;
var timerState;
var quizQuestions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
    answer: "Parentheses"
  },
  {
    title: "What does HTML stand for?",
    choices: ["Hyper Text Markup Language", "Home Tool Markup Languag", "Hyperlinks and Text Markup Language", "Home and Text Makeup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    title: "Choose the correct HTML tag for the largest heading.",
    choices: ["H1", "Head", "Heading", "H6"],
    answer: "H1"
  },
  {
    title: "How can you make a list that lists the items with numbers?",
    choices: ["Dl", "Ul", "Ol", "List"],
    answer: "Ol"
  },
  {
    title: "CSS stands for",
    choices: ["Cascade style sheets", "Color and style sheets", "Cascading style sheets", "None of the above"],
    answer: "Cascading style sheets"
  },
  {
    title: "Which of the following is the correct syntax for referring the external style sheet?",
    choices: ["<style src = example.css>", "<style src = 'example.css' >", "<stylesheet> example.css </stylesheet>", "<link rel='stylesheet' type='text/css' href='example.css'>"],
    answer: "<link rel='stylesheet' type='text/css' href='example.css'>"
  },
  {
    title: "The CSS property used to make the text bold is",
    choices: ["font-weight : bold", "weight: bold", "font: bold", "style: bold"],
    answer: ""
  },
  {
    title: "Which built-in method returns the index within the calling String object of the first occurrence of the specified value?",
    choices: ["getIndex()", "location()", "indexOf()", "None of the above"],
    answer: "indexOf()"
  },
  {
    title: "All user-defined objects and built-in objects are descendants of an object called Object?",
    choices: ["true", "false"],
    answer: "true"
  }
]

function startQuiz() {
    startScreen.setAttribute("class", "hidden");
    questionContainer.removeAttribute("class", "hidden");
    timerState = setInterval(function(){
        timeLeft -= 1;
        timer.textContent=timeLeft;
        if (timeLeft <= 0){
            clearInterval(timerState);
            stopQuiz();
        }
    } ,1000);
    // Call display questions
    displayQuestions();
}

function displayQuestions() {
    answerChoices.innerHTML = "";
    var currentQuestion = quizQuestions[questionIndex];
    questionTitle.textContent = currentQuestion.title;
    currentQuestion.choices.forEach(function(choice){
         var choiceBtn = document.createElement("button");
         choiceBtn.textContent = choice;
         choiceBtn.setAttribute("value", choice);
         // Add click event here to check answer
         choiceBtn.onclick = checkAnswer;
         answerChoices.append(choiceBtn);
    })
}

function checkAnswer() {
    if (this.value === quizQuestions[questionIndex].answer){
        document.getElementById("result").innerHTML = "Correct!";
    } else {
        document.getElementById("result").innerHTML = "Wrong!";
        timeLeft -= 10;
        timer.textContent = timeLeft;
    }
    questionIndex++;
    if (questionIndex === quizQuestions.length){
        stopQuiz();
    } else {
        displayQuestions();
    }
}

function stopQuiz() {
    questionContainer.setAttribute("class","hidden");
    endScreen.removeAttribute("class","hidden");
    clearInterval(timerState);
    score.textContent = Math.round(timeLeft * 1.6667);
}

function saveScore() {
    userInitials.setAttribute("class", "hidden");
    var savedScores = localStorage.getItem("gameScores") || [];
    var newScore = {
        score: timeLeft,
        name: nameInput.value
    };
    savedScores.push(newScore);
    window.localStorage.setItem("gameScores", JSON.stringify(savedScores));
}
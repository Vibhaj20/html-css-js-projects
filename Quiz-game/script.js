//DOM elements
const startScreen=document.getElementById("start-screen");

const quizScreen=document.getElementById("quiz-screen");
const resultScreen=document.getElementById("result-screen");
const startButton=document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];
//quiz start var

let currentQuestionindex=0;
let score=0;
let answerDisabled=false;

totalQuestionsSpan.textContent=quizQuestions.length;
maxScoreSpan.textContent=quizQuestions.length;

//event listeners
startButton.addEventListener("click",startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    //reset vars
    currentQuestionindex=0;
    score=0;
    scoreSpan.textContent=score;
    //show quiz screen
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    showQuestion();

}

function showQuestion(){
    answerDisabled=false;
    const currentQuestion=quizQuestions[currentQuestionindex];
    currentQuestionSpan.textContent=currentQuestionindex+1;
    const progressPercent =(currentQuestionindex/ quizQuestions.length)*100;
    progressBar.style.width=progressPercent+"%";

    questionText.textContent=currentQuestion.question;
    // explain this 
    answersContainer.innerHTML="";

    currentQuestion.answers.forEach( answers => {
        const button =document.createElement("button");
        button.textContent=answers.text;
        button.classList.add("answer-btn");

     button.dataset.correct=answers.correct;
     button.addEventListener("click",selectAnswer);
     answersContainer.appendChild(button);
    })
} 
function selectAnswer(event){
  //optimization check
    if(answerDisabled) return;
    answerDisabled=true;

    const selectedbutton = event.target;
    const isCorrect = selectedbutton.dataset.correct==="true";
    Array.from(answersContainer.children).forEach(button=>{
      if(button.dataset.correct==="true"){
        button.classList.add("correct");
      }
      else if(button===selectedbutton){
        button.classList.add("wrong");
      }
      
    });
    if(isCorrect){
      score++;
      scoreSpan.textContent=score;
    }
    setTimeout(()=>{
      currentQuestionindex++;

      if(currentQuestionindex< quizQuestions.length){
        showQuestion();
      }else{
        showresults();
      }
    },1000)
}

function showresults(){
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  finalScoreSpan.textContent=score;
  const percentage=(score/quizQuestions.length)*100;
  if(percentage===100){
    resultMessage.textcontent="perfect!!Guiness"
  }else if((percentage>=80)){
    resultMessage.textcontent="Excellent!!"
  }else if((percentage>=50)){
    resultMessage.textcontent="Good!!"  
  }else {
    resultMessage.textcontent="You can do better!!"
  }
}

function  restartQuiz()
{
   resultScreen.classList.remove("active");
   startQuiz();
}
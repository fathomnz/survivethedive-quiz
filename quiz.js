const header = document.getElementById("header");
const statement = document.getElementById("statement");
const question = document.getElementById("question");
const postscript = document.getElementById("postscript");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

const questions = [
  {
    header: "Dive Flags",
    statement:
      "In New Zealand, the Alpha flag must be displayed from every vessel conducting or supervising diving (SCUBA, spearfishing and snorkelling) activities. It means ‘I have a diver in the water; keep well clear and reduce speed to below 5 knots within 200m.",
    question:
      "Which of the following is recognised as a dive flag in New Zealand?",
    postscript: "",
    choice1: "The black & yellow Quaranteen flag",
    choice2: "The red & white DAN flag",
    choice3: "The blue & white Alpha flag",
    choice4: "The upside-down Skull & Crossbones flag",
    choice5: "Both A and C are acceptable",
    choice6: "All of the above",
    answer: 3,
  },
  {
    header: "Vessel Speed",
    statement:
      "All vessels observing a dive flag (or other signalling devices indicating the presence of divers, spearfishers and snorkelers) must take precautions to prevent accidents and injuries to divers in the water.",
    question: "Which of the following statements about boat speed is correct?",
    postscript: "something random",
    choice1:
      "Vessels must reduce speed to below 5-knots within 200-metres of the shore",
    choice2:
      "Vessels must reduce speed to below 5-knots within 200 metres of the dive flag",
    choice3:
      "Vessels must reduce speed to below 5-knots within 50-metres of another vessel or person in the water",
    choice4:
      "Vessels and skippers are required to keep a proper lookout at all times, including for divers and swimmers in the water",
    choice5: "All of the above",
    choice6: "None of the above",
    answer: 5,
  },
  {
    header: "Vessel Speed",
    statement:
      "All vessels observing a dive flag (or other signalling devices indicating the presence of divers, spearfishers and snorkelers) must take precautions to prevent accidents and injuries to divers in the water.",
    question: "Which of the following statements about boat speed is correct?",
    postscript: "something random",
    choice1:
      "Vessels must reduce speed to below 5-knots within 200-metres of the shore",
    choice2:
      "Vessels must reduce speed to below 5-knots within 200 metres of the dive flag",
    choice3:
      "Vessels must reduce speed to below 5-knots within 50-metres of another vessel or person in the water",
    choice4:
      "Vessels and skippers are required to keep a proper lookout at all times, including for divers and swimmers in the water",
    choice5: "All of the above",
    choice6: "None of the above",
    answer: 5,
  },
];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  header.innerText = currentQuestion.header;
  statement.innerText = currentQuestion.statement;
  question.innerText = currentQuestion.question;
  postscript.innerText = currentQuestion.postscript;

  choices.forEach((choice) => {
    const { number } = choice.dataset;
    choice.innerText = currentQuestion[`choice${number}`];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset.number;
    getNewQuestion();
  });
});

startGame();

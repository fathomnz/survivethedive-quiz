const header = document.getElementById("header");
const statement = document.getElementById("statement");
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressbarFull = document.getElementById("progressbarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
const availableQuestions = [];

const questions = [
  {
    header: "Dive Flags",
    statement:
      "In New Zealand, the Alpha flag must be displayed from every vessel conducting or supervising diving (SCUBA, spearfishing and snorkelling) activities. It means ‘I have a diver in the water; keep well clear and reduce speed to below 5 knots within 200m.",
    question:
      "Which of the following is recognised as a dive flag in New Zealand?",
    choice1: "The black & yellow Quaranteen flag",
    choice2: "The red & white DAN flag",
    choice3: "The blue & white Alpha flag",
    choice4: "The upside-down Skull & Crossbones flag",
    choice5: "All of the above are acceptable",
    answer: 3,
  },
  {
    header: "Vessel Speed",
    statement:
      "All vessels observing a dive flag (or other signalling devices indicating the presence of divers, spearfishers and snorkelers) must take precautions to prevent accidents and injuries to divers in the water.",
    question: "Which of the following statements about boat speed is correct?",
    choice1:
      "Vessels must reduce speed to below 5-knots within 200-metres of the shore",
    choice2:
      "Vessels must reduce speed to below 5-knots within 200 metres of the dive flag",
    choice3:
      "Vessels must reduce speed to below 5-knots within 50-metres of another vessel or person in the water",
    choice4:
      "Vessels and skippers are required to keep a proper lookout at all times, including for divers and swimmers in the water",
    choice5: "All of the above",
    answer: 5,
  },
  {
    header: "In-water signalling devices & floats",
    statement:
      "The NZUA advises all divers, spearfishers and snorkellers to carry and/or tow additional diver signalling devices when in the water. These include inflatable devices for SCUBA divers (Safety Sausages and similar devices) and highly visible floats for spearfishers and snorkellers.",
    question:
      "Why is carrying a signalling device considered 'best practice' by divers",
    choice1:
      "A signalling device can help other vessels see you in the water and take evasive action, even at times when you do not have a dive vessel in support or nearby",
    choice2:
      "A signalling device may help your dive support vessel or other rescue vessel locate you in an emergency",
    choice3:
      "Some signalling devices can provide additional floatation support for divers and spearfishers in distress",
    choice4:
      "Even divers and spearfishers operating from the shore or within 200-metres of land can be at risk of injury by vessels",
    choice5: "All of the above",
    answer: 5,
  },
  {
    header: "The Buddy System (part 1)",
    statement:
      "The Buddy System is the well-accepted practice of divers (and spearfishers) operating in pairs – or buddies. The purpose of the Buddy System is to help ensure divers can receive assistance in a wide range of dive-related emergencies.",
    question:
      "Your dive buddy could be helpful in which of the following scenarios?",
    choice1: "Checking dive equipment prior to a dive",
    choice2: "Carrying overloaded scallop catch-bags",
    choice3:
      "Providing underwater assistance such as auxiliary air in an emergency",
    choice4:
      "Providing surfacing and floatation support during a medical event",
    choice5: "Answers A,C and D only",
    answer: 5,
  },
  {
    header: "The Buddy System (part 2)",
    statement: "",
    question: "What should you do if you lose contact with your dive buddy?",
    choice1: "Continue diving as they have probably returned to the boat",
    choice2:
      "Search for no more than 1 minute, then slowly make your way to the surface (obeying any safety stop requirements). Wait on the surface to reunite",
    choice3:
      "Search until you must surface due to air, then slowly make your way to the surface (obeying any safety stop requirements). Wait on the surface to reunite",
    choice4:
      "Return to the vessel if your have your daily bag limit of seafood",
    choice5: "Both A & D are correct",
    answer: 2,
  },
  {
    header: "Safe Surfacing Procedures (part 1)",
    statement:
      "The term ‘Safe Surfacing Procedures’, applies to the safe rate of ascent and/or safety stops required by all SCUBA divers to avoid the potentially fatal effects of excess nitrogen in the bloodstream due to diving.",
    question:
      "Which of the following statements best describes dives requiring the application of Safe Surfacing Procedures, which include a safe rate of ascent, with safety stops.",
    choice1: "Only dives below 30-metres for more than 20-minutes",
    choice2: "Only dives below 20-metres for more than 25-minutes",
    choice3:
      "All dives using compressed air including SCUBA or air pumped from the surface via a hose",
    choice4: "Only dives below 10-meters for more than 30-minutes",
    choice5: "None of the above",
    answer: 3,
  },
  {
    header: "Safe Surfacing Procedures (part 2)",
    statement: "",
    question:
      "Of the following statements regarding Safe Surfacing Procedures, choose the most correct answer?",
    choice1:
      "A safe rate of ascent can be maintained by ascending slower than the smallest bubbles",
    choice2:
      "Safe Surfacing procedures do not apply to dives shallower than 10-metres",
    choice3:
      "A dive computer is a useful tool for managing safe surfacing rates and procedures",
    choice4:
      "The addition of Safety Stop at 5-metres of depth is mandatory for dives deeper than 18-metres or those approaching the no-decompression limit",
    choice5: "Answers A, C and E",
    answer: 5,
  },
  {
    header: "Shallow-water blackout",
    statement:
      "Shallow-water blackout is the phenomenon that causes breath-hold divers such as spearfishers, snorkellers and free-divers to lose consciousness and the risk of drowning on or near the surface when returning from a breath-hold dive. It is difficult to predict and can affect any diver at any time.",
    question:
      "Which of the following procedures is recommended to avoid potential death from shallow-water blackout?",
    choice1:
      "Always dive with a buddy and maintain eye-contact with them when they are ascending",
    choice2: "Hyperventilation has no bearing on shallow-water blackout",
    choice3:
      "If you have never suffered shallow-water blackout you are probably immune to its risks",
    choice4:
      "Pushing yourself to the extent of your breath-holding limits is the best way to train for the prevention of shallow-water blackout",
    choice5: "All of the above",
    answer: 1,
  },
  {
    header: "Equipment Cleaning",
    statement:
      "Dive gear of any age is finely tuned equipment that is susceptible to damage from impacts, wear & tear and seawater induced corrosion. Your well-being on or in the water is reliant on its good working condition.",
    question:
      "How often should you conduct a thorough warm freshwater rinse of all your dive equipment?",
    choice1:
      "At the conclusion of every day of diving, regardless of the number of dives",
    choice2: "Once per week is sufficient if you are a regular diver",
    choice3: "Once per month is sufficient if you are a regular diver",
    choice4:
      "Never, modern diving equipment does not require freshwater cleaning",
    choice5: "None of the above",
    answer: 1,
  },
  {
    header: "Equipment Servicing",
    statement:
      "Dive equipment is includes sophiscated engineering and requires professional servicing to maintain safe performance ",
    question:
      "How often should you have dive equipment professionally serviced?",
    choice1: "No more frequently than once per year is recommended",
    choice2:
      "At least once per year and before a dive trip if coming off a break from diving",
    choice3: "At least once per year and more frequently if diving often",
    choice4:
      "At least once per year and any time you suspect reduced performance from your dive equipment.",
    choice5: "Answers B, C and D",
    answer: 5,
  },
  {
    header: "SCUBA tank inspections",
    statement:
      "All SCUBA tanks require professional inspections which include an internal and external visual inspection once per year and a hydrostatic pressure test every two years.",
    question: "How do you know when your SCUBA tank is due for inspection?",
    choice1:
      "It is an approximate thing. My best guess is enough, even if I fill my own tanks on our boat",
    choice2: "Only SCUBA tanks more than 5-years old need inspecting",
    choice3:
      "Check for the newest date stamped on the tank or on an attached plastic tag",
    choice4:
      "It is best just to rely on the tank filling station to check inspection dates",
    choice5: "Answers B and C",
    answer: 3,
  },
  {
    header: "New diver training",
    statement:
      "Several diving training organisations including SSI and PADI offer high quality courses for new divers at dive shops throughout New Zealand. Training is advised because diving of all types can result in injury or death for those unaware of the risks of breathing compressed air while underwater or how to behave in an underwater emergency.",
    question:
      "The following statements may or may not be correct regarding diver qualifications in New Zealand? Choose the best answer",
    choice1: "The minimum age for diving qualifications in New Zealand is 12",
    choice2:
      "It is safe for unqualified divers to go SCUBA diving, if they stay within 10-metres of a qualified diver",
    choice3:
      "Online training is available for most beginner dive courses with only the practical components conducted in person with an instructor",
    choice4: "Answers A and C only",
    choice5: "All of the above",
    answer: 4,
  },
  {
    header: "Diver refresher courses",
    statement:
      "The New Zealand Underwater Association advises all divers returning to the sport after a hiatus to consider a diver refresher course offered by most diver training facilities in NZ.",
    question:
      "The following statements best covers the topics covered by a diver refresher course?",
    choice1:
      "Updated safe diving practices relating to safe surfacing procedures",
    choice2:
      "Updated guides to using modern diving equipment such as dive computers and signalling devices",
    choice3: "Improved techniques for utilising social media as a diver",
    choice4: "Answers A and B only",
    choice5: "All of the above",
    answer: 4,
  },
  {
    header: "Diver fitness",
    statement:
      "Are you fit to dive? Water-Safety NZ data collated since 2011 demonstrates 60% of all fatalities in divers, spearfishermen, and snorkelers occur in the over 40s age group. Poor heart health and inadequate fitness is the most consistent factor in these diver deaths.",
    question:
      "The question of dive fitness is covered by three primary considerations",
    choice1:
      "The age factor – A heart’s capacity to support the elevated blood output required by diving decreases with age",
    choice2:
      "Prescription Medicines - Some common medications such as beta blockers or anti-arrhythmia treatments can increase cardiac risk while diving",
    choice3:
      "Depth Compression – As a diver descends, the heart rate slows to conserve oxygen and the lungs compress. Older divers are well advised to be conservative with dive depths",
    choice4: "Cardio fitness concerns only apply to older divers",
    choice5: "Answers A, B and C only",
    answer: 5,
  },
  {
    header: "Medical checks",
    statement:
      "The NZUA recommends all divers over the age of 40 get annual medical checks from doctors with diving knowledge to ensure all diving fitness health considerations are covered adequately",
    question:
      "Which of the following statements is most correct regarding diver medical checks?",
    choice1:
      "Divers over the age of 40 do not need a medical if their BMI (body mass index) is between 18.5 and 24.9",
    choice2:
      "An annual medical check is only recommended if you have been ill within the last 3-months",
    choice3:
      "An annual medical check is recommended for all divers over the age of 40",
    choice4:
      "An annual medical check is only recommended for divers on specific prescription medicines",
    choice5: "Answers A, B only",
    answer: 3,
  },
  {
    header: "Alcohol and recreational drugs",
    statement:
      "The presence of alcohol or recreational drugs in a diver’s bloodstream (SCUBA, spearfishing and snorkelling) can have unexpected, sometimes fatal consequences, even in relatively low levels.",
    question:
      "Select the best answer from the following statements regarding alcohol and recreational drugs, and diving?",
    choice1:
      "Diving with a hangover is ok if your last drink was more than 8-hours ago",
    choice2:
      "Divers should avoid alcohol and recreational drugs within 8-hours of diving",
    choice3:
      "The presence of alcohol and recreational drugs can significantly worsen the impairment effects of diving, especially nitrogen narcosis",
    choice4:
      "Alcohol can reduce a diver’s body heat and speed-up the onset of hypothermia ",
    choice5: "Answers B, C and D only",
    answer: 5,
  },
  {
    header: "Dive vessel seaworthiness",
    statement:
      "Skippers and owners of vessels are responsible for the seaworthiness of all craft used in diving activities.",
    question:
      "Which of the following minimum steps should be included in a simple pre-trip safety checklist?",
    choice1: "The correct function of all bilge pumps",
    choice2: "Sufficient fuel on-board for the planned duration of the trip",
    choice3:
      "The correct operation of the vessel’s steering and gear selection system",
    choice4: "A working anchor system",
    choice5: "All of the above",
    answer: 5,
  },
  {
    header: "Minimum dive vessel safety equipment",
    statement: "",
    question:
      "All dive vessels craft should include which of the following safety items as a minimum",
    choice1:
      "Lifejackets in good condition and in appropriate sizes for all passengers",
    choice2:
      "Two alternate forms of communication, one of which should be a VHF radio, in tested working order",
    choice3:
      "A quality first aid kit (including space blankets) in a waterproof bag",
    choice4: "A blue & white (Alpha) dive flag",
    choice5: "All of the above",
    answer: 5,
  },
  {
    header: "Weather suitable for diving",
    statement:
      "Today numerous high-quality weather resources exist to help divers plan successful, enjoyable dive trips. They include multiple websites such as metservice.co.nz, windy.com and swellmap.com plus VHF radio services such as Coastguard radio and regional radio base stations.",
    question:
      "Which of the following weather factors should divers consider before departing on a dive trip?",
    choice1:
      "The forecasted average wind speeds and maximum gusts for the expected duration of the trip.",
    choice2:
      "The expected swell height and direction for the duration of the trip – especially as they relate to the planned dive location",
    choice3: "The estimated percentage of cloud cover for the diving day",
    choice4:
      "Tide times and heights during the trip, especially if high currents are known to adversely affect the dive location",
    choice5: "Answers A, B and D only",
    answer: 5,
  },
  {
    header: "Pre and post trip communications. ",
    statement:
      "Maritime NZ and the NZUA recommends a minimum level of communication with third parties for all boating trips. This includes notifying the Coastguard or a local VHF radio station of your intended boating plans before departing, and again when safely returning home. ",
    question:
      "Which of the following items of information should be included in your trip report?",
    choice1: "The number of passengers on board",
    choice2: "The names of all the passengers",
    choice3: "The name and/or VHF call-sign of the vessel",
    choice4: "The general trip plan, destination and estimated time of return",
    choice5: "Answers A, C and D only",
    answer: 5,
  },
];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 20;

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
  progressText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
  // Update the progress bar
  progressbarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  header.innerText = currentQuestion.header;
  statement.innerText = currentQuestion.statement;
  question.innerText = currentQuestion.question;

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

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();

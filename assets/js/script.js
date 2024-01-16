// Below here are the elements that will be used for dom minipulation
const highScoreBtnDiv = document.querySelector("#highScoreDivBtn");
const questionContainer = document.querySelector("#question");
const extraText = document.querySelector("#extra-text");
const greetingText = document.querySelector("#greeting-text");
const answerContainer = document.querySelector("#answer-container");
const answerChoices = document.querySelectorAll(".answer-button");
const startButton = document.querySelector("#start-quiz");
const chooseQuizBtn = document.querySelector("#js-modal-trigger");
const initialsContainer = document.querySelector("#initials-container");
const timerElement = document.querySelector("#timer");
const timeDiv = document.querySelector("#time");
const initialsForm = document.querySelector("#enter-initials");
const feedback = document.querySelector("#feedback");
const url = "https://swapi.dev/api/";
let currentQuestion = "";
let endpoint;
let score = 0;
let timerInterval;
let remainingTime;
let quizQuestions;

answerContainer.style.display = "none";
initialsContainer.style.display = "none";
timeDiv.style.display = "none";
greetingText.style.display = "none";

const peopleQuestions = [
  {
    question: "Who is the protagonist of the original trilogy?",
    answers: ["Obi Wan Kenobi", "Anakin Skywalker", "Han Solo", ""],
    correctAnswer: "",
  },
  {
    question:
      "In a galaxy far, far away, who is the golden protocol droid fluent in over six million forms of communication and prone to worrying?",
    answers: ["R2-D2", "", "BB-8", "K-2SO"],
    correctAnswer: "",
  },
  {
    question:
      "Which loyal astromech droid accompanies Luke Skywalker on his journey to become a Jedi, carrying vital information and saving the day with its mechanical ingenuity?",
    answers: ["BB-8", "Chopper", "", "K-2SO"],
    correctAnswer: "",
  },
  {
    question:
      "Who is the masked Sith Lord who serves the Emperor and hunts down the remaining Jedi Knights?",
    answers: ["", "Kylo Ren", "Count Dooku", "Darth Maul"],
    correctAnswer: "",
  },
  {
    question:
      "Who is the fiery princess turned rebel leader, known for her unwavering defiance against the oppressive Empire?",
    answers: ["Padme Amidala", "Jyn Erso", "", "Rey"],
    correctAnswer: "",
  },
  {
    question:
      "Who is the moisture farmer on Tatooine who reluctantly raises Luke Skywalker, shielding him from the dangers of the past?",
    answers: ["Cliegg Lars", "Ben Kenobi", "Jabba the Hutt", ""],
    correctAnswer: "",
  },
  {
    question:
      "Who is the kind and nurturing moisture farmer on Tatooine who helps raise Luke Skywalker, offering him love and support despite living in a harsh environment?",
    answers: ["Shmi Skywalker", "", "Leia Organa", "Padme Amidala"],
    correctAnswer: "",
  },
  {
    question:
      "Prone to mishaps and unexpected outbursts, which astromech droid famously zapped Uncle Owen on the arm, igniting a long-standing animosity between them?",
    answers: ["R2-D2", "Chopper", "", "The Pit Droid"],
    correctAnswer: "",
  },
  {
    question:
      "Who is Luke Skywalker's childhood friend on Tatooine who dreams of escaping the desert planet and joining the fight against the Empire?",
    answers: ["", "Han Solo", "Wedge Antilles", "Ben Kenobi"],
    correctAnswer: "",
  },
  {
    question:
      "Who is the wise old hermit living on Tatooine who mentors Luke Skywalker in the ways of the Force and reveals his father's past?",
    answers: ["Yoda", "Qui-Gon Jinn", "Mace Windu", ""],
    correctAnswer: "",
  },
];

const planetQuestions = [
  {
    question:
      "In the Star Wars universe, which desolate desert planet is home to moisture farmers, Tusken Raiders, and the infamous Mos Eisley cantina?",
    answers: ["Hoth", "Naboo", "Endor", ""],
    correctAnswer: "",
  },
  {
    question:
      "In the Star Wars saga, a peaceful planet known for its lush forests and pacifistic culture meets a tragic fate. Which planet shares this unfortunate destiny?",
    answers: ["", "Yavin IV", "Corellia", "Ryloth"],
    correctAnswer: "",
  },
  {
    question:
      "A Rebel base hidden within a gas giant moon served as a launching pad for a daring attack against the Empire's ultimate weapon. This critical location was nestled within:",
    answers: ["Hoth", "Corellia", "", "Endor"],
    correctAnswer: "",
  },
  {
    question:
      "What icy planet boasts tauntaun-riding rebels and a hidden base besieged by walkers?",
    answers: ["Yavin IV", "", "Jakku", "Coruscant"],
    correctAnswer: "",
  },
  {
    question:
      "Where does a swamp-cloaked hermit, wise in the ways of the Force, train a farm boy in the path of a Jedi?",
    answers: ["Cloud City", "Naboo", "Corellia", ""],
    correctAnswer: "",
  },
  {
    question:
      "Which Star Wars location features a floating city in the clouds, a famous casino, and a carbonite freezing chamber?",
    answers: ["", "Coruscant", "Naboo", "Corellia"],
    correctAnswer: "",
  },
  {
    question:
      "Unlike the harsh deserts of Tatooine or the icy plains of Hoth, which planet serves as a sanctuary for Ewoks, but becomes a battleground as the Empire seeks to exploit its strategic location?",
    answers: ["Kashyyyk", "", "Alderaan", "Dagobah"],
    correctAnswer: "",
  },
  {
    question:
      "Which Star Wars planet boasts serene lakes and waterfalls, a peaceful monarchy threatened by a trade federation invasion, and a young queen who becomes a symbol of resistance?",
    answers: ["Tatooine", "Hoth", "", "Coruscant"],
    correctAnswer: "",
  },
  {
    question:
      "Which Star Wars planet is a sprawling metropolis covering an entire planet, filled with towering skyscrapers, a bustling Galactic Senate, and the central seat of the Republic (and later, the Empire)?",
    answers: ["Tatooine", "", "Hoth", "Naboo"],
    correctAnswer: "",
  },
  {
    question:
      "Which Star Wars planet houses a hidden aquatic city, specializes in advanced cloning technology, and produces an army of genetically engineered soldiers for the Republic?",
    answers: ["Yavin IV", "Corellia", "Tatooine", ""],
    correctAnswer: "",
  },
];

const starshipQuestions = [
  {
    question:
      "Which Star Wars starship boasts a sleek wedge-shaped design, served as a mainstay of the Rebel Alliance fleet, and carried Princess Leia on daring missions against the Empire?",
    answers: ["B-Wing", "", "Millennium Falcon", "Y-wing"],
    correctAnswer: "",
  },
  {
    question:
      "Which Star Wars warship dominates the galaxy with its imposing triangular silhouette, crushing firepower, and the ever-present threat of Darth Vader's dark aura?",
    answers: ["TIE Fighter", "Millenium Falcom", "", "Mon Calamari Cruiser"],
    correctAnswer: "",
  },
  {
    question:
      "Which small, heavily-armored craft served as the workhorse of the Rebel Alliance for transporting troops and equipment onto enemy planets, often under hazardous conditions and tight deadlines?",
    answers: [
      "",
      "CR90 Corellian Corvette",
      "B-Wing Starfighter",
      "Lambda-class Shuttle",
    ],
    correctAnswer: "",
  },
  {
    question:
      "Despite its immense size and power, what seemingly invincible Imperial weapon was ultimately brought down by a daring Rebel attack, exploiting a single flaw and sparking a beacon of hope against the tyranny of the Empire?",
    answers: [
      "TIE Fighter Squadron",
      "Imperial Star Destroyer",
      "C-3PO and R2-D2 Droid Team",
      "",
    ],
    correctAnswer: "",
  },
  {
    question:
      "Which iconic Star Wars starship boasts a distinctive Y-shaped design, carries a smuggler and his Wookiee copilot on daring adventures, and has played a pivotal role in saving the galaxy from the clutches of evil?",
    answers: ["X-wing Starfighter", "", "Nebulon-B Frigate", "TIE Fighter"],
    correctAnswer: "",
  },
  {
    question:
      "Which Star Wars starfighter features a distinctive twin-ion engine configuration, carries devastating proton bombs, and played a crucial role in the iconic trench run attack on the Death Star?",
    answers: ["", "X-wing", "B-wing", "A-wing"],
    correctAnswer: "",
  },
  {
    question:
      "Which Star Wars spacecraft boasts signature S-foils, agile maneuverability, and proton torpedoes capable of piercing Imperial armor, often flown by Jedi Knights in daring missions against the Empire?",
    answers: ["B-wing", "Y-wing", "A-wing", ""],
    correctAnswer: "",
  },
  {
    question:
      "Which sleek, black starfighter with distinctive red solar panels serves as the personal spacecraft of Darth Vader, striking fear into the hearts of Rebel pilots and showcasing the Empire's technological superiority?",
    answers: ["TIE Fighter", "TIE Bomber", "", "TIE Interceptor"],
    correctAnswer: "",
  },
  {
    question:
      "Which colossal Star Destroyer dwarfs its counterparts, boasts a menacing wedge-shaped design, and serves as Darth Vader's personal flagship, casting a terrifying shadow over the galaxy and personifying the Empire's oppressive power?",
    answers: [
      "Imperial II-class Star Destroyer",
      "",
      "Venator-class Star Destroyer",
      "Mon Calamari Cruiser",
    ],
    correctAnswer: "",
  },
  {
    question:
      "Unlike the firepower of Y-wings or the agility of X-wings, what versatile spacecraft could blend in with civilian traffic, be modified for smuggling and troop deployment, and serve as a vital link between Rebel cells across the galaxy?",
    answers: [
      "",
      "TIE Fighter",
      "Venator-class Star Destroyer",
      "Mon Calamari Cruiser",
    ],
    correctAnswer: "",
  },
];

function getCorrectAnswers(data, questions) {
  // This function is used to save the answers from the API.
  const correctAnswers = [];
  for (i = 0; i < 10; i++) {
    correctAnswers.push(data.results[i].name);
  }
  console.log(correctAnswers);
  for (let i = 0; i < 10; i++) {
    questions[i].correctAnswer = correctAnswers[i];
    for (j = 0; j < 4; j++) {
      if (questions[i].answers[j] === "") {
        questions[i].answers[j] = correctAnswers[i];
      }
    }
  }
  console.log(questions);
}

function getRandomQuestion(questions) {
  // This function returns a question random question from its own category.
  const randIndex = Math.floor(Math.random() * questions.length);
  const selectedQuestion = questions[randIndex];
  questions.splice(randIndex, 1);
  return selectedQuestion;
}

startButton.addEventListener("click", () => {
  // This line adds functionality to the start button on the start of the page, it also checks the user choies for the modal and assigns quizQuetions with the correlated subject.
  endpoint = document.querySelector('input[name="rsvp"]:checked').value;
  switch (endpoint) {
    case "people":
      quizQuestions = peopleQuestions;
      break;
    case "planets":
      quizQuestions = planetQuestions;
      break;
    case "starships":
      quizQuestions = starshipQuestions;
      break;
    default:
      console.error("Invalid endpoint:", endpoint);
      return;
  }
  fetch(`${url}${endpoint}/`) //API call is madet
    .then((response) => response.json())
    .then((data) => {
      getCorrectAnswers(data, quizQuestions);
      currentQuestion = getRandomQuestion(quizQuestions);
    });
  startCountdown();
  hideElements();
  player.seekTo(0);
  player.playVideo();
});

function startCountdown() {
  // This function starts the countdown for how long it may take to get the info from the API itself and display the questions at the start.
  let secondsRemaining = 5;
  questionContainer.textContent = `Game starts in`;
  extraText.textContent = "";        
  greetingText.style.display = "block";


  const interval = setInterval(() => {
    questionContainer.textContent = `Game starts in`;
    extraText.textContent = secondsRemaining;
    secondsRemaining--;
    if (secondsRemaining === -1) {
      clearInterval(interval);
      displayQuestion();
      timerCountdown();
      timeDiv.style.display = "block";
      greetingText.style.display = "none";
    }
  }, 1000);
}

function timerCountdown() {
  // This function starts the 1 minute timer that is given for the user to complete the trivia.
  remainingTime = 60;
  timerElement.textContent = remainingTime;
  timerInterval = setInterval(() => {
    remainingTime -= 1;
    timerElement.textContent = remainingTime;
    if (remainingTime === 0) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

function displayQuestion() {
  // This function displays the current quesstion that is prepared.
  questionContainer.textContent = currentQuestion.question;
  answerContainer.style.display = "block";
  extraText.style.display = "none";

  answerChoices.forEach((choice, index) => {
    choice.textContent = currentQuestion.answers[index];
    choice.addEventListener("click", handleAnswerClick);
  });
}

function hideElements() {
  // This function hides the modal element used to choose the subject of the trivia.
  chooseQuizBtn.style.display = "none";
}

function checkAnswer(userAnswer, correctAnswer) {
  // This function is used to check if the users answer choice is the correct answer.
  return userAnswer === correctAnswer;
}

function handleAnswerClick(event) {
  // This function is attached to an addeventlistener for the answer choices that are displayed
  const selectedAnswer = event.target.textContent;
  const isCorrect = checkAnswer(selectedAnswer, currentQuestion.correctAnswer);
  if (isCorrect) {
    feedback.textContent = "Correct";
    feedback.style.color = "green";
    score += 1;
  } else {
    feedback.textContent = "Wrong";
    feedback.style.color = "red";
  }
  setTimeout(() => {
    if (quizQuestions.length === 0) {
      clearInterval(timerInterval);
      timerElement.textContent = 0;
      gameOver();
      return;
    } else if (remainingTime === 0) {
      gameOver();
      return;
    }
    currentQuestion = getRandomQuestion(quizQuestions);
    displayQuestion();
    feedback.textContent = "";
  }, 1000);
}

function gameOver() {
  // This function changes elements to let the user know that the game ended and pauses the background music.
  greetingText.style.display = 'block';
  extraText.textContent = `Game Over!`;
  questionContainer.style.display = "none";
  extraText.style.display = 'block';
  greetingText.textContent = `Your score is ${score}`;
  answerContainer.style.display = "none";
  initialsContainer.style.display = "block";
  timeDiv.style.display = "none";
  feedback.textContent = "";
  player.stopVideo();
}

initialsForm.addEventListener("submit", function (event) {
  // This addeventlistner is attached to the submit button for the initials and lets the user know that a initial is required to save to the users local storage and display it in the highscores page.
  event.preventDefault();
  const initials = document.querySelector("#initials").value;
  if (initials !== "") {
    let initialsArray = JSON.parse(localStorage.getItem("quizInitials"));
    let scoreArray = JSON.parse(localStorage.getItem("quizScores"));
    if (!scoreArray || !initialsArray) {
      initialsArray = [];
      scoreArray = [];
    }
    initialsArray.push(initials);
    scoreArray.push(score);
    localStorage.setItem("quizScores", JSON.stringify(scoreArray));
    localStorage.setItem("quizInitials", JSON.stringify(initialsArray));
    window.location.href = "./highScores.html";
  } else {
    const alertModal = document.querySelector("#alert-modal");
    alertModal.classList.add("is-active");
  }
});

highScoreBtnDiv.addEventListener("click", () => {
  // this addeventlistener is used to send the user to the highscores page which is attached to the highscores button.
  window.location.href = "./highScores.html";
});

//This code loads the IFrame Player API code asynchronously.

var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//   This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
//  var videoId = 'ffz5JFRSXWs';
//  var player;
//  function onYouTubeIframeAPIReady(){
//   player = new YT.Player('player', {
//     height: '390',
//    width: '640',
//     videoId: 'ffz5JFRSXWs',
//    playerVars: { 'rel': 0}
//     });
//   }

//     // YouTube video ID of Star Wars ambient music
// var videoId = 'ffz5JFRSXWs' original video from Angela
var videoId = "T31I8FwXhk4"; // Star Wars main theme
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtubePlayer", {
    height: "0",
    width: "0",
    videoId: videoId,
    //        //rel set to 0 to take away other suggested videos when playing
    playerVars: { rel: 0 },
    // events: {
    //     'onReady': onPlayerReady,
    // }
  });
}

// function onPlayerReady(event) {
//     //       // You can start the video here or play the audio (music) as needed.
//     //       // For example, to start the video:
//     event.target.seekTo(0); //is not needed at this time but here for reference
// }

// Declared variable for modal button and modal - KS
document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      closeAllModals();
    }
  });
});

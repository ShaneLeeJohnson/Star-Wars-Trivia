highScoreBtnDiv = document.getElementById('highScoreDivBtn');
startingInfoDiv = document.getElementById('startingInfoDiv');
potentialQuestionDiv = document.getElementById('potentialQuestionDiv');
answerForm = document.getElementById('answerForm');
const questionContainer = document.querySelector('#question');
const answerContainer = document.querySelector('#answer-container');
const answerChoices = document.querySelectorAll('.answer-button');
const startButton = document.querySelector('#startGameBtn');
const categoryDropdown = document.querySelector('#category-dropdown');
const dropdownText = document.querySelector('#dropdown-text');
const initialsContainer = document.querySelector('#initials-container');
const timerElement = document.querySelector('#timer');
const initialsForm = document.querySelector('#enter-initials');
const feedback = document.querySelector('#feedback');
const url = 'https://swapi.dev/api/';
let currentQuestion = '';
let endpoint = 'people';
let score = 0;
let timerInterval;
let remainingTime;

answerContainer.style.display = 'none';
initialsContainer.style.display = 'none';


// Declared variable for modal button and modal - KS
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        closeAllModals();
      }
    });
  });


const peopleQuestions = [
    {
        question: 'Who is the protagonist of the original trilogy?',
        answers: ['Obi Wan Kenobi', 'Anakin Skywalker', 'Han Solo', ''],
        correctAnswer: ''
    },
    {
        question: 'In a galaxy far, far away, who is the golden protocol droid fluent in over six million forms of communication and prone to worrying?',
        answers: ['R2-D2', '', 'BB-8', 'K-2SO'],
        correctAnswer: ''
    },
    {
        question: 'Which loyal astromech droid accompanies Luke Skywalker on his journey to become a Jedi, carrying vital information and saving the day with its mechanical ingenuity?',
        answers: ['BB-8', 'Chopper', '', 'K-2SO'],
        correctAnswer: ''
    },
    {
        question: 'Who is the masked Sith Lord who serves the Emperor and hunts down the remaining Jedi Knights?',
        answers: ['', 'Kylo Ren', 'Count Dooku', 'Darth Maul'],
        correctAnswer: ''
    },
    {
        question: 'Who is the fiery princess turned rebel leader, known for her unwavering defiance against the oppressive Empire?',
        answers: ['Padme Amidala', 'Jyn Erso', '', 'Rey'],
        correctAnswer: ''
    },
    {
        question: 'Who is the moisture farmer on Tatooine who reluctantly raises Luke Skywalker, shielding him from the dangers of the past?',
        answers: ['Cliegg Lars', 'Ben Kenobi', 'Jabba the Hutt', ''],
        correctAnswer: ''
    },
    {
        question: 'Who is the kind and nurturing moisture farmer on Tatooine who helps raise Luke Skywalker, offering him love and support despite living in a harsh environment?',
        answers: ['Shmi Skywalker', '', 'Leia Organa', 'Padme Amidala'],
        correctAnswer: ''
    },
    {
        question: 'Prone to mishaps and unexpected outbursts, which astromech droid famously zapped Uncle Owen on the arm, igniting a long-standing animosity between them?',
        answers: ['R2-D2', 'Chopper', '', 'The Pit Droid'],
        correctAnswer: ''
    },
    {
        question: "Who is Luke Skywalker's childhood friend on Tatooine who dreams of escaping the desert planet and joining the fight against the Empire?",
        answers: ['', 'Han Solo', 'Wedge Antilles', 'Ben Kenobi'],
        correctAnswer: ''
    },
    {
        question: "Who is the wise old hermit living on Tatooine who mentors Luke Skywalker in the ways of the Force and reveals his father's past?",
        answers: ['Yoda', 'Qui-Gon Jinn', 'Mace Windu', ''],
        correctAnswer: ''
    }
]

categoryDropdown.addEventListener('change', (event) => {
    const selectedCategory = event.target.value;
    endpoint = selectedCategory;
})

function getCorrectAnswers(data) {
    const correctAnswers = []
    for (i = 0; i < 10; i++) {
        correctAnswers.push(data.results[i].name)
    }
    console.log(correctAnswers)
    for (let i = 0; i < 10; i++) {
        peopleQuestions[i].correctAnswer = correctAnswers[i];
        for (j = 0; j < 4; j++) {
            if (peopleQuestions[i].answers[j] === '') {
                peopleQuestions[i].answers[j] = correctAnswers[i];
            }
        }
    }
    console.log(peopleQuestions);
}

function getRandomQuestion(questions) {
    const randIndex = Math.floor(Math.random() * questions.length);
    const selectedQuestion = questions[randIndex];
    questions.splice(randIndex, 1);
    return selectedQuestion;
}

startButton.addEventListener('click', () => {
    fetch(`${url}${endpoint}/`)
        .then(response => response.json())
        .then(data => {
            getCorrectAnswers(data);
            currentQuestion = getRandomQuestion(peopleQuestions)
            
        })
    startCountdown();
    hideElements();
    player.playVideo();
});

function startCountdown() {
    let secondsRemaining = 5;
    questionContainer.textContent = `Game starts in`;

    const interval = setInterval(() => {
        questionContainer.textContent = `Game starts in ${secondsRemaining}`;
        secondsRemaining--;
        if (secondsRemaining === -1) {
            clearInterval(interval);
            displayQuestion();
            timerCountdown();
        }
    }, 1000);
}

function timerCountdown() {
    remainingTime = 10;
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
    questionContainer.textContent = currentQuestion.question;
    answerContainer.style.display = 'block';

    answerChoices.forEach((choice, index) => {
        choice.textContent = currentQuestion.answers[index];
        choice.addEventListener('click', handleAnswerClick);
    })
}

function hideElements() {
    startButton.style.display = 'none';
    categoryDropdown.style.display = 'none';
    dropdownText.style.display = 'none';
}

function checkAnswer(userAnswer, correctAnswer) {
    return userAnswer === correctAnswer;
}

function handleAnswerClick(event) {
    const selectedAnswer = event.target.textContent;
    const isCorrect = checkAnswer(selectedAnswer, currentQuestion.correctAnswer);
    if (isCorrect) {
        feedback.textContent = 'Correct';
        feedback.style.color = 'green';
        score += 1;
    }
    else {
        feedback.textContent = 'Wrong';
        feedback.style.color = 'red';
    }
    setTimeout(() => {
        if (peopleQuestions.length === 0) {
            clearInterval(timerInterval);
            timerElement.textContent = 0;
            gameOver();
            return;
        }
        else if (remainingTime === 0) {
            gameOver();
            return
        }
        currentQuestion = getRandomQuestion(peopleQuestions);
        displayQuestion();
        feedback.textContent = '';
    }, 1000)

}

function gameOver() {
    questionContainer.textContent = `Game Over! Your score is ${score}`;
    answerContainer.style.display = 'none';
    initialsContainer.style.display = 'block';
    player.stopVideo();

}

initialsForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const initials = document.querySelector('#initials').value;
    if (initials !== '') {
        let initialsArray = JSON.parse(localStorage.getItem('quizInitials'));
        let scoreArray = JSON.parse(localStorage.getItem('quizScores'));
        if (!scoreArray || !initialsArray) {
            initialsArray = [];
            scoreArray = [];
        }
        initialsArray.push(initials);
        scoreArray.push(score);
        localStorage.setItem('quizScores', JSON.stringify(scoreArray));
        localStorage.setItem('quizInitials', JSON.stringify(initialsArray));
        window.location.href = './highScores.html';
    }
    else {
        alert('Please enter your initials');
    }
})

highScoreBtnDiv.addEventListener('click', () => {
    window.location.href = './highScores.html';
})




//This code loads the IFrame Player API code asynchronously.

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
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
var videoId = 'ffz5JFRSXWs';
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtubePlayer', {
        height: '390',
        width: '640',
        videoId: videoId,
        //        //rel set to 0 to take away other suggested videos when playing
        playerVars: { 'rel': 0 },
        events: {
            'onReady': onPlayerReady,
        }
    });
}

function onPlayerReady(event) {
    //       // You can start the video here or play the audio (music) as needed.
    //       // For example, to start the video:
    event.target.playVideo(); //is not needed at this time but here for reference
}

document.getElementById('playMusicBtn').addEventListener('click', function () {
    //       // When the "playMusicBtn" button is clicked, play the video or audio.
    //       // For example, to play the audio (music):
    player.playVideo(); // the video will now play under the start game button
});
document.getElementById('pauseMusicBtn').addEventListener('click', function () {
    //         // When the "pauseMusicBtn" button is clicked, stop the video
    player.stopVideo();
});










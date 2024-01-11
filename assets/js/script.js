highScoreBtnDiv = document.getElementById('highScoreDivBtn');
startingInfoDiv = document.getElementById('startingInfoDiv');
potentialQuestionDiv = document.getElementById('potentialQuestionDiv');
answerForm = document.getElementById('answerForm');
const questionContainer = document.querySelector('#question');
const answerContainer = document.querySelector('#answer-container');
const answerChoices = document.querySelectorAll('.answer-button');
const startButton = document.querySelector('#startGameBtn');
const url = 'https://swapi.dev/api/people/?page=1'

answerContainer.style.display = 'none';

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

fetch(`${url}`)
    .then(response => response.json())
    .then(data => {
        getCorrectAnswers(data);
        // displayQuestion();
    })

let index = 0;
let currentQuestion = peopleQuestions[index];

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

function displayQuestion() {
    questionContainer.textContent = currentQuestion.question;
    answerContainer.style.display = 'block';

    answerChoices.forEach((choice, index) => {
        choice.textContent = currentQuestion.answers[index];
        choice.addEventListener('click', handleAnswerClick);
    })
}

startButton.addEventListener('click', displayQuestion);

function handleAnswerClick() {
    index += 1;
    currentQuestion = peopleQuestions[index];
    displayQuestion();
}


      // This code loads the IFrame Player API code asynchronously.
      
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var videoId = '0W7dtwOFpGU';
      var player;
      function onYouTubeIframeAPIReady(){
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: '0W7dtwOFpGU',
          playerVars: { 'rel': 0} 
          });
        }

      
        // YouTube video ID of Star Wars ambient music
        var videoId = '0W7dtwOFpGU';
        var player;
      
        function onYouTubeIframeAPIReady() {
          player = new YT.Player('youtubePlayer', {
            height: '390',
            width: '640',
            videoId: videoId,
           //rel set to 0 to take away other suggested videos when playing
            playerVars: { 'rel': 0 },
            events: {
              'onReady': onPlayerReady,
            }
          });
        }
      
        function onPlayerReady(event) {
          // You can start the video here or play the audio (music) as needed.
          // For example, to start the video:
          // event.target.playVideo(); is not needed at this time but here for reference
        }
      
        document.getElementById('playMusicBtn').addEventListener('click', function() {
          // When the "playMusicBtn" button is clicked, play the video or audio.
          // For example, to play the audio (music):
          player.playVideo(); // Assuming the video is an audio track.
    
          document.getElementById('pauseMusicBtn').addEventListener('click', function () {
            // When the "pauseMusicBtn" button is clicked, stop the video
            player.stopVideo();
        });

        });
     
      



  

  
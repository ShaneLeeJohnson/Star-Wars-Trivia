// Below here are the elements that will be used for dom manipulation
const storedScores = JSON.parse(localStorage.getItem('quizScores'));
const storedInitials = JSON.parse(localStorage.getItem('quizInitials'));
const clearBtn = document.querySelector('#clear');
const backBtn = document.querySelector('#back');
const highScores = document.querySelector('#high-scores-list');

highScores.style.display = 'none'

// This if statement checks if there exists a local storage from the user from this trivia page, 
// if it exists then it will print out the highscores that are saved in the users local storage.
if (storedScores && storedInitials) {
    for (let i = 0; i < storedScores.length; i++) {
        const highScore = document.createElement('li');
        const score = storedScores[i];
        const initials = storedInitials[i];
        highScore.textContent = `${initials} - ${score}`;
        highScores.appendChild(highScore);
    }
    highScores.style.display = 'block';
}

// This addEventListener that is attached to the clear button is used to clear the users local storage.
clearBtn.addEventListener('click', () => { 
    localStorage.clear();
    highScores.textContent = '';
})

// This addEventListener that is attached to the back button is used to redirect the user back to the starting page.
backBtn.addEventListener('click', () => { 
    window.location.href = './index.html';
})
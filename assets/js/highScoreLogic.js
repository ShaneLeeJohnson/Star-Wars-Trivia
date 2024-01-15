// Below here are the elements that will be used for dom minipulation
const storedScores = JSON.parse(localStorage.getItem('quizScores'));
const storedInitials = JSON.parse(localStorage.getItem('quizInitials'));
const clearBtn = document.querySelector('#clear');
const backBtn = document.querySelector('#back');
const highScores = document.querySelector('#high-scores-list');

highScores.style.display = 'none'

if (storedScores && storedInitials) { // This if statement is to check if there exists a local storage from the user from this trivia page, if it exists then it will print out the highscores that are saved in the uers local storage.
    for (let i = 0; i < storedScores.length; i++) {
        const highScore = document.createElement('li');
        const score = storedScores[i];
        const initials = storedInitials[i];
        highScore.textContent = `${initials} - ${score}`;
        highScores.appendChild(highScore);
    }
    highScores.style.display = 'block';
}

clearBtn.addEventListener('click', () => { // This addeventlistener that is attached to the clear button is used to clear the users local storage.
    localStorage.clear();
    highScores.textContent = '';
})

backBtn.addEventListener('click', () => { // This addeventlistener that is attached to the back button is used to redirect the user back to the starting page.
    window.location.href = './index.html';
})
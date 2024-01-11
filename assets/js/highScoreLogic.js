const storedScores = JSON.parse(localStorage.getItem('quizScores'));
const storedInitials = JSON.parse(localStorage.getItem('quizInitials'));
const clearBtn = document.querySelector('#clear');
const backBtn = document.querySelector('#back');
const highScores = document.querySelector('#high-scores-list');

highScores.style.display = 'none'

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

clearBtn.addEventListener('click', () => {
    localStorage.clear();
    highScores.textContent = '';
})

backBtn.addEventListener('click', () => {
    window.location.href = './index.html';
})
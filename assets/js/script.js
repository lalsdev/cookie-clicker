(() => {

    /* code */
    const $cookie = document.getElementById('data-cookie-im');
    const $score = document.getElementById('data-cookie-score');
    localStorage.score = localStorage.getItem('score') || 0;
    $score.innerHTML = localStorage.getItem('score');
    $cookie.addEventListener('click', () => {
        localStorage.score++;
        $score.innerHTML = localStorage.getItem('score');
    });
    //localStorage.removeItem('score');

})();
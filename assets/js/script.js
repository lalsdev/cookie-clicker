(() => {

    //declarer deux constantes qui vont cibler les elements en premier de l'image et puis du score
    const $cookie = document.getElementById("data-cookie-im"); //utilisation de $ pour se rapeller que c'est un element et pas un
    const $score = document.getElementById("data-cookie-score");
    const $reset = document.getElementById("data-cookie-reset");
    // on cree la propriete dans l'objet localstorage et ou lui attribue 
    // localStorage est un objet deja cree dans js on lui ajoute une cle et ou lui attribue une valeur
    localStorage.score = localStorage.getItem("score") || 0 ;
    $score.innerHTML = localStorage.getItem("score");

    $cookie.addEventListener("click", () => {
        // ajoute a la valeur de score 1 dans object localstorage
        localStorage.score++;
        // va changer dans l'element score avec methode innerHTML = prends valeur de score
        $score.innerHTML = localStorage.score;
    });

    $reset.addEventListener("click", () => { 
        // supprimer la propriete score
        localStorage.score = 0;
        $score.innerHTML = 0;
    });




})();
(() => {

    //declarer deux constantes qui vont cibler les elements en premier de l'image et puis du score
    const $cookie = document.getElementById("data-cookie-im"); //utilisation de $ pour se rapeller que c'est un element et pas un
    const $score = document.getElementById("data-cookie-score");
    const $reset = document.getElementById("data-cookie-reset");
    const $btnmult = document.getElementById("btn1");
    const $btnauto = document.getElementById("btn2");
    const $btnbon = document.getElementById("btn3");
    let timer = 20;
    let clickcount = 0;
    function activeBtn (btn, price){
        if (localStorage.score >= price) {
            // si valeur de score plus grande que 10 alors active le btn
            btn.removeAttribute("disabled");
        } else {
            //sinon desactive le bouton
            btn.setAttribute("disabled", "true");
        }
    }
    function decreaseTime (){
        ti = ti-1;
    }
    function animateTime($time, ti){
        // acceder a l'element time 
        if (ti > 0){
            setInterval(decreaseTime, 1000);
        }
    }
    // on cree la propriete dans l'objet localstorage et ou lui attribue 
    // localStorage est un objet deja cree dans js on lui ajoute une cle et ou lui attribue une valeur
    localStorage.score = localStorage.getItem("score") || 0 ;
    $score.innerHTML = localStorage.getItem("score");

    $cookie.addEventListener("click", () => {
        // ajoute a la valeur de score 1 dans object localstorage
        localStorage.score++;
        // va changer dans l'element score avec methode innerHTML = prends valeur de score
        $score.innerHTML = localStorage.score;
        activeBtn($btnmult, 10);
        activeBtn($btnauto, 20);
        activeBtn($btnbon, 30);
    });

    $reset.addEventListener("click", () => { 
        // supprimer la propriete score
        localStorage.score = 0;
        $score.innerHTML = 0;
        activeBtn($btnmult, 10);
        activeBtn($btnauto, 20);
        activeBtn($btnbon, 30);
    });

    // quand click sur btn mult une fois alors il retire 10 cookies de la variable
    $btnmult.addEventListener("click", ()=> {
        clickcount++;
        time--;
        console.log(time);
        if (clickcount == 1){
            localStorage.score = localStorage.score - 10;
            $score.innerHTML = localStorage.score;
            console.log(localStorage.score);
        } else if (clickcount > 1){
            localStorage.score = localStorage.score * 2;
            $score.innerHTML = localStorage.score;
            console.log(localStorage);

        };
    });

})();

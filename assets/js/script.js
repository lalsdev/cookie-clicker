(() => {

    // constantes pour les elements image, score, reset
    const $cookie = document.getElementById("data-cookie-im"); //utilisation de $ pour se rapeller que c'est un element et pas un
    const $score = document.getElementById("data-cookie-score");
    const $reset = document.getElementById("data-cookie-reset");
    //constantes pour les boutons puis dans un tableau
    const $btnmult = document.getElementById("btn1");
    const $btnauto = document.getElementById("btn2");
    const $btnbon = document.getElementById("btn3");
    const btns = [$btnmult, $btnauto, $btnbon];
    //const durees pour les trois boutons puis ces elements dans un tableau
    const $duration1 = document.querySelector("#btn1 span");
    const $duration2 = document.querySelector("#btn2 span");
    const $duration3 = document.querySelector("#btn3 span");
    const durations = [$duration1, $duration2, $duration3];
    
    // const prix qui vont changer
    const $price1 = document.querySelector("#price1 span");
    const $price2 = document.querySelector("#price2 span");
    const $price3 = document.querySelector("#price3 span");
    const prices = [$price1, $price2, $price3];

    // on cree la propriete dans l'objet localstorage et ou lui attribue 
    // localStorage est un objet deja cree dans js on lui ajoute une cle et ou lui attribue une valeur
    localStorage.score = localStorage.getItem("score") || 0;
    localStorage.multiplier = localStorage.getItem("multiplier") || 1; 
    localStorage.autoclick = localStorage.getItem("autoclick") || 0;
    $score.innerHTML = parseInt(localStorage.score);

    // Functions

    //toggle means active and desactive one button
    //fonction va aller chercher l'index qu'on lui donne du bouton
    //pour chaque index on active ou desactive le bouton
    function toggleOneBtn(btnindex) {
        const $btn = btns[btnindex];
        // recupere l'element avec la valeur de l'index du tableau prices
        const $price = prices[btnindex];
        //recupere vraie valeur donc 
        const price = parseInt($price.innerHTML);
        // recupere valeur pour score et pas element
        const score = parseInt(localStorage.score);
        if (score >= price) {
            // si valeur de score plus grande que 10 alors active le btn
            $btn.removeAttribute("disabled");
        } else {
            //sinon desactive le bouton
            $btn.setAttribute("disabled", "true");
        }
    }
    function toggleAllBtns() {
        for (let btnindex in btns) {
            toggleOneBtn(btnindex);
        }
    }

    function addCookie() {
        const quantityAdd = parseInt(localStorage.multiplier)*1;
        const newScore = parseInt(localStorage.score) + quantityAdd;
        $score.innerHTML = newScore;
        localStorage.score = newScore;
    }

    
    //Events

    $cookie.addEventListener("click", () => {
        addCookie();
        toggleAllBtns();
    });

    $reset.addEventListener("click", () => {
        $score.innerHTML = 0;
        localStorage.score = 0;
        localStorage.multiplier = 1;
        localStorage.autoclick = 0;
        toggleAllBtns();
    });

})();

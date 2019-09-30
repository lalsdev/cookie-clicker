(() => {

    // constantes pour les elements image, score, reset
    const $cookie = document.getElementById("data-cookie-im"); //utilisation de $ pour se rapeller que c'est un element et pas un
    const $score = document.getElementById("data-cookie-score");
    const $reset = document.getElementById("data-cookie-reset");
    //constantes pour les boutons puis dans un tableau
    const $btnmult = document.getElementById("btn1");
    const $btnauto = document.getElementById("btn2");
    const $btnbon = document.getElementById("btn3");
    const $valueMultiplier = document.querySelector(".btn-value");
    const btns = [$btnmult, $btnauto, $btnbon];
    //const durees pour les trois boutons puis ces elements dans un tableau
    const $duration1 = document.querySelector("#time1 span");
    const $duration2 = document.querySelector("#time2 span");
    const $duration3 = document.querySelector("#time3 span");
    const durations = [$duration1, $duration2, $duration3];
    
    // const prix qui vont changer
    const $price1 = document.querySelector("#price1 span");
    const $price2 = document.querySelector("#price2 span");
    const $price3 = document.querySelector("#price3 span");
    const prices = [$price1, $price2, $price3];

    //const interval pour les animations
    const intervalIds = [undefined, undefined, undefined];

    // on cree la propriete dans l'objet localstorage et ou lui attribue 
    // localStorage est un objet deja cree dans js on lui ajoute une cle et ou lui attribue une valeur
    localStorage.score = localStorage.getItem("score") || 0;
    localStorage.multiplier = localStorage.getItem("multiplier") || 1; 
    localStorage.autoclick = localStorage.getItem("autoclick") || 0;
    localStorage.purchasesMultiplier = "false";
    localStorage.purchasesAuto = "false";
    localStorage.purchasesBonus = "false";
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

    function decreaseDuration(btnindex) {
        const $duration = durations[btnindex];
        const seconds = parseInt($duration.innerHTML) - 1;
        if (seconds >= 0) {
            $duration.innerHTML = seconds;
            $duration.style.color = "#820d0d";
            $duration.style.fontWeight = "bold";
        } else {
            $duration.innerHTML = 30;
            $duration.style.color = "#969696";
            $duration.style.fontWeight = "normal";
            clearInterval(intervalIds[2]);
            $valueMultiplier.innerHTML = "x5";
            if (!$btnmult.getAttribute("disabled")) {
                localStorage.multiplier = 5;
            }
            else {localStorage.multiplier = 1;}


        }

    }

    function animateDuration(btnindex) {
        intervalIds[btnindex] = setInterval(decreaseDuration, 1000, btnindex);
    }

    function increaseScore(btnindex) {
        const newScore = parseInt($score.innerHTML) + 1 ;
        $score.innerHTML = newScore;
        localStorage.score = newScore;
    }

    function animateScore(btnindex) {
        intervalIds[btnindex] = setInterval(increaseScore, 1000, btnindex);
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
        clearInterval(intervalIds[1]);
    });

    $btnmult.addEventListener("click", () => {
        //travaille que si attribut disabled n'est pas present dans le bouton btnmult = que le bouton est actif
        //condition est-ce qu'on peut faire quelque chose si le bouton est active
        if (!$btnmult.getAttribute("disabled")) {
            // si pas encore acheter alors fais ca et si pas encore acheter
            if (localStorage.purchasesMultiplier == "false") {
                localStorage.purchasesMultiplier = "true";
                const newScore = parseInt($score.innerHTML) - parseInt($price1.innerHTML);
                if (newScore >= 0){
                    $score.innerHTML = newScore;
                    localStorage.score = newScore;
                } 
                localStorage.multiplier = 5;
            }
            else {localStorage.purchasesMultiplier = "false";}
        }
        else {
            localStorage.purchases[0] = "false";
            localStorage.multiplier = 1;
        }
    });

    $btnauto.addEventListener("click", () => {
        if (!$btnauto.getAttribute("disabled")) {
            if (localStorage.purchasesAuto == "false") {
                localStorage.purchasesAuto = "true";
                const newScore = parseInt($score.innerHTML) - parseInt($price2.innerHTML);
                if (newScore >= 0){
                    $score.innerHTML = newScore;
                    localStorage.score = newScore;
                } 
                animateScore(1);
            } 
            else {localStorage.purchasesAuto = "false";}
        }
        else {localStorage.purchasesAuto = "false";}

    });

    $btnbon.addEventListener("click", () => {
        if (!$btnbon.getAttribute("disabled")) {
            if (localStorage.purchasesBonus == "false") {
                localStorage.purchasesBonus = "true";
                const newScore = parseInt($score.innerHTML) - parseInt($price3.innerHTML);
                if (newScore >= 0){
                    $score.innerHTML = newScore;
                    localStorage.score = newScore;
                    $valueMultiplier.innerHTML = "x200";
                    localStorage.multiplier = 200;
                }
                animateDuration(2);
            }
            else{localStorage.purchasesBonus = "false";}
        }
        else {localStorage.purchasesBonus = "false";}
    });

})();

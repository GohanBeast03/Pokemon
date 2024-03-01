import { pokemon, setPokemon, salvaStatisticheOriginali} from "./Pokemon.js";
import {mosse, controlloMosse} from "./Mosse.js";
import {g1,cpu} from "./Pokemon.js";
import { ordineAttacco } from "./Attacco.js";
import * as funzioni from "./calcoli&funzioni.js";

var game = document.getElementById("game");

export function start(){
    sceltaPokemon(g1);
}

function sceltaPokemon(p){

    var titolo = document.createElement("h2");
    setTitolo(titolo, p);
    game.appendChild(titolo);

    var menuNomi = document.createElement("select");
    menuNomi.id = "menuNomi";
    var listaNomi = new Array(pokemon.length);
    for (var i=0; i<pokemon.length; i++){
        listaNomi[i] = document.createElement("option");
        listaNomi[i].value = pokemon[i].nome;
        listaNomi[i].textContent = pokemon[i].nome;
        menuNomi.appendChild(listaNomi[i]);
    } 
    game.appendChild(menuNomi);

    aCapo();

    var buttonNomeG1 = document.createElement("button");
    buttonNomeG1.textContent = "ho scelto il nome";
    buttonNomeG1.addEventListener("click", function(){
        sceltaMosse(p);
    })
    game.appendChild(buttonNomeG1);
}

function setTitolo(t,p){
    //if (p.codice === "G1")
        t.textContent = "Scegli il tuo pokemon";
}

function aCapo(){
    const capo = document.createElement("p");
    game.appendChild(capo);
}

function sceltaMosse(p){
    p.nome = document.getElementById("menuNomi").value;
    
    aCapo();

    var menuMosse = new Array(4);
    var listaMosse = new Array(mosse.length+1);

    // Creazione delle opzioni per ogni mossa
    for (var i = 1; i < listaMosse.length; i++) {
        listaMosse[i] = document.createElement("option");
        listaMosse[i].value = mosse[i-1].nome;
        listaMosse[i].textContent = mosse[i-1].nome;
    }

    // Creazione dei select e aggiunta delle opzioni
    for (var i = 0; i < 4; i++) {
        menuMosse[i] = document.createElement("select");
        menuMosse[i].id = "menuMosse" + (i + 1);

        // Creazione di nuove opzioni per ogni select
        for (var j = 0; j < listaMosse.length; j++) {
            var opzione = document.createElement("option");
            if (j==0){
                opzione.value="/";
                opzione.textContent="/";
                menuMosse[i].appendChild(opzione);
                continue;
            }
            opzione.value = listaMosse[j].value;
            opzione.textContent = listaMosse[j].textContent;
            menuMosse[i].appendChild(opzione);
        }

        game.appendChild(menuMosse[i]);
        aCapo();
    }

    var confermaPokemon = document.createElement("button");
    confermaPokemon.textContent="HO SCELTO";
    confermaPokemon.addEventListener("click", function(){
        if (controlloMosse(p)==0){
            aCapo();
            var error = document.createElement("p");
            error.textContent = "devi inserire minimo una mossa, e tutte diverse!";
            game.appendChild(error);
        }
        else {
            setPokemon(p);
            loading(); 
            setTimeout(function(){
                pulisciGame();
                if (cpu.nome === "/")
                    sceltaPokemon(cpu);
                else 
                    lotta();
            },2000);
        }
    });
    game.appendChild(confermaPokemon);
}

function loading(){
    game.innerHTML = "loading...";
}

function pulisciGame(){
    game.innerHTML = "";
}

var lottaincorso = false;
function lotta(){
    lottaincorso=true;
    //alert(g1.immagineCPU);
    setCampoLotta();
    setCampoMD();
    setCampoTesto();
}

var campoLotta;
function setCampoLotta(){

    funzioni.setHpG1Iniziali(g1.hp);
    funzioni.setHpCPUIniziali(cpu.hp);
    salvaStatisticheOriginali();
    
    campoLotta = document.createElement("div");
    campoLotta.id = "campoLotta";

    var spriteG1 = document.createElement("img");
    spriteG1.src=g1.immagineG1;
    spriteG1.id="spriteG1";
    campoLotta.appendChild(spriteG1);

    var spriteCPU = document.createElement("img");
    spriteCPU.src = cpu.immagineCPU;
    spriteCPU.id = "spriteCPU";
    campoLotta.appendChild(spriteCPU);

    var infoG1 = document.createElement("div");
    infoG1.id = "infoG1";
    infoG1.innerHTML = g1.nome+"            LV: "+g1.livello;
    var contenitoreBarraG1 = document.createElement("div");
    contenitoreBarraG1.id = "contenitoreBarra";
    var barraSaluteG1 = document.createElement("div");
    barraSaluteG1.id = "barraSaluteG1";
    contenitoreBarraG1.appendChild(barraSaluteG1);
    infoG1.appendChild(contenitoreBarraG1);
    campoLotta.appendChild(infoG1);

    var infoCPU = document.createElement("div");
    infoCPU.id = "infoCPU";
    infoCPU.innerHTML = cpu.nome+"            LV: "+cpu.livello;
    var contenitoreBarraCPU = document.createElement("div");
    contenitoreBarraCPU.id = "contenitoreBarra";
    var barraSaluteCPU = document.createElement("div");
    barraSaluteCPU.id = "barraSaluteCPU";
    contenitoreBarraCPU.appendChild(barraSaluteCPU);
    infoCPU.appendChild(contenitoreBarraCPU);
    campoLotta.appendChild(infoCPU);

    game.appendChild(campoLotta);
}

var campoMD;
var campoMosse;
function setCampoMD(){
    campoMD = document.createElement("div");
    campoMD.id = "campoMD";
    campoMosse = document.createElement("div");
    campoMosse.id = "campoMosse";
    campoMD.appendChild(campoMosse);
    game.appendChild(campoMD);

    var x=70;
    var pulsanteMossa1 = document.createElement("button");
    pulsanteMossa1.textContent=g1.mossa1;
    pulsanteMossa1.id = "pulsanteMossa";
    pulsanteMossa1.style.left = x+'px';
    if (g1.mossa1!=="/"){
        pulsanteMossa1.addEventListener("click", function(){
            ordineAttacco(g1.mossa1);
        });
    }
    campoMosse.appendChild(pulsanteMossa1);

    var pulsanteMossa2 = document.createElement("button");
    pulsanteMossa2.textContent=g1.mossa2;
    pulsanteMossa2.id = "pulsanteMossa";
    pulsanteMossa2.style.left = x*4+'px';
    if (g1.mossa2!=="/"){
        pulsanteMossa2.addEventListener("click", function(){
            ordineAttacco(g1.mossa2);
        });
    }
    campoMosse.appendChild(pulsanteMossa2);

    var pulsanteMossa3 = document.createElement("button");
    pulsanteMossa3.textContent=g1.mossa3;
    pulsanteMossa3.id = "pulsanteMossa";
    pulsanteMossa3.style.left = x*7+'px';
    if (g1.mossa3!=="/"){
        pulsanteMossa3.addEventListener("click", function(){
            ordineAttacco(g1.mossa3);
        });
    }
    campoMosse.appendChild(pulsanteMossa3);

    var pulsanteMossa4 = document.createElement("button");
    pulsanteMossa4.textContent=g1.mossa4;
    pulsanteMossa4.id = "pulsanteMossa";
    pulsanteMossa4.style.left = x*10+'px';
    if (g1.mossa4!=="/"){
        pulsanteMossa4.addEventListener("click", function(){
            ordineAttacco(g1.mossa4);
        });
    }
    campoMosse.appendChild(pulsanteMossa4);
}

var campoTesto;
function setCampoTesto(){
    campoTesto = document.createElement("div");
    campoTesto.id = "campoTesto";
    game.appendChild(campoTesto);
}






var gameEnd = setInterval(function(){
    if ((g1.hp<=0 || cpu.hp<=0) && lottaincorso){
        setTimeout(function(){
            var vincitore;
            if (g1.hp<=0)
                vincitore=cpu.nome+" nemico";
            else 
                vincitore=g1.nome;
            pulisciGame();
            game.innerHTML = vincitore + " ha vinto!!!";
            lottaincorso=false;
            clearInterval(gameEnd);
        },2000)
    }
},1);


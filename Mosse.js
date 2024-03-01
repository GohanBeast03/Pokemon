import * as funzioni from "./calcoli&funzioni.js";


class Mossa{
    constructor(nome, potenza, precisione, tipo, categoria, output){
        this.nome = nome;
        this.potenza = potenza;
        this.precisione = precisione;
        this.tipo = tipo;
        this.categoria = categoria;
        this.output = output;
    }
}

export var mosse = [
    new Mossa("Psichico", 90,100,"psico","speciale","danno"),
    new Mossa("Palla_Ombra", 90,100,"spettro","speciale","danno"),
    new Mossa("Fangobomba", 90, 100, "veleno", "speciale", "danno"),
    new Mossa("Lanciafiamme", 90, 100, "fuoco", "speciale", "danno"),
    new Mossa("Fulmine", 90,100, "elettro", "speciale", "danno")
];

export function controlloMosse(p){
    p.mossa1 = document.getElementById("menuMosse1").value;
    p.mossa2 = document.getElementById("menuMosse2").value;
    p.mossa3 = document.getElementById("menuMosse3").value;
    p.mossa4 = document.getElementById("menuMosse4").value;
    if (p.mossa1=="/" && p.mossa2 == "/" && p.mossa3 == "/" && p.mossa4 == "/")
        return 0;
    var control = [p.mossa1, p.mossa2, p.mossa3, p.mossa4];
    var x = 1;
    for (var i=0; i<control.length; i++){
        for (var j=0; j<control.length; j++){
            if (control[i]!=="/" && i!=j){
                if (control[i]===control[j])
                    x = 0;
            }
        }
    }
    return x;
}

function getIndice(x){
    var i=0;
    for (var j=0; j<mosse.length; j++){
        if (mosse[j].nome === x){
            i=j;
            break;
        }
    }
    return i;
}





function attaccoGenerale(attaccante, difensore, indice){
    var simboloAttacco = document.createElement("img");
    simboloAttacco.id = "simboloAttacco";
    simboloAttacco.src = funzioni.getSimboloAttaccoIndirizzo(mosse[indice].tipo);

    var campoLotta = document.getElementById("campoLotta");
    campoLotta.appendChild(simboloAttacco);
    funzioni.animaSimboloAttacco(attaccante, simboloAttacco);
    funzioni.animaPokemonColpito(difensore);
    funzioni.decrementaHp(attaccante, difensore, mosse[indice].potenza, mosse[indice].categoria, mosse[indice].tipo);
}
























//---------------------------------------------- FUNZIONI DELLE MOSSE -----------------------------------------------

export function Psichico(attaccante, difensore){

    var indice = getIndice("Psichico");

    funzioni.printTestoMossa(attaccante, mosse[indice].nome);
    //funzioni.printDidascaliaMossa(attaccante, mosse[indice].nome);
    
    attaccoGenerale(attaccante, difensore, indice);

    var tempo = 4000;

    var effettoSecondario = Math.floor(Math.random()*10);
    if (effettoSecondario==1){
        setTimeout(function(){
            funzioni.diminuisciDifesaSP(difensore);
        }, tempo);
        tempo+=2000;
    }
    return tempo;
}

export function Palla_Ombra(attaccante, difensore){

    var indice = getIndice("Palla_Ombra");

    funzioni.printTestoMossa(attaccante, mosse[indice].nome);

    attaccoGenerale(attaccante, difensore, indice);

    var tempo = 4000;

    var effettoSecondario = Math.floor(Math.random()*10);
    if (effettoSecondario==1){
        setTimeout(function(){
            funzioni.diminuisciDifesaSP(difensore);
        }, tempo);
        tempo+=2000;
    }
    return tempo;
}

export function Fangobomba(attaccante, difensore){
    
    var indice = getIndice("Fangobomba");

    funzioni.printTestoMossa(attaccante, mosse[indice].nome);

    attaccoGenerale(attaccante, difensore, indice);

    var tempo = 4000;
    
    var effettoSecondario = Math.floor(Math.random()*10);
    if (effettoSecondario==1){
        setTimeout(function(){
            funzioni.avvelena(difensore);
        }, tempo);
        tempo+=2000;
    }
    return tempo;
}

export function Lanciafiamme(attaccante, difensore){

    var indice = getIndice("Lanciafiamme");

    funzioni.printTestoMossa(attaccante, mosse[indice].nome);

    attaccoGenerale(attaccante, difensore, indice);

    var tempo = 4000;

    var effettoSecondario = Math.floor(Math.random()*10);
    if (effettoSecondario==1){
        setTimeout(function(){
            funzioni.brucia(difensore);
        }, tempo);
        tempo+=2000;
    }
    return tempo;
}

export function Fulmine(attaccante, difensore){
    var indice = getIndice("Fulmine");

    funzioni.printTestoMossa(attaccante, mosse[indice].nome);

    attaccoGenerale(attaccante, difensore, indice);

    var tempo = 4000;

    var effettoSecondario = Math.floor(Math.random()*10);
    if (effettoSecondario!=1){
        setTimeout(function(){
            funzioni.paralizza(difensore);
        }, tempo);
        tempo+=2000;
    }
    return tempo;
}
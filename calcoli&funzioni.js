import { statisticheOriginaliG1, statisticheOriginaliCPU } from "./Pokemon.js";

export function printTesto(t){
    document.getElementById("campoTesto").innerHTML+=t;
}

export function printTestoMossa(attaccante, nomeMossa){
    if (attaccante.codice === "CPU")
        document.getElementById("campoTesto").innerHTML+=attaccante.nome + " nemico usa "+nomeMossa;
    else 
        document.getElementById("campoTesto").innerHTML+=attaccante.nome + " usa "+nomeMossa;
}

export function getSimboloAttaccoIndirizzo(tipo){
    switch (tipo){
        case "psico":
        case "veleno":
            return "https://media.pokemoncentral.it/wiki/thumb/f/f9/Icona_Psiche_GCC.png/20px-Icona_Psiche_GCC.png";
            break;
        case "buio":
        case "spettro":
            return "https://media.pokemoncentral.it/wiki/thumb/2/25/Icona_Oscurit%C3%A0_GCC.png/20px-Icona_Oscurit%C3%A0_GCC.png"
            break;
        case "fuoco":
            return "https://media.pokemoncentral.it/wiki/thumb/e/e0/Icona_Fuoco_GCC.png/20px-Icona_Fuoco_GCC.png";
        case "elettro":
            return "https://media.pokemoncentral.it/wiki/thumb/c/c2/Icona_Lampo_GCC.png/20px-Icona_Lampo_GCC.png";
    }
}

export function animaSimboloAttacco(attaccante, simboloAttacco){
    if (attaccante.codice === "G1"){
        document.documentElement.style.setProperty("--leftStart", "300px");
        document.documentElement.style.setProperty("--topStart", "350px");
        document.documentElement.style.setProperty("--leftEnd", "570px");
        document.documentElement.style.setProperty("--topEnd", "130px");
    }
    else {
        document.documentElement.style.setProperty("--leftStart", "570px");
        document.documentElement.style.setProperty("--topStart", "130px");
        document.documentElement.style.setProperty("--leftEnd", "300px");
        document.documentElement.style.setProperty("--topEnd", "350px");
    }
    if (simboloAttacco.classList!="animazioneSimbolo")
        simboloAttacco.classList.add("animazioneSimbolo");
    setTimeout(function(){
        simboloAttacco.classList.remove("animazioneSimbolo");
        simboloAttacco.style.display="none";
    },1500);
}

export function animaPokemonColpito(difensore){
    var immagine = document.getElementById("sprite"+difensore.codice);

    setTimeout(function(){
        if (immagine.classList!="animazioneColpito")
            immagine.classList.add("animazioneColpito");
        setTimeout(function(){
            immagine.classList.remove("animazioneColpito");
        },2000);
    },1500);
}

var hpG1;
var hpCPU;
var lunghezzaInizialeBarra = 170;
export function decrementaHp(attaccante, difensore, potenza, categoria, tipo){
    /*
        1 calcolare il danno
        2 proporzionare il danno con la barra salute
        3 decrementare barra salute
    */
    var potenzaOffensiva;
    var potenzaDifensiva;
    if (categoria==="speciale"){
        potenzaOffensiva = attaccante.attaccoSP;
        potenzaDifensiva = difensore.difesaSP;
    }
    else {
        potenzaOffensiva = attaccante.attacco;
        potenzaDifensiva = difensore.difesa;
    }

    var danno = calcoloDanno(potenzaOffensiva, potenzaDifensiva, attaccante, difensore, potenza, tipo);
    
    setTimeout(function(){
        decrementaBarraSalute(danno, difensore);
        diminuisciHp(difensore, danno);
        
    },2000);
}   

function calcoloDanno(off, def, attaccante, difensore, potenza, tipo){
    var danno;
    danno = (((2*attaccante.livello/5+2)*potenza*(off/def))/50+2)*modificatore(attaccante, difensore, tipo);
    return danno;
}
function modificatore(attaccante, difensore, tipo){
    var modificatore = 1;
    var crit=Math.floor(Math.random()*16);
    if (crit==1){
        modificatore=modificatore*2;
        printTesto(", brutto colpo");
    }
    var rng = Math.floor(Math.random()*16)+85;
    rng=rng/100;
    modificatore*=rng;
    if (controlloTipo(attaccante, tipo))
        modificatore*=1.5;
    if (attaccante.condizionePrimaria==="bruciato")
        modificatore*=0.5;
    var cE = controlloEfficacia(tipo, difensore);
    modificatore*=cE;
    if (cE== 2 || cE==4)
        printTesto(", è superefficace");
    else if (cE==0.5 || cE==0.25)
        printTesto(", non è molto efficace");
    else if (cE ==0)
        printTesto(", non ha effetto");
    return modificatore;
}
function controlloTipo(p, tipo){
    if (p.tipo1 === tipo || p.tipo2===tipo)
        return true;
}


function hpAnalizzare(p){
    if (p.codice === "G1")
        return hpG1;
    else 
        return hpCPU;
}

function decrementaBarraSalute(vitaPersa, p){
    var hpDaAnalizzare = hpAnalizzare(p);
    var barraSalute = document.getElementById("barraSalute"+p.codice);
    document.documentElement.style.setProperty("--barraStart", document.getElementById("barraSalute"+p.codice).offsetWidth+'px');
    var differenza = document.getElementById("barraSalute"+p.codice).offsetWidth-lunghezzaInizialeBarra*vitaPersa/hpDaAnalizzare;
    if (differenza<=0)
        document.documentElement.style.setProperty("--barraEnd", 0+'px');
    else 
        document.documentElement.style.setProperty("--barraEnd", differenza+'px');
    if (barraSalute.classList!="animazioneDecrementa")
        barraSalute.classList.add("animazioneDecrementa");
    setTimeout(function(){
        barraSalute.classList.remove("animazioneDecrementa");
        if (differenza>0)
            barraSalute.style.width = differenza+'px';
        else if (differenza<=0)
            barraSalute.style.width = 0+'px';
    }, 2000);
}

function diminuisciHp(p,x){
    p.hp-=x;
}
function aumentaHp(p,x){
    p.hp+=x;
}

export function setHpG1Iniziali(x){
    hpG1=x;
}

export function setHpCPUIniziali(x){
    hpCPU = x;
}

export function diminuisciDifesaSP(p){
    p.difesaSP*=0.7;
    if (p.codice === "CPU")
        printTesto(", difesa speciale di "+p.nome+" nemico cala");
    else 
        printTesto(", difesa speciale di "+p.nome+" cala");
    animazioneDiminuzionStatistica(p);
}

function animazioneDiminuzionStatistica(p){
    var sprite = document.getElementById("sprite"+p.codice);
    if (sprite.classList!="animazioneDiminuzione")
        sprite.classList.add("animazioneDiminuzione");
    setTimeout(function(){
        sprite.classList.remove("animazioneDiminuzione");
    },2000);
}


export function avvelena(p){
    if (p.condizionePrimaria==="/"){
        p.condizionePrimaria="avvelenamento";
        if (p.codice==="G1")
            printTesto(", "+p.nome + " è stato avvelenato");
        else
            printTesto(", "+p.nome + " nemico è stato avvelenato");
    }
        
}


export function brucia(p){
    if (p.condizionePrimaria==="/"){
        p.condizionePrimaria="bruciatura";
        if (p.codice==="G1")
            printTesto(", "+ p.nome+" è stato scottato");
        else 
            printTesto(", "+ p.nome + " nemico è stato scottato");
    }
}

export function paralizza(p){
    if (p.condizionePrimaria==="/"){
        p.condizionePrimaria ="paralisi";
        if (p.codice ==="G1")
            printTesto(", "+ p.nome+" è stato paralizzato");
        else 
            printTesto(", "+ p.nome + " nemico è stato paralizzato");
    }
}


function controlloAvvelenamento(p){
    if (p.condizionePrimaria==="avvelenamento"){
        var sprite = document.getElementById("sprite"+p.codice);
        if (sprite.classList!="animazioneVeleno")
            sprite.classList.add("animazioneVeleno");
        setTimeout(function(){
            sprite.classList.remove("animazioneVeleno");
            decrementaBarraSalute(hpAnalizzare(p)/8, p);
            diminuisciHp(p, hpAnalizzare(p)/8);
            if (p.codice === "G1")
                printTesto(p.nome+" perde ps per colpa del veleno");
            else 
                printTesto(p.nome+" nemico perde ps per colpa del veleno");
        },2000);
        return 4000;
    }
    else 
        return 0;
}


function controlloBruciatura(p){
    if (p.condizionePrimaria==="bruciatura"){
        var sprite = document.getElementById("sprite"+p.codice);
        if (sprite.classList!="animazioneBruciatura")
            sprite.classList.add("animazioneBruciatura");
        setTimeout(function(){
            sprite.classList.remove("animazioneBruciatura");
            decrementaBarraSalute(hpAnalizzare(p)/8, p);
            diminuisciHp(p, hpAnalizzare(p)/8);
            if (p.codice === "G1")
                printTesto(p.nome+" perde ps per colpa della scottatura");
            else 
                printTesto(p.nome+" nemico perde ps per colpa della scottatura");
        },2000);
        return 4000;
    }
    else 
        return 0;
}

var indiceParalisi;
export function controlloParalisi(p){
    indiceParalisi = Math.floor(Math.random()*100)+1;
    if (p.condizionePrimaria==="paralisi"){
        if (indiceParalisi<25)
            return 0;
        var sprite = document.getElementById("sprite"+p.codice);
        if (sprite.classList!="animazioneParalisi")
            sprite.classList.add("animazioneParalisi");
        setTimeout(function(){
            sprite.classList.remove("animazioneParalisi");
            if (p.codice ==="G1")
                printTesto(p.nome+" è paralizzato, non può agire\n");
            else 
                printTesto(p.nome+" nemico è paralizzato , non può agire\n");
        },2000)
        return 1;
    }
    else 
        return 0;
}

export function controlloCondizionePostAttacco(p,problema){
    switch (problema){
        case "avvelenamento":
            return controlloAvvelenamento(p);
            break;
        case "bruciatura":
            return controlloBruciatura(p);
            break;
        default:
            return 0;
            break;
    }
}







































































































































function controlloEfficacia(tipo, difensore){
    var x = 1;
    switch(tipo){
        case "psico":
            if (controlloTipo(difensore,"veleno"))
                x*=2;
            if (controlloTipo(difensore, "lotta"))
                x*=2;
            if (controlloTipo(difensore,"psico"))
                x*=0.5;
            if (controlloTipo(difensore, "buio"))
                x*=0;
            break;
        case  "spettro":
            if (controlloTipo(difensore,"spettro"))
                x*=2;
            if (controlloTipo(difensore, "psico"))
                x*=2;
            if (controlloTipo(difensore,"normale"))
                x*=0;
            if (controlloTipo(difensore, "buio"))
                x*=0.5;
            if (controlloTipo(difensore, "acciaio"))
                x*=0.5;
            break;
        case "buio":
            if (controlloTipo(difensore, "buio"))
                x*=0.5;
            if (controlloTipo(difensore, "spettro"))
                x*=2;
            if (controlloTipo(difensore, "psico"))
                x*=2;
            if (controlloTipo(difensore, "lotta"))
                x*=0.5;
            if (controlloTipo(difensore, "acciaio"))
                x*=0.5;
            break;
        case "volante":
            if (controlloTipo(difensore, "elettro"))
                x*=0.5;
            if (controlloTipo(difensore, "lotta"))
                x*=2;
            if (controlloTipo(difensore, "erba"))
                x*=2;
            if (controlloTipo(difensore, "acciaio"))
                x*=0.5;
            if (controlloTipo(difensore, "roccia"))
                x*=0.5;
            if (controlloTipo(difensore, "coleottero"))
                x*=2;
            break;
        case "fuoco":
            if (controlloTipo(difensore, "coleottero"))
                x*=2;
            if (controlloTipo(difensore, "erba"))
                x*=2;
            if (controlloTipo(difensore, "acciaio"))
                x*=2;
            if (controlloTipo(difensore, "ghiaccio"))
                x*=2;
            if (controlloTipo(difensore, "fuoco"))
                x*=0.5;
            if (controlloTipo(difensore, "acqua"))
                x*=0.5;
            if (controlloTipo(difensore, "roccia"))
                x*=0.5;
            if (controlloTipo(difensore, "drago"))
                x*=0.5;
        case "terra":
            if (controlloTipo(difensore, "fuoco"))
                x*=2;
            if (controlloTipo(difensore, "roccia"))
                x*=2;
            if (controlloTipo(difensore, "acciaio"))
                x*=2;
            if (controlloTipo(difensore, "elettro"))
                x*=2;
            if (controlloTipo(difensore, "veleno"))
                x*=2;
            if (controlloTipo(difensore, "volante"))
                x*=0;
            if (controlloTipo(difensore, "coleottero"))
                x*=0.5;
            if (controlloTipo(difensore, "erba"))
                x*=0.5;
        case "elettro":
            if (controlloTipo(difensore, "acqua"))
                x*=2;
            if (controlloTipo(difensore, "volante"))
                x*=2;
            if (controlloTipo(difensore, "terra"))
                x*=0;
            if (controlloTipo(difensore, "elettro"))
                x*=0.5;
            if (controlloTipo(difensore, "erba"))
                x*=0.5;
            if (controlloTipo(difensore, "drago"))
                x*=0.5;
    }
    return x;
}
class Pokemon{
    constructor (codice, nome, tipo1, tipo2, mossa1, mossa2, mossa3, mossa4, hp, attacco, difesa, attaccoSP, difesaSP, velocita,
        immagineG1, immagineCPU,condizionePrimaria, condizioniSecondarie, parcoMosse){
        this.codice = codice;
        this.nome = nome;
        this.livello=50;
        this.tipo1 = tipo1;
        this.tipo2 = tipo2;
        this.mossa1 = mossa1;
        this.mossa2 = mossa2;
        this.mossa3 = mossa3;
        this.mossa4 = mossa4;
        this.hp = hp;
        this.attacco = attacco;
        this.difesa = difesa;
        this.attaccoSP = attaccoSP;
        this.difesaSP = difesaSP;
        this.velocita = velocita;
        this.immagineG1 = immagineG1;
        this.immagineCPU = immagineCPU;
        this.condizionePrimaria = condizionePrimaria;
        this.condizioniSecondarie = condizioniSecondarie;
        this.parcoMosse = parcoMosse;
    }
}

export var pokemon = [
    new Pokemon(150, "Mewtwo", "psico", "/","/", "/","/","/", 106,110,90,154,90,130, "https://media.pokemoncentral.it/wiki/a/a6/Sprxymd0150.gif", "https://media.pokemoncentral.it/wiki/7/7d/Sprxym0150.gif", "/", [0,0,0], ["Psichico","Palla_Ombra", "Fulmine"]),
    new Pokemon(151, "Mew", "psico","/","/", "/","/","/", 100,100,100,100,100,129, "https://media.pokemoncentral.it/wiki/e/ee/Sprxymd0151.gif", "https://media.pokemoncentral.it/wiki/3/33/Sprxym0151.gif", "/", [0,0,0], ["Psichico","Palla_Ombra","Fulmine"])
];

export var g1 = new Pokemon("G1", "/", "/", "/","/","/","/","/",0,0,0,0,0,0,"","","/",[0,0,0],[]);
export var cpu = new Pokemon("CPU", "/", "/", "/","/","/","/","/",0,0,0,0,0,0,"","","/",[0,0,0],[]);


export function setPokemon(p){
    for (var i=0; i<pokemon.length; i++){
        if (p.nome === pokemon[i].nome){
            p.tipo1 = pokemon[i].tipo1;
            p.tipo2 = pokemon[i].tipo2;
            p.hp = (((2*pokemon[i].hp+31)*p.livello)/100)+p.livello+10;
            p.attacco = (((2*pokemon[i].attacco+31)*p.livello)/100)+5;
            p.difesa = (((2*pokemon[i].difesa+31)*p.livello)/100)+5;
            p.attaccoSP = (((2*pokemon[i].attaccoSP+31)*p.livello)/100)+5;
            p.difesaSP = (((2*pokemon[i].difesaSP+31)*p.livello)/100)+5;
            p.velocita = (((2*pokemon[i].velocita+31)*p.livello)/100)+5;
            p.immagineG1 = pokemon[i].immagineG1;
            p.immagineCPU = pokemon[i].immagineCPU;
            p.parcoMosse = pokemon[i].parcoMosse;
            //alert(p.mossa1);
        }
    }
}


export function scegliAttaccoCPU(){
    var mosseCPU = [cpu.mossa1, cpu.mossa2, cpu.mossa3, cpu.mossa4];
    var mossevalide = new Array(1);
    var c =0; 
    for (var i=0; i<mosseCPU.length; i++){
        if (mosseCPU[i]!=="/"){
            if (c==0){
                mossevalide[c]=mosseCPU[i];
                c++;
            }
            else{
                mossevalide.push(mosseCPU[i]);
                c++;
            }
        }
    }
    var y=Math.floor(Math.random()*c);
    return mossevalide[y];
}


export var statisticheOriginaliG1;
export var statisticheOriginaliCPU;

export function salvaStatisticheOriginali(){
    statisticheOriginaliG1 = [g1.hp, g1.attacco, g1.difesa, g1.attaccoSP, g1.difesaSP, g1.velocita];
    statisticheOriginaliCPU = [cpu.hp, cpu.attacco, cpu.difesa, cpu.attaccoSP, cpu.difesaSP, cpu.velocita]; 
}


import * as MOSSE from "./Mosse.js";
import {g1,cpu} from "./Pokemon.js";
import { scegliAttaccoCPU } from "./Pokemon.js";
import * as funzioni from "./calcoli&funzioni.js";

var contaTurni = 1;
var speedPari = -1;
var attaccoincorso = false;
export function ordineAttacco(attaccoG1){
    var attaccoAvversario = scegliAttaccoCPU();
    if (speedPari==-1)
        funzioni.printTesto("Turno "+contaTurni+"<br>");
    attaccoincorso = true;
    if (g1.velocita > cpu.velocita || speedPari==0){
        setTimeout(function(){
            funzioni.printTesto("<br>");
            setTimeout(function(){
                funzioni.printTesto("<br>");
                setTimeout(function(){
                    funzioni.printTesto("<br>");
                    setTimeout(function(){
                        speedPari=-1;
                        attaccoincorso=false;
                        contaTurni++;
                        funzioni.printTesto("<br><br>");
                    }, funzioni.controlloCondizionePostAttacco(cpu, cpu.condizionePrimaria))
                }, funzioni.controlloCondizionePostAttacco(g1, g1.condizionePrimaria)); 
            }, controlloCondizionePreAttacco(cpu, attaccoAvversario, g1));
        },controlloCondizionePreAttacco(g1, attaccoG1, cpu));
    }
    else if (g1.velocita < cpu.velocita|| speedPari==1){
        setTimeout(function(){
            funzioni.printTesto("<br>");
            setTimeout(function(){
                funzioni.printTesto("<br>");
                setTimeout(function(){
                    funzioni.printTesto("<br>");
                    setTimeout(function(){
                        speedPari=-1;
                        attaccoincorso=false;
                        contaTurni++;
                        funzioni.printTesto("<br><br>");
                    }, funzioni.controlloCondizionePostAttacco(cpu, cpu.condizionePrimaria))
                }, funzioni.controlloCondizionePostAttacco(g1, g1.condizionePrimaria)); 
            },controlloCondizionePreAttacco(cpu,attaccoAvversario,g1)); 
        },controlloCondizionePreAttacco(g1, attaccoG1,cpu));
    }
    else if (g1.velocita==cpu.velocita && speedPari==-1){
        speedPari=Math.floor(Math.random()*2);
        ordineAttacco(attaccoG1);
    }
}


setInterval(function(){
    if (attaccoincorso){
        if (document.getElementById("campoMosse").style.display!="none"){
            document.getElementById("campoMosse").style.display="none";
        }
    }
    else {
        if (document.getElementById("campoMosse").style.display=="none"){
            document.getElementById("campoMosse").style.display="block";
        }        
    }
},10);

function controlloCondizionePreAttacco(attaccante, mossadafaresetuttovabene, difensore){
    if (attaccante.condizionePrimaria==="paralisi"){
        if (funzioni.controlloParalisi(attaccante)==0)
            return MOSSE[mossadafaresetuttovabene](attaccante, difensore);
        else 
            return 2000;
    }
    else 
        return MOSSE[mossadafaresetuttovabene](attaccante, difensore);
}
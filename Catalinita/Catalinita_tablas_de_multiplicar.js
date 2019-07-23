var TJBot = require('tjbot'); 
var config = require('./config'); 
var fs = require('fs');
 
// obtain our credentials from config.js 
var credentials = config.credentials; 

// these are the hardware capabilities that our TJ needs for this recipe 
var hardware = ['led', 'microphone', 'speaker', 'servo', 'camera']; 
 
// set up TJBot's configuration 
var tjConfig = { 
   log: { 
      level: 'silly' //'debug' o 'verbose' o 'silly' o 'info'
   },
   robot: {
      gender: 'female', 
      name: 'Catalinita'
   },
   listen: {
      language: 'es-ES' // see TJBot.prototype.languages.listen
   },
   speak: {
      voice: 'es-ES_LauraVoice',
      language: 'es-ES' // see TJBot.prototype.languages.speak
   }
}; 
 
// instantiate our TJBot! 
var tj = new TJBot(hardware, tjConfig, credentials); 

//textos varios
var entiendo="Prueba a pedirme que te diga algún numero o que yo te lo pregunte a ti. Dime 'pregúntame todas las tablas' o 'pregúntame la tabla del ocho' o 'dime la tabla del trece' o 'cuánto es nueve por siete'.";
var noentiendo="Lo siento mucho, no te he entendido. " + entiendo;
noentiendo="No entiendo.";
var texto="Hola. Me llamo " + tj.configuration.robot.name + " y soy muy lista, aunque entiendo el español un poco regulín. Me se todas las tablas de multiplicar desde la 0 a la 20. " + entiendo;

//variables para la construccion del array bidimensional de objetos con las multiplicaciones
var aTablas = ["cero","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve","diez","once","doce","trece","catorce","quince","dieciseis","diecisiete","dieciocho","diecinueve","veinte"];
var aDecena =["","diez","veinti","treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa"];
var aCentena=["","ciento","doscientos","trescientos","cuatrocientos"];
var d, nexo, producto, u, unidades, c, texto, i, j, numcompleto;
var aFactor=[];
var aoMultiplicaciones=[];
var oTablas = {};

//variables para el tratamiento de la respuesta
var containsPreguntame, containsDime, containsCuanto, itexto, jtexto, cont;
var aQueTabla = [];
var aPregunta=[0,0,0];
var dentro=false;

for (i=0; i<aTablas.length; i++){
   oTablas[aTablas[i].toLowerCase()] = i;
}

//se construye el array bidimensional de objetos con las respuestas correctas
for (i=0; i<aTablas.length; i++){
   aFactor=[];
   for(j=0; j<aTablas.length; j++){
      producto=i*j;
      c=Math.floor(producto/100);
      d=Math.floor(producto/10-c*10);
      u=producto-c*100-d*10;
      if (d==0 || u==0){nexo="";}else{nexo=" y ";}
      if (u==0 && (d!=0 || c!=0)){unidades="";}else{unidades=aTablas[u];}
      if ((d*10+u)<aTablas.length && (d*10+u)!=0) {
         numcompleto=aCentena[c]+" "+aTablas[d*10+u];
      } else if ((c*10+d*10+u) == 0) {
         numcompleto="cero";
      } else if ((d*10+u) == 0) {
         numcompleto=aCentena[c].replace("cientos", "kkchu").replace("ciento", "cien").replace("kkchu","cientos");
      } else {
         numcompleto=aCentena[c]+" "+aDecena[d]+nexo+unidades;
      }
      numcompleto=numcompleto.replace("veinti y ", "veinti");
      if (numcompleto[0]==" ") {numcompleto=numcompleto.substring(1,numcompleto.length);}
      aFactor.push({pregunta: aTablas[i]+" por "+aTablas[j], respuesta: numcompleto});
   }
   aoMultiplicaciones.push(aFactor);
}

i=0;
j=0;

console.log(texto);

function procesaMsg(msg) {
   console.log("He oido " + msg);
   tj.stopListening();
   textoSpeak="";

   if (msg.toLowerCase().indexOf("hola") >= 0) {
      if (fs.existsSync('salta_introduccion.txt')) {
         textoSpeak="Hola. Me llamo " + tj.configuration.robot.name;
      } else {
         textoSpeak=texto;
      }
   } else if (msg.toLowerCase().indexOf("adios") >= 0 || msg.toLowerCase().indexOf("adiós") >= 0) {
      textoSpeak="Adiós, ha sido un placer, hasta la próxima.";
   } else {
      tj.shine("yellow");
      tj.shine("on");
      tj.raiseArm();
   
      containsOtro=msg.toLowerCase().indexOf("otro") >= 0 || msg.toLowerCase().indexOf("otra") >= 0;
      if (containsOtro && aPregunta[2]!=0) {
         //quiere que se le haga otra pregunta con las mismas condiciones
         msg=aPregunta[2];
      }
      containsPreguntame = msg.toLowerCase().indexOf("pregun") >= 0 || msg.toLowerCase().indexOf("pregún") >= 0 || msg.toLowerCase().indexOf("junta") >= 0 || msg.toLowerCase().indexOf("yunta") >= 0; 
      containsDime = msg.toLowerCase().indexOf("dime") >= 0 || msg.toLowerCase().indexOf("dinos") >= 0; 
      containsCuanto = msg.toLowerCase().indexOf("cuan") >= 0 || msg.toLowerCase().indexOf("cuán") >= 0; 
      aQueTabla = msg.split(" ");
   
      if (containsPreguntame) {
         //console.log("Dentro de preguntame.");
         aPregunta=[0,0,0];
         if (msg.indexOf("toda") >= 0){
            //console.log("Dentro preguntame todas.");
            //se preguntan del 2 al 10 (nunca el 0 ni el 1)
            i=Math.floor(Math.random() * (9 - 2 + 1) ) + 2;
            j=Math.floor(Math.random() * (9 - 2 + 1) ) + 2;
            tj.shine("blue");
            textoSpeak="cuánto es " + aoMultiplicaciones[i][j].pregunta + ". Tic tac tic tac."; 
            tj.lowerArm();
            aPregunta=[i,j,msg];
         } else {
            //console.log("Dentro de preguntame una tabla concreta.")
            dentro=false;
            for (cont = 0; cont < aQueTabla.length; cont++) {
               if (aQueTabla[cont].toLowerCase().indexOf("de") >= 0) {
                  dentro=true;
                  break;
               }
            }
            if (dentro) {
               i=0;
               //se supone que en (cont-1) esta el valor de la posicion del numero de la tabla a preguntar
               itexto=aQueTabla[cont+1].toLowerCase();
               if (oTablas[itexto] != undefined) { 
                  i=oTablas[itexto]; 
                  j=Math.floor(Math.random() * (9 - 2 + 1) ) + 2;
                  tj.shine("blue");
                  textoSpeak="cuánto es " + aoMultiplicaciones[i][j].pregunta +". Tic tac tic tac."; 
                  tj.lowerArm();
                  aPregunta=[i,j,msg];
               } else {
                  textoSpeak=noentiendo;
               }
            } else {
               textoSpeak=noentiendo; 
            }
         }
      } else if (containsDime) {
         aPregunta=[0,0,0];
         dentro=false;
         for (cont = 0; cont < aQueTabla.length; cont++) {
            if (aQueTabla[cont].toLowerCase().indexOf("de") >= 0) {
               dentro=true;
               break;
            }
         }
         if (dentro) {
            i=0;
            //se supone que en (cont+1) esta el valor de la posicion del numero de la tabla a preguntar
            itexto=aQueTabla[cont+1].toLowerCase();
            if (oTablas[itexto] != undefined) { 
               i=oTablas[itexto];
               tj.shine("green");
               textoSpeak="Allá voy";
               //for (j=0; j<aTablas.length; j++) {
               for (j=0; j<11; j++) {
                  textoSpeak=textoSpeak + ", " + aoMultiplicaciones[i][j].pregunta + " " + aoMultiplicaciones[i][j].respuesta; 
               }
            } else {
               textoSpeak=noentiendo;
            }
         } else {
            textoSpeak=noentiendo; 
         }
      } else if (containsCuanto) {
         aPregunta=[0,0,0];
         dentro=false;
         for (cont = 0; cont < aQueTabla.length; cont++) { 
            if (aQueTabla[cont].toLowerCase().indexOf("por") >= 0) {
               dentro=true;
               break; 
            } 
         }
         if (dentro) {
            i=0;
            j=0;
            //se supone que en cont esta el valor de la posicion del por
            //se busca el i y la j del array de aoMultiplicaciones
            itexto=aQueTabla[cont-1].toLowerCase();
            jtexto=aQueTabla[cont+1].toLowerCase();
            if (oTablas[itexto] != undefined && oTablas[jtexto] != undefined) { 
               i=oTablas[itexto];
               j=oTablas[jtexto]; 
               tj.shine("green");
               if (i==6 && j==4) {
                  textoSpeak=aoMultiplicaciones[i][j].pregunta + ", la cara de tu retrato.";
               } else {
                  textoSpeak=aoMultiplicaciones[i][j].pregunta + " es " + aoMultiplicaciones[i][j].respuesta; 
               }
            } else {
               textoSpeak=noentiendo;
            }
         } else {
            textoSpeak=noentiendo;
         }
      } else if (aPregunta[2] != 0 && aPregunta[1]!=0) {
         //ha dado la respuesta a la pregunta realizada
         if (msg.toLowerCase().indexOf(aoMultiplicaciones[aPregunta[0]][aPregunta[1]].respuesta.toLowerCase()) >= 0) {
            //ha acertado
            textoSpeak="Cooooooooorrecto.";
            tj.shine("pink");
            tj.wave();
            tj.raiseArm();
         } else {
            //no ha acertado
            tj.shine("red");
            tj.lowerArm();
            textoSpeak="Oooooh, no has acertado. " + msg + " no es correcto. La respuesta correcta es "+ aoMultiplicaciones[aPregunta[0]][aPregunta[1]].respuesta + ". Perdona si mi español es un poquito regulín. Si quieres probar otra vez di 'otra vez'."; 
            console.log(textoSpeak);
            //textoSpeak="Oooooh, la respuesta correcta es "+ aoMultiplicaciones[aPregunta[0]][aPregunta[1]].respuesta
            textoSpeak="Oooooh, " + msg + " no es. Es "+ aoMultiplicaciones[aPregunta[0]][aPregunta[1]].respuesta
         }
         aPregunta[0]=0;
         aPregunta[1]=0;
      } else { 
         textoSpeak=noentiendo; 
      } 
   }

   console.log(textoSpeak);
   tj.speak(textoSpeak).then(function(){
      //si no hay una pregunta en vuelo el robot se relaja
      if (aPregunta[2] == 0) {
         tj.shine("off");
         tj.lowerArm();
      }
      console.log("FIN SPEAK");
      tj.listen(procesaMsg);
      console.log("");
      console.log("");
   });
}

tj.listen(procesaMsg);

    

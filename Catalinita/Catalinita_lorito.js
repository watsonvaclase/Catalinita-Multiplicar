var TJBot = require('tjbot'); 
var config = require('./config'); 
var fs = require('fs');
 
// obtain our credentials from config.js 
var credentials = config.credentials; 

// these are the hardware capabilities that our TJ needs for this recipe 
var hardware = ['led', 'microphone', 'speaker', 'servo']; 
 
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
var entiendo="Prueba a decirme algo, y yo te lo repito.";
var noentiendo="Lo siento mucho, no te he entendido. " + entiendo;
var texto="Hola. Me llamo " + tj.configuration.robot.name + " y soy muy lista y parlanchina. " + entiendo;

console.log(texto);

function procesaMsg(msg) {
   console.log("He oido " + msg);
   tj.stopListening();
   textoSpeak="";

   if (msg.toLowerCase().indexOf("hola") >= 0) {
      textoSpeak=texto;
   } else if (msg.toLowerCase().indexOf("adios") >= 0 || msg.toLowerCase().indexOf("adiós") >= 0) {
      textoSpeak="Adiós, ha sido un placer, hasta la próxima.";
   } else {
      tj.shine("yellow");
      tj.shine("on");
      tj.raiseArm();
      textoSpeak="Me has dicho: " + msg; 
   }

   console.log(textoSpeak);
   tj.speak(textoSpeak).then(function(){
      tj.shine("off");
      tj.lowerArm();
      console.log("FIN SPEAK");
      tj.listen(procesaMsg);
      console.log("");
      console.log("");
   });
}

tj.listen(procesaMsg);



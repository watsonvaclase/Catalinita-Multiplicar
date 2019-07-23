var TJBot = require('tjbot'); 
var config = require('./config'); 
 
var credentials = config.credentials; 

var hardware = ['speaker']; 
 
var tjConfig = { 
   log: { 
      level: 'silly'
   },
   speak: {
      voice: 'es-ES_LauraVoice',
      language: 'es-ES' 
   }
}; 
 
var tj = new TJBot(hardware, tjConfig, credentials); 

const args = process.argv;
var texto = process.argv[2];

tj.play('Noise.wav').then(function () {
   tj.speak(texto);
});
   

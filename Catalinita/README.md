# Catalinita
Te presento a Catalinita: una niña muy lista y muy guapa a la que le encanta jugar y ayudar.

![Catalinita](https://github.com/watsonvaclase/Propuestas/blob/master/Catalinita/Catalinita.png)
<br>

## Catalinita te ayuda a probar la capacidad de hablar de tu TJBot
Si dudas de la capacidad de hablar de tu TJBot, Catalinita te saca de dudas. Ella verbalizará el texto que tú quieras.

Para poner en marcha el programa _Catalinita\_hablame.js_ sólo tienes que hacer cinco cosas:
1) Descargar el audio ![Noise.wav](https://github.com/watsonvaclase/Propuestas/blob/master/Catalinita/Noise.wav) y el programa ![Catalinita_hablame.js](https://github.com/watsonvaclase/Propuestas/blob/master/Catalinita/Catalinita_hablame.js) a la raspberrypi.
2) Ubicar los dos ficheros descargados (_Noise.wav_ y _Catalinita\_hablame.js_) en el directorio donde esté el programa _conversation.js_ del TJBot.
3) Asegurar que en ese directorio haya un subdirectorio llamado _node\_modules_. En caso negativo, ejecutar: <br>
_npm install_
4) Asegurar que en el mismo directorio exista y esté bien completado el fichero de credenciales _config.js_ 
5) Ejecutar: <br>
_sudo node Catalinita\_hablame.js "xxx"_ <br>
siendo _xxx_ el texto que quieras que Catalinita verbalice. <br>

(Si no oyes nada, pero no te sale ningún error por pantalla, prueba a conectar un altavoz con mini-jack usando un adaptador para el puerto usb. <br>
Si el altavoz distorsiona, prueba la misma solución.)<br>

## Catalinita te ayuda a probar la capacidad de escuchar de tu TJBot
Si dudas de la capacidad de escuchar de tu TJBot, Catalinita te saca de dudas. Ella repetirá todo lo que tú le digas.

#### Poner en marcha el programa _Catalinita\_lorito.js_
Sólo tienes que hacer cinco cosas:
1) Descargar el programa ![Catalinita_lorito.js](https://github.com/watsonvaclase/Propuestas/blob/master/Catalinita/Catalinita_lorito.js) a la raspberrypi.
2) Ubicar el programa descargado (_Catalinita\_lorito.js_) en el directorio donde esté el programa _conversation.js_ del TJBot.
3) Asegurar que en ese directorio haya un subdirectorio llamado _node\_modules_. En caso negativo, ejecutar: <br>
_npm install_
4) Asegurar que en el mismo directorio exista y esté bien completado el fichero de credenciales _config.js_ 
5) Ejecutar: <br>
_sudo node Catalinita\_lorito.js_

#### Usar el programa _Catalinita\_lorito.js_
Puedes interactuar con Catalinita diciéndole:
1) _Hola_: te saludará.
2) _Adiós_: se despedirá.
3) O cualquier cosa: te repetirá lo que te haya entendido. <br>

(Si _Catalinita\_lorito.js_ te funciona perfectamente, pero el programa _conversation.js_ del TJBot no te responde nada, recuerda que cuando uses el _conversation.js_ debes empezar cada frase que digas con el nombre del TJBot que hayas definido. Si no le has puesto ningún nombre específicamente, por defecto su nombre es Watson.<br>
Asegúrate de que el TJBot entiende bien el nombre que has elegido.)<br>

## Catalinita y las tablas de multiplicar
Catalinita se sabe las tablas de multiplicar de la 0 a la 20. Te las puede decir ella a ti, o te las puede preguntar para que tú se las digas a ella, a ver si tú también te las sabes.

¡No dejes de ver el vídeo para conocerla en acción!

[![Catalinita](https://github.com/watsonvaclase/Propuestas/blob/master/Catalinita/Catalinita_video.png)](https://ibm.ent.box.com/file/464860317152)

#### Poner en marcha el programa _Catalinita\_tablas\_de\_multiplicar.js_
Si quieres que Catalinita te ayude a aprenderte las tablas de multiplicar, sólo tienes que hacer tres cosas:
1) Descargar el programa ![Catalinita_tablas_de_multiplicar.js](https://github.com/watsonvaclase/Propuestas/blob/master/Catalinita/Catalinita_tablas_de_multiplicar.js) a la raspberrypi.
2) Ubicar el fichero descargado (_Catalinita\_tablas\_de\_multiplicar.js_) en el directorio donde ya estés ejecutando satisfactoriamente el programa _conversation.js_ del TJBot o _Catalinita\_lorito.js_.
3) Ejecutar: <br>
_sudo node Catalinita\_tablas\_de\_multiplicar.js_

#### Usar el programa _Catalinita\_tablas\_de\_multiplicar.js_
Puedes interactuar con Catalinita haciéndole alguna de las siguientes preguntas:
1) _Dime la tabla del trece_. (En vez de trece, le puedes decir cualquier número del 0 al 20.) 
2) _¿Cuánto es nueve por siete?_ (En vez de nueve y siete, le puedes decir cualesquieras dos números entre el 0 y el 20.)
3) _¿Pregúntame todas las tablas?_ (Y te preguntará aleatoriamente la multiplicaciónun de dos números entre el 2 y el 10.)
4) _¿Pregúntame la tabla del ocho?_ (En vez de ocho, le puedes decir cualquier número del 0 al 20.)
5) _Otra vez_ (En caso de que le hayas pedido que te pregunte ella, para pedirle que te vuelva a preguntar con las mismas condiciones, puedes repetirle la pregunta o decirle simplemente _otra vez_.)

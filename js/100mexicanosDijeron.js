//puntos por equipo


var contadorGeneralxRonda = 0;
var contadorEquipo1 = 0;
var contadorEquipo2 = 0;
var respuestasPorPregunta = 0;

//turnos de los equipos
var turnoEquipo1 = false;
var turnoEquipo2 = false;
var strikes = 0;
var arr = [];
var equipoActual ="";
var numRespuesta =0;


//botones para responder

//busca todos los botones existentes
var buttons = document.querySelectorAll('button');

//por todos los botones que escucha, por cada uno de ellos, identificando el ID correspondiente a cada boton,
//va a llamar la funcion juego()
buttons.forEach(function (button){
	button.addEventListener('click', juego);	
});

function juego(event){
	//muestra en consola la propiedad del objeto boton: "tarjet", el id que identifica al boton
	var button = event.target;
	contadorGeneralxRonda = 0;
	console.log(button.id);						
	if(button.id == "turnoEquipo1"){
		alert('¡Turno Equipo 1!');
		turnoEquipo1 = true;
		document.getElementById("turnoEquipo1").disabled = true;
		document.getElementById("turnoEquipo2").disabled = true;
		mostrarPregunta();
	}
	if(button.id == "turnoEquipo2"){
		alert("¡Turno Equipo 2!");
		turnoEquipo2 = true;
		document.getElementById("turnoEquipo1").disabled = true;
		document.getElementById("turnoEquipo2").disabled = true;
		mostrarPregunta();
	}
}



//alert(pregunta[preguntaRandom].respuesta[res]);
function comprobarRespuesta(respuestaDelEquipo,preguntaRandom){
	//debugger;								
	if(pregunta[preguntaRandom].respuesta.hasOwnProperty(respuestaDelEquipo)){

		if(arr.indexOf(respuestaDelEquipo) == -1){
			arr.push(respuestaDelEquipo);
			console.log(arr);
			respuestasPorPregunta += 1;
			contadorGeneralxRonda += pregunta[preguntaRandom].respuesta[respuestaDelEquipo];
			console.log("Respuesta: " + respuestaDelEquipo + " : Puntos hasta ahora: " + contadorGeneralxRonda);
			
			let respuestaActual= 'respuesta'+numRespuesta;
			let respuestaActualValor= 'respuestaValor'+numRespuesta;

			var audio = new Audio('audio/respuestaCorrecta.wav');
			audio.play();

			console.log(respuestaActual);
			console.log(respuestaActualValor);
		
			setTimeout(function(){					
				document.getElementById(respuestaActual).innerHTML= respuestaDelEquipo;
  				document.getElementById(respuestaActualValor).innerHTML= pregunta[preguntaRandom].respuesta[respuestaDelEquipo];						
			}, 1000);			
	

  			
			numRespuesta+=1;												
			
			if(respuestasPorPregunta <5 ){				
				setTimeout(function(){					
					let respuestaDelEquipo = prompt("Otra respuesta:");
					comprobarRespuesta(respuestaDelEquipo,preguntaRandom);					
				}, 2000);
			}
			else{
				respuestasPorPregunta = 0;							
				if(equipoActual == "Equipo1" && turnoEquipo1)
					contadorEquipo1+=contadorGeneralxRonda;
				if(equipoActual == "Equipo2" && turnoEquipo2)
					contadorEquipo2+=contadorGeneralxRonda;

				setTimeout(function(){									
					var audio = new Audio('audio/Ganador.wav');
					audio.play();


					setTimeout(function(){					
						// let respuestaDelEquipo = prompt("Otra respuesta:");

						alert('Gana la ronda el ' + equipoActual);
						document.getElementById('pregunta').innerHTML = 'Gana la ronda el ' + equipoActual;


						if(turnoEquipo1){
							document.getElementById('totalEquipo1').innerHTML = contadorEquipo1;
						}
						else{
							document.getElementById('totalEquipo2').innerHTML = contadorEquipo2;
						}
						

						console.log(contadorEquipo1);
						console.log(contadorEquipo2);
						console.log();
						equipoActual = "";
						turnoEquipo1 = false;
						turnoEquipo2 = false;
						strikes = 0;							
						respuestasPorPregunta = 0;

						//turnos de los equipos
						turnoEquipo1 = false;
						turnoEquipo2 = false;
						strikes = 0;
						//arr = [];
						equipoActual ="";
						
						numRespuesta =0;

						for (var i = 0; i < 5; i++) {
							// let respuestaActual= 'respuesta'+numRespuesta;
							// let respuestaActualValor= 'respuestaValor'+numRespuesta;
							document.getElementById('respuesta'+i).innerHTML= "-";
  							document.getElementById('respuestaValor'+i).innerHTML= "-";
						}


						document.getElementById("turnoEquipo1").disabled = false;
						document.getElementById("turnoEquipo2").disabled = false;
						juego();
						// comprobarRespuesta(respuestaDelEquipo,preguntaRandom);					
					}, 2000);
				}, 2000);
			}												
		}
		else{			
			alert("¡Esa ya está!");							
			setTimeout(function(){					
				let respuestaDelEquipo = prompt("Intenta otra:");
				comprobarRespuesta(respuestaDelEquipo,preguntaRandom);					
			}, 2000);
		}
	}
	else{
		strikes+=1;
		if(strikes < 3){
			var audio = new Audio('audio/respuestaIncorrecta.wav');
			audio.play();     		     		
     		document.getElementById('hola').setAttribute('style', 'background-image: url(\'images/tacha'+strikes+'.jpg\'); background-size:cover;')
	
			setTimeout(function(){				
				document.getElementById('hola').setAttribute('style', 'background-image: url(\'images/bg-04.jpg\'); background-size:cover;')
			}, 1000);					     		
			

			setTimeout(function(){				
				alert('¡Incorrecto!' + strikes);
				let respuestaDelEquipo = prompt("Intenta otra:");
				comprobarRespuesta(respuestaDelEquipo,preguntaRandom);
			}, 2000);		
		}
		else{
			document.getElementById('hola').setAttribute('style', 'background-image: url(\'images/tacha'+strikes+'.jpg\'); background-size:cover;')			
			var audio = new Audio('audio/respuestaIncorrecta.wav');
			audio.play();

			setTimeout(function(){				
				document.getElementById('hola').setAttribute('style', 'background-image: url(\'images/bg-04.jpg\'); background-size:cover;')
			}, 1000);					     		

			setTimeout(function(){					
				alert('¡Pierdes ' + equipoActual + "!");
				roboDePuntos(preguntaRandom);
			}, 2000);			
		}					
	} 		
}

function mostrarPregunta()
{				


	var preguntaRandom = Math.floor(Math.random()*100/2)				
	console.log(preguntaRandom);
debugger;
	document.getElementById('pregunta').innerHTML =pregunta[preguntaRandom].pregunta;
					
	setTimeout(function(){
		if(turnoEquipo1)
			equipoActual = "Equipo1";
		else
			equipoActual = "Equipo2";
		let respuestaDelEquipo = prompt("Ingresa tu respuesta "+ equipoActual);		
		comprobarRespuesta(respuestaDelEquipo,preguntaRandom);									

		}, 2500);				
}

function roboDePuntos(preguntaRandom)
{
	strikes = 0;
	if(turnoEquipo1){
		turnoEquipo1 = false;
		turnoEquipo2 = true;
		equipoActual = "Equipo2";
	}
	else{
		turnoEquipo1 = true;
		turnoEquipo2 = false;
		equipoActual = "Equipo1";
	}	
	let respuestaDelEquipo = prompt(equipoActual + ", ¿Listos para el robo de puntos?, ¡ingresa tu respuesta!:");		
	console.log(respuestaDelEquipo);
	comprobarRespuesta(respuestaDelEquipo,preguntaRandom);
}

var pregunta =
[
  {pregunta:"Si fueras caminando y tu suegra se cayera, ¿qué harías?", respuesta:{"levantarla":52,"ayudar":27,"me rio":12,"dejarla":8,"corro":1}},
  {pregunta:"Menciona algo que es complicado hacer en la nieve", respuesta:{"caminar":33,"correr":24,"manejar":23,"esquiar":11, "fogata":9}},
  {pregunta:"Menciona un oficio que puede ser perfecto para un amante de los animales",respuesta:{"veterinario":58,"zoologico":21,"cuidador":13,"entrenador":5,"domador":3}},
  {pregunta:"Razón por la que te podrías pasar una luz roja",respuesta:{"emergencia":33,"distraccion":30,"hablar por telefono":18,"descuido":10,"mensajeando":9}},
  {pregunta:"Si tuviera la crisis de los 40, ¿qué le compraría a un hombre?",respuesta:{"carro":43,"motocicleta":20,"ropa":18,"licor":12,"vitaminas":7}},
  {pregunta:"¿Qué tipo de música utilizas mientras limpias tu casa?",respuesta:{"salsa":31,"regional":22,"romanticas":21,"ranchera":18,"bachata":8}},
  {pregunta:"Cuando nadas en el mar, ¿De qué debes tener cuidado?",respuesta:{"tiburon":67,"ahogarse":16,"olas":12,"agua":3,"profundo":2}},
  {pregunta:"¿Cuál fue el primer alimento que aprendiste a cocinar?",respuesta:{"huevos":33,"frijoles":31,"arroz":19,"sopa":9,"carne":8}},
  {pregunta:"Además de la iglesia, lugar común para casarse",respuesta:{"playa":36,"ante juez":21,"registro civil":17,"casa":15,"corte":11}},
  {pregunta:"Planeta que es muy común ver en las oficinas de hollywood",respuesta:{"marte":58,"tierra":19,"luna":15,"jupiter":5,"sol":3}},
  {pregunta:"Fruta que compras en varias piezas",respuesta:{"uva":35,"platano":19,"manzana":15,"naranja":18,"fresa":13}},

  {pregunta:"Menciona algo que cargas con mucho cuidado",respuesta:{"bebe":38,"bolso":37,"niños":12,"cartera":10,"dinero":3}},
  {pregunta:"¿Qué necesitan las plantas/flores para crecer?",respuesta:{"agua":82,"sol":11,"abono":4,"fertilizante":2,"tierra":1}},
  {pregunta:"¿Además del shampoo, ¿qué mas te pones en el cabello?",respuesta:{"acondicionador":67,"gel":10,"spray":9,"enjuage":8,"aceite":6}},
  {pregunta:"Menciona algo que si deja de funcionar en casa te pone de mal humor",respuesta:{"internet":41,"television":38,"estufa":13,"luz":5,"radio":3}},
  {pregunta:"Menciona un lugar para el que tienes que hacer una reservación",respuesta:{"restaurante":50,"hotel":38,"viaje":7,"aeropuerto":5,"doctor":1}},
  {pregunta:"Lugar en el que hay varios espejos",respuesta:{"baño":38,"tienda":22,"peluqueria":19,"probador":12,"casa":9}},
  {pregunta:"Algo que utilizas para cubrir tus orejas",respuesta:{"gorro":55,"audifonos":23,"gorra":15,"orejeras":4,"tampones":3}},
  {pregunta:"Menciona algo que te puede provocar alergia",respuesta:{"polvo":29,"polen":27,"animales":17,"plantas":15,"medicina":12}},
  {pregunta:"Cuando sales de viaje, ¿qué es lo peor que podrías olvidar",respuesta:{"dinero":50,"pasaporte":27,"ropa":11,"cepillo dental":8,"cartera":4}},
  {pregunta:"Si la cenicienta fuera al psicólogo, ¿de qué hablaría con él?",respuesta:{"problemas":31,"principe":22,"madrastra":21,"traumas":18,"hada madrina":8}},

  {pregunta:"Si existiera la universidad de la buena suegra, ¿qué le enseñarías a la tuya?",respuesta:{"no ser entrometida":66,"respetar":21,"modales":8,"cocinar":3,"guardar silencio":2}},
  {pregunta:"Si pudieras regresar en el tiempo, ¿En qué década te gustaría vivir?",respuesta:{"ochentas":37,"setentas":31,"sesentas":24,"cincuentas":7,"noventas":1}},
  {pregunta:"Si te perdieras por días en un desierto, ¿qué te gustaría encontrarte?",respuesta:{"agua":66,"comida":20,"gente":6,"ayuda":5,"lagos":3}},
  {pregunta:"Comida que sirven en una fiesta infantil",respuesta:{"pizza":36,"pastel":26,"hot dog":24,"hamburguesas":10,"sandwich":4}},
  {pregunta:"Otra forma de decir casa",respuesta:{"hogar":80,"canton":9,"vivienda":5,"choza":4,"apartamento":2}},
  {pregunta:"Si tuvieras la barriga de santa claus, ¿qué te costaría trabajo hacer?",respuesta:{"agachar":49,"correr":21,"ejercicio":18,"abrochar zapatos":7,"caminar":5}},
  {pregunta:"Completa la frase: Mi esposo cree que es el rey de...",respuesta:{"casa":54,"mundo":32,"roma":7,"selva":5,"universo":2}},
  {pregunta:"Si se te acaba el papel de baño, ¿qué haces?",respuesta:{"comprar mas":41,"agarrar otro":22,"grito por otro":19,"bañarse":10,"servilletas":8}},
  {pregunta:"Si una bruja se descuida mientras vuela, ¿contra qué podría chocar?",respuesta:{"arbol":40,"pared":19,"poste":16,"avion":14,"edificio":11}},
  {pregunta:"Si tuvieras algun super poder, ¿a quién se lo confesarías?",respuesta:{"pareja":35,"papas":23,"hijos":21,"nadie":12,"amiga":9}},


  {pregunta:"Si la silla donde te sientas todo el día se pudiera quejar, ¿qué te diría?",respuesta:{"levantate":31,"baja de peso":22,"como pesas":21,"hueles mal":18,"no te muevas":8}},
  {pregunta:"Si un maniquí pudiera hablar, ¿qué diría sobre su trabajo?",respuesta:{"aburrido":39,"cansado":23,"excelente":15,"facil":13,"flojo":10}},
  {pregunta:"Si tu suegra fuera una vivora, ¿cuál sería?",respuesta:{"cascabel":37,"cobra":28,"ananconda":23,"coralillo":8,"serpiente":4}},  
  {pregunta:"Además de cocinar, ¿qué otra cosa podrías hacer en la cocina?",respuesta:{"limpiar":36,"lavar trastes":33,"platicar":17,"comer":12,"cafe":2}},
  {pregunta:"Transporte que te daría mucho miedo si fallara",respuesta:{"avion":33,"carro":31,"tren":20,"barco":11,"helicoportero":5}},
  {pregunta:"Algo que no debes hacer cuando te detiene un policía de tránsito",respuesta:{"correr":34,"huir":26,"bajarse":16,"alegar":15,"mentir":9}},  
  {pregunta:"¿En qué lugar usas chanclas?",respuesta:{"playa":59,"casa":16,"baño":14,"pies":8,"regadera":3}},
  {pregunta:"Si tu suegra fuera una bruja, ¿qué le regalarías para su cumpleaños?",respuesta:{"escoba":36,"disfraz":31,"agua bendita":17,"flores":14,"manzana":2}},  
  {pregunta:"Si en una cita amorosa olvidas el nombre del galán, ¿cómo le dirías?",respuesta:{"mi amor":63,"cariño":17,"tu":13,"bebe":4,"corazon":3}},
  {pregunta:"Algo que usan los hospitales para transportar los pacientes",respuesta:{"ambulancia":60,"camilla":28,"silla de ruedas":9,"helicoportero":2,"cargandolo":1}},

  {pregunta:"Forma de demostrar que quieres a alguien",respuesta:{"besos":30,"abrazos":28,"regalo":19,"flores":16,"cariño":7}},
  {pregunta:"¿A qué te gustaría perderle el miedo?",respuesta:{"alturas":52,"vibora":23,"soledad":12,"muerte":8,"ratones":5}},
  {pregunta:"Otra forma de decir: SI",respuesta:{"claro":35,"yes":25,"ok":18,"simon":14,"aja":8}},
  {pregunta:"Menciona un deporter que no podrían practicar los abuelitos",respuesta:{"futbol":60,"baloncesto":14,"correr":11,"beisbol":10,"boxeo":5}},
  {pregunta:"Otra forma de decir: NO",respuesta:{"negativo":35,"nel":31,"nop":19,"ño":9,"nunca":6}},
  {pregunta:"¿Cuánto tiempo puedes pasar sin cambiarte la ropa interior?",respuesta:{"un dia":82,"dos dias":8,"tres dias":7,"cuatro dias":10,"doce horas":1}},
  {pregunta:"En un restaurante ¿que haces mientras esperas que te den una mesa?",respuesta:{"platicar":41,"usar celular":17,"platicar":12,"esperar":10,"tomar bebidas":8}},
  {pregunta:"Si fueras un príncipe, ¿A qué princesa de cuentos seguirías en twitter?",respuesta:{"cenicienta":73,"blancanieves":13,"ariel":9,"bella":3,"diana":2}},
  {pregunta:"Antes de salir a una cita, ¿qué le pides a tus papas?",respuesta:{"permiso":53,"dinero":28,"bendicion":14,"carro":3,"cuidarse":2}},
  {pregunta:"Regalo que te sorprendería en tu noche de bodas",respuesta:{"carro":27,"viaje":23,"joyas":20,"casa":18,"dinero":12}},

  {pregunta:"Animal protagónico de las caricaturas",respuesta:{"conejo":33,"perro":29,"gato":17,"raton":15,"pato":6}},
  {pregunta:"Si pudieras hablar con un animal de la selva, ¿cuál sería?",respuesta:{"leon":64,"chango":13,"tigre":12,"jirafa":6,"elefante":5}},
]

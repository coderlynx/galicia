var juego = {
    intentosActuales: 3,
    intentosMaximos: 3,
    jugando: false,
    init: function(tipoDeJuego) {
        if (!juego.jugando) {
            juego.jugando = true;
            managerPreguntas.init();
			if(tipoDeJuego == 1) {
				managerCategorias.init();
				managerCategorias.mostrarCategorias(tipoDeJuego,'vofPregunta.html?categoria=');
			} 
			if(tipoDeJuego == 2) {
				managerCategorias.init();
				managerCategorias.mostrarCategorias(tipoDeJuego,'sabiasQue.html?categoria=');
			} else {
				categoria.init();
				
				managerRespuestas.init();
				managerPuntaje.init();
				
				$("#trivia").show();
				
				$("#categoria").change(function() {
					var idCategoria = $(this).val();
					managerPreguntas.mostrarPreguntas(idCategoria);
				});
			
				$("#btnReinicio").click(function() {
				   juego.reiniciarJuego(); 
				});
			}
            
        }   
    },
    reiniciarJuego: function() {
        document.getElementById("trivia").reset();
        managerPuntaje.restablecerPuntaje();
        $("#preguntas").empty();
    },
	getUrlParameter: function(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }
}
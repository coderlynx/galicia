var juego = {
    intentosActuales: 3,
    intentosMaximos: 3,
    jugando: false,
    init: function(tipoDeJuego) {
        if (!juego.jugando) {
            juego.jugando = true;

            managerPuntaje.init();
            managerCategorias.init();
            managerPreguntas.init();
            managerRespuestas.init();
            
			if(tipoDeJuego == 1) {
//				managerCategorias.init();
				managerCategorias.mostrarCategorias(tipoDeJuego,'vofPregunta.html?categoria=');
			} 
			else if(tipoDeJuego == 2) {
//				managerCategorias.init();
				managerCategorias.mostrarCategorias(tipoDeJuego,'sabiasQue.html?categoria=');
			}
            else if(tipoDeJuego == 3) {
                managerCategorias.dibujarCajasCategorias();
                managerPreguntas.dibujarCajasPreguntas();
			}
        }   
    },
    reiniciarJuego: function() {
        managerPuntaje.restablecerPuntaje();
    },
	getUrlParameter: function(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1));
        var sURLVariables = sPageURL.split('&'),
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
var managerPuntaje = {
    puntajeInicial: 0,
    puntajeActual: 0,
    puntajeExito: 1000,
	etapa: 1,
    self: function() {
        return this;
    },
    init: function() {
        var div = $(".puntos-trivia");
        div.text("Puntos: " + managerPuntaje['puntajeInicial']);
    },
    calcularPuntaje: function(puntaje) {
        managerPuntaje['puntajeActual'] += parseInt(puntaje);
        $(".puntos-trivia").text("Puntos: " + managerPuntaje['puntajeActual']);
        managerPuntaje.verificarExito();
    },
    verificarExito: function() {
		etapa = Number(localStorage.etapa); 
		if (etapa > 3) {
        //if (managerPuntaje['puntajeActual'] >= managerPuntaje['puntajeExito']) {
            var trivia = $(".trivia");
            trivia.empty();
            trivia.load("triviaFinal.html", function() {
                $(".suma").html("<strong>" + managerPuntaje['puntajeActual'] +
                                "</strong>");
            });
            //juego.reiniciarJuego();
        }
    },
    restablecerPuntaje: function() {
        managerPuntaje['puntajeActual'] = managerPuntaje['puntajeInicial'];
        $(".puntos-trivia").text("Puntos: " + managerPuntaje['puntajeActual']);
    }
}
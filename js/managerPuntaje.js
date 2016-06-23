var managerPuntaje = {
    puntajeInicial: 0,
    puntajeActual: 0,
    puntajeExito: 1000,
    self: function() {
        return this;
    },
    init: function() {
        var div = $("#score"), h3 = $("<h3>");
        h3.text("PUNTAJE: " + managerPuntaje['puntajeInicial']);
        div.append(h3);
    },
    calcularPuntaje: function(puntaje) {
        managerPuntaje['puntajeActual'] += puntaje;
        $("#score h3").text("PUNTAJE: " + managerPuntaje['puntajeActual']);
        managerPuntaje.verificarExito();
    },
    verificarExito: function() {
        if (managerPuntaje['puntajeActual'] >= managerPuntaje['puntajeExito']) {
            alert("Has ganado el juego!!!");
            juego.reiniciarJuego();
        }
    },
    restablecerPuntaje: function() {
        managerPuntaje['puntajeActual'] = managerPuntaje['puntajeInicial'];
        $("#score h3").text("PUNTAJE: " + managerPuntaje['puntajeActual']);
    }
}
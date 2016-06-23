var juego = {
    intentosActuales: 3,
    intentosMaximos: 3,
    jugando: false,
    init: function() {
        if (!juego.jugando) {
            juego.jugando = true;
            
            categoria.init();
            managerPreguntas.init();
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
    },
    reiniciarJuego: function() {
        document.getElementById("trivia").reset();
        managerPuntaje.restablecerPuntaje();
        $("#preguntas").empty();
    }
}
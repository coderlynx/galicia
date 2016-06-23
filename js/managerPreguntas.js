var preguntas = [];
var managerPreguntas = {
    self: function() {
        return this;
    },
    init: function() {
        // Reemplazar por archivo .php
        $.getJSON(
            "json/preguntas.json",
            function(data) { 
                $.each(data, function(key, value) {
                    preguntas.push(value);
                });
            }
        );
    },
    mostrarPreguntas: function(idCategoria) {
        var section = $("#preguntas");
        var article = {}, h3 = {}, input = [];
        section.empty();
        $.each(preguntas, function(key, value) {
            if (idCategoria == value['idCategoria']) {
                article = $("<article>");
                article.attr('id', value['id']);
                article.addClass("pregunta");
                article.on('click', {self: this, totalRespuestas: 3}, 
                           managerPreguntas.self().seleccionarPregunta);
                h3 = $("<h3>");
                h3.text(value['id'] + " - " + value['texoPregunta'] +
                        "\t(" + value['puntaje'] + " puntos)");
                article.append(h3);
                section.append(article);
            } 
        });
    },
    seleccionarPregunta: function(event) {
        // El contexto de la función es el article donde se bindea el evento 'click'
        // Por eso para pasar el contenedor de la pregunta utilizo 'this'
        // Utilizo el método 'self' para enviar una referencia del propio objeto
        managerRespuestas.mostrarRespuestas(this, event.data);
    }
}
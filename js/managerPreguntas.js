var preguntas = [];
var managerPreguntas = {
    self: function() {
        return this;
    },
    init: function() {
        // Reemplazar por archivo .php
		$.ajax({
		  url: "json/preguntas.json",
		  dataType: 'json',
		  async: false,
		  success: function(data) {
			$.each(data, function(key, value) {
                    preguntas.push(value);
                });
		  }
		});
        /*$.getJSON(
            "json/preguntas.json",
            function(data) { 
                $.each(data, function(key, value) {
                    preguntas.push(value);
                });
            }
        );*/
    },
    mostrarPreguntas: function(idCategoria,tipoDeJuego) {
        var section = $("#preguntas");
        var article = {}, h3 = {}, input = [];
        section.empty();
		//para el sabias que
		var ul_sabias_que = $(".ul_sabias_que");
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
	mostrarPreguntasDeUnaCategoria: function(categoria, tipoDeJuego) {
		var consigna = $('.consigna');
		var preguntasDeUnaCategoria = [];
		var etapa = Number(localStorage.etapa) - 1; 
		$.each(preguntas, function(key, value) {
			if(categoria == value['idCategoria'] && tipoDeJuego == value['tipoDeJuego']) {
				preguntasDeUnaCategoria.push(value);
			} 
        });
		consigna.html(preguntasDeUnaCategoria[etapa]['texoPregunta']);	
	},
    seleccionarPregunta: function(event) {
        // El contexto de la función es el article donde se bindea el evento 'click'
        // Por eso para pasar el contenedor de la pregunta utilizo 'this'
        // Utilizo el método 'self' para enviar una referencia del propio objeto
        managerRespuestas.mostrarRespuestas(this, event.data);
    }
}
var preguntas = [];
var preguntasYaRespondidas = [];

var managerPreguntas = {
    self: function() {
        return this;
    },
    init: function() {
        
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
    },
    dibujarCajasPreguntas: function() {
        var listaPreguntas = $(".preguntas");  
        var totalCajas = 5;
        var li = {}, a = {};
        var url = 
        
        $.each(listaPreguntas, function(key, value) {

            for (var i = 1; i <= totalCajas; i++) {
                
                i = (i < 10) ? ("0" + i) : i;
                
                li = $("<li>");
                li.attr('data-preg', i);
                a = $("<a>");
//                a.attr('href', "?categoria=" + 
//                       $(value).parent().data("cat") + 
//                       "&pregunta=" + li.data("preg"));
                a.attr('href', "#");
                a.text(i * 100);
                li.append(a);
                $(value).append(li);
            }
        
        });
		
		//borro las preguntas respondidas
		preguntasYaRespondidas = JSON.parse(sessionStorage.getItem("preguntasYaRespondidas"));
		$.each(preguntasYaRespondidas, function(key, value) {
			$("div").find("[data-cat='" + value.categoria + "']").find("[data-preg='" + value.pregunta + "']").remove();
        });
    },
    mostrarPregunta: function(idCategoria, idPregunta, tipoDeJuego) {
        var pregunta = {
			categoria: idCategoria,
			pregunta: idPregunta
		};
		
		//guardo las preguntas seleccionada
		preguntasYaRespondidas = JSON.parse(sessionStorage.getItem("preguntasYaRespondidas"));
		preguntasYaRespondidas.push(pregunta);

		sessionStorage.setItem("preguntasYaRespondidas", JSON.stringify(preguntasYaRespondidas));
		
        $.each(preguntas, function(key, value) {
            if (value['idCategoria'] == idCategoria && 
                value['id'] == idPregunta && value['tipoDeJuego'] == tipoDeJuego) {
                $(".consigna-trivia").text(value['textoPregunta']);
                sessionStorage.setItem("textoPregunta", value['textoPregunta']);
                sessionStorage.setItem("puntajePregunta", value['puntaje']);
                
                // Falta incorporar la imagen de cada pregunta
                
                var rta = $(".opciones-trivia");
                var a = {};
                
                $.each(respuestas, function(key, value) {
                    if (value['idPregunta'] == idPregunta && value['tipoDeJuego'] == tipoDeJuego) {
                        a = $("<a>");
//                        a.attr('href', 'triviaRespuesta.html?categoria=' + 
//                               idCategoria + '&pregunta=' + idPregunta + 
//                               '&respuesta=' + value['id']);
                        a.attr({'href': '#', 'data-rta': value['id']});
                        a.text(value['textoRespuesta']);
                        rta.append(a);
                        
                        if (value['esCorrecta'] == 1) {
                            sessionStorage.setItem("textoRespuestaCorrecta", "(" + 
                                                   value['textoRespuesta'] + ")");
                        }
                    } 
                });
            } 
        });
        
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
		var rta = $('#rta');
		var idPregunta = $('#pregunta');
		var preguntasDeUnaCategoria = [];
		var etapa = Number(localStorage.etapa) - 1; 
		$.each(preguntas, function(key, value) {
			if(categoria == value['idCategoria'] && tipoDeJuego == value['tipoDeJuego']) {
				preguntasDeUnaCategoria.push(value);
			} 
        });
		consigna.html(preguntasDeUnaCategoria[etapa]['textoPregunta']);
		rta.val(preguntasDeUnaCategoria[etapa]['respuesta']);
		idPregunta.val(preguntasDeUnaCategoria[etapa]['id']);
	},
    seleccionarPregunta: function(event) {
        // El contexto de la función es el article donde se bindea el evento 'click'
        // Por eso para pasar el contenedor de la pregunta utilizo 'this'
        // Utilizo el método 'self' para enviar una referencia del propio objeto
        managerRespuestas.mostrarRespuestas(this, event.data);
    }
}
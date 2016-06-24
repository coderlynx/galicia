var respuestas = [];
var managerRespuestas = {
    self: function() {
        return this;
    },
    init: function(preguntas, contenedor) {
        // Reemplazar por archivo .php
        $.getJSON(
            "json/respuestas.json",
            function(data) {
                $.each(data, function(key, value) {
                    respuestas.push(value);
                    respuestas[key]['respuestaSeleccionada'] = false;
                });
            }
        )
    },
    mostrarRespuestas: function(contenedor, pregunta) {
        if(!$(contenedor).hasClass('desplegado')) {
            var idPregunta = pregunta.self.id;
            var contadorRespuestas = 0;
            var div = $("<div>"), div_rta = {}, 
                    input = {}, label = {};
            
            $.each(respuestas, function(key, value) {
                if (idPregunta == value['idPregunta']) {
                    div_rta = $("<div>");
                    div_rta.one('click', this, 
                                 managerRespuestas.self().verificarRespuesta);

                    input = $("<input type='radio'>");
                    input.val(value['id']);
                    input.attr({id: value['idPregunta'] + "_" + value['id'], 
                                name: value['idPregunta']});
                    div_rta.append(input);

                    label = $("<label>");
                    label.attr('for', value['idPregunta'] + "_" + value['id'])
                    label.text(value['textoRespuesta']);
                    div_rta.append(label);

                    div.append(div_rta);
                    
                    contadorRespuestas++;
                }   
                if (contadorRespuestas == pregunta.totalRespuestas) {
                    $(contenedor).append(div);
                    $(contenedor).unbind();
                    $(contenedor).addClass('desplegado');
                    return false;
                }
            });
        }
    },
    verificarRespuesta: function(event) {
        var _this = this;
        var resultados = [];
        
        $(this).parent().addClass("disabledbutton");

        $.each(respuestas, function(key, value) {
            if (event.data.idPregunta == value['idPregunta']) {
                if (event.data.id == value['id']) {
                    respuestas[key].respuestaSeleccionada = true;
                }
                resultados.push(value);
            }
        });
        managerRespuestas.mostrarResultados(resultados, _this);  
    },
    mostrarResultados: function(resultados, contenedor) {
        var span = {};
        $(contenedor).parent().find("div").each(function(index, value) {
            span = $("<span>");
            span.css('margin-left', '15px');
            
            if (!resultados[index]['esCorrecta']) {
                span.text("Incorrecto");
            } else {
                span.text("Correcto!");
            }
            $(value).append(span);
            
            if (resultados[index]['respuestaSeleccionada'] && 
                resultados[index]['esCorrecta'])
                managerRespuestas.bindearPuntaje(resultados[index]['idPregunta']);
        });
    },
    bindearPuntaje: function(idPregunta) {
        $.each(preguntas, function(key, value) {
            if (idPregunta == value['id']) {
                managerPuntaje.calcularPuntaje(value['puntaje']);
                return false;
            }
        });
    },
	mostrarRespuestaCorrecta: function(pregunta, tipoDeJuego) {
		$.each(respuestas, function(key, value) {
            if (pregunta == value['idPregunta'] && tipoDeJuego == value['tipoDeJuego'] ) {
					$('#explicacion').html(respuestas[key].textoRespuesta);
					return;     
            }
        });
	},
	verificarRespuestaVoF: function(pregunta, tipoDeJuego,rtaSeleccionada) {
		$.each(respuestas, function(key, value) {
            if (pregunta == value['idPregunta'] && tipoDeJuego == value['tipoDeJuego'] ) {
					if (value['esCorrecta'] == rtaSeleccionada){
						audio = new Audio('correcto.mp3');
						audio.play();
					} else {
						audio = new Audio('error.mp3');
						audio.play();
					}
					return;     
            }
        });
	}
}
var respuestas = [];
var puntaje;
var managerRespuestas = {
    self: function() {
        return this;
    },
    init: function(preguntas, contenedor) {
        // Reemplazar por archivo .php
		$.ajax({
		  url: "json/respuestas.json",
		  dataType: 'json',
		  async: false,
		  success: function(data) {
			$.each(data, function(key, value) {
                    respuestas.push(value);
                    respuestas[key]['respuestaSeleccionada'] = false;
                });
		  }
		});
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
					
					return;     
            }
        });
	},
	verificarRespuestaVoF: function(pregunta, tipoDeJuego,rtaSeleccionada) {
		$.each(respuestas, function(key, value) {
            if (pregunta == value['idPregunta'] && tipoDeJuego == value['tipoDeJuego'] ) {
				//si lo elegido por el usuario es correcto
				if (value['esCorrecta'] == rtaSeleccionada){
					audio = new Audio('sonidos/correcto.mp3');
					audio.play();
					localStorage.setItem("puntajePuntual", 100);
					puntaje = Number(localStorage.puntajeAcumulado) + 100; 
					localStorage.setItem("puntajeAcumulado", puntaje);
				} else {
					audio = new Audio('sonidos/error.mp3');
					audio.play();
					localStorage.setItem("puntajePuntual", 0);
				}
				//segun si el valor de la rta es V o F dibujo ese texto en la pantalla (independientemente de lo elegido por el usuario)
				if(value['esCorrecta'] == 0){
					$('#valor').html('Falso');
				} else {
					$('#valor').html('Verdadero');
				}
				
				$('.explicacion').html(respuestas[key].textoRespuesta);
				return;     
            }
        });
	}
}
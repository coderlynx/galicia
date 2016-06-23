var categorias = [];
var managerCategorias = {
    self: function() {
        return this;
    },
    init: function() {
        // Reemplazar por archivo .php
		$.ajax({
		  url: "json/categorias.json",
		  dataType: 'json',
		  async: false,
		  success: function(data) {
			$.each(data, function(key, value) {
                    categorias.push(value);
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
	mostrarCategorias: function(tipoDeJuego,url) {
		//para el sabias que
		var ul_sabias_que = $(".categorias");
        $.each(categorias, function(key, value) {
			if (tipoDeJuego == value['tipoDeJuego']) {
				var li = $("<li>");
				var a = $("<a>");
				a.attr('href',url + value['idCategoria']);
				a.html(value['idCategoria']);
				li.append(a);
				ul_sabias_que.append(li);
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
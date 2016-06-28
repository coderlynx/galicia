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
    },
    dibujarCajasCategorias: function() {
        var trivia = $(".trivia");
        var totalCategorias = 4;
        var div = {}, h2 = {}, ul = {};
        
        for (var i = 1; i <= totalCategorias; i++) {
            
            div = $("<div>");
            div.addClass("cat-" + i);
            i = (i < 10) ? ("0" + i) : i;
            div.attr('data-cat', i);
            h2 = $("<h2>");
            h2.text("Categoría " + i);
            ul = $("<ul>");
            ul.addClass("preguntas");
            
            div.append(h2);
            div.append(ul);
            trivia.append(div);
        }
    },
	mostrarCategorias: function(tipoDeJuego, url) {
        var ul_sabias_que = $(".categorias");
        $.each(categorias, function(key, value) {
            if (tipoDeJuego == value['tipoDeJuego']) {
                var li = $("<li>");
                var a = $("<a>");
                a.attr('href',url + value['idCategoria']);
                a.html(value['tipoCategoria']);
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
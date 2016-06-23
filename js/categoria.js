var categoria = {
    init: function() {
        // Reemplazar por archivo .php
        $.getJSON(
            "json/categorias.json",
            function(data) {
                var select = $("#categoria");
                var option = {};
                $.each(data, function(key, value) {
                    option = $("<option>");
                    option.val(value['idCategoria']);
                    option.html(value['tipoCategoria']);
                    select.append(option);
                });
            });
    }
}
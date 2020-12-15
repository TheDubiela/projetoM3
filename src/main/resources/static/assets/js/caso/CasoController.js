var CasoController = new function() {

    this.list = function() {
        $('#casosTableBody').empty();

        $.get( "/casos", function( data ) {
            $.each(data, function(i, item) {
                $('<tr>').append(
                    $('<td>').text(item.idCaso),
                    $('<td>').text(item.nome),
                    $('<td>').text(item.cpf),
                    $('<td>').text(item.email),
                    $('<td class="actions"><a class="btn btn-warning btn-xs" onclick="CasoController.listEndereco('+item.idCaso+')">Endereço</a>'),//add modal for full list
                    $('<td class="actions"><a class="btn btn-warning btn-xs" onclick="CasoController.listDivida('+item.idCaso+')">Divida</a>'),//add modal for full list
                    $('<td>').text(item.situacao),
                    $('<td>').text(item.numeroNaJustica),
                    $('<td>').text(item.user.name),
                    $('<td class="actions"><a class="btn btn-warning btn-xs" onclick="CasoController.edit('+item.idCaso+')">Editar</a><a class="btn btn-danger btn-xs" onclick="CasoController.delete('+item.idCaso+')">Excluir</a></td>')
                ).appendTo('#casosTableBody');
            });
        });
    }

    this.listEndereco = function (id){
        $('#listaDeEndereco').modal('show');
        CasoController.limparEnderecoModal();
        $.get( "/casos", function( data ) {
            $.each(data, function(i, item) {
                if(item.idCaso == id){
                    $('#enderecoCep').val(item.cep),
                        $('#enderecoNumero').val(item.numeroDaCasa),
                        $('#enderecoComplemento').val(item.complemento)
                }
            });
        });
    }

    this.limparEnderecoModal = function (){
        $('#enderecoCep').val(''),
            $('#enderecoNumero').val(''),
            $('#enderecoComplemento').val('')
    }

    this.listDivida = function (id){
        $('#listaDeDivida').modal('show');
        CasoController.limparDividaModal();
        $.get( "/casos", function( data ) {
            $.each(data, function(i, item) {
                if(item.idCaso == id){
                    $('#dividaValor').val(item.valorDaDivida),
                        $('#dividaObjetivo').val(item.objetoDaDivida)
                }
            });
        });
    }

    this.limparDividaModal = function (){
        $('#dividaValor').val(''),
            $('#dividaObjetivo').val('')
    }

    this.delete = function(idCaso) {
        if($('#userId').val() != "" && $('#userId').val() != null) {
            $.ajax({
                url: '/casos/' + idCaso,
                method: 'DELETE',
                contentType: 'application/json',
                success: function (result) {
                    CasoController.list();
                },
                error: function (request, msg, error) {
                    alert('erro ao deletar');
                }
            });
        }
    }

    this.save = function() {
        var idCasoToEdit = $("#casoId").val();

        if (idCasoToEdit == null || idCasoToEdit == "") {
            var caso = this.getDadosCasoModal();
            if(CasoController.validateCaso(caso)) {
                $.ajax({
                    url: '/casos',
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(caso),
                    success: function () {
                        $("#casoId").val("");
                        $('#cadastrarCasoModal').modal('hide');
                        CasoController.list();
                        CasoController.limparDadosCasoModal();
                    },
                    error: function (request, msg, error) {
                        $("#casoId").val("");
                        $('#cadastrarCasoModal').modal('hide');
                        CasoController.list();
                        CasoController.limparDadosCasoModal();
                    }
                });
            }else{
                alert("Dados incompletos ou com erros");
                CasoController.limparDadosCasoModal();
            }
        }
        else {
            CasoController.update(idCasoToEdit);
        }

    }

    this.update = function(idCaso) {
        var caso = this.getDadosCasoModal();
        if($('#userId').val() != "" && $('#userId').val() != null) {
            if (CasoController.validateCaso(caso)) {
                $.ajax({
                    url: '/casoss/' + idCaso,
                    method: 'PUT',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(caso),
                    success: function (result) {
                        $("#casoId").val("");
                        $('#cadastrarCasoModal').modal('hide');
                        CasoController.list();
                        CasoController.limparDadosCasoModal();
                    },
                    error: function (request, msg, error) {
                        $("#casoId").val("");
                        $('#cadastrarCasoModal').modal('hide');
                        CasoController.list();
                        CasoController.limparDadosCasoModal();
                    }
                });
            } else {
                alert("Dados incompletos ou com erros");
            }
        }
    }

    this.edit = function(idCaso) {
        $("#casoId").val(idCaso);
        if($('#userId').val() != "" && $('#userId').val() != null) {
            $.get("/casos/" + idCaso, function (data) {
                $('#cadastrarCasoModal').modal('show');
                CasoController.setDadosCasoModal(data);
            });
        }
    }

    this.validateCaso = function (caso){
        if(caso.nome == null || caso.nome == ""){
            return false;
        }
        if(caso.cpf == null || caso.cpf == "" || CasoController.isCpf(caso.cpf) == false){
            return false;
        }
        if(caso.email == null || caso.email =="" || CasoController.isEmail(caso.email) == false){
            return false;
        }
        if(caso.valorDaDivida == null || caso.valorDaDivida == "" || CasoController.isValue(caso.valorDaDivida) == false){
            return false;
        }
        if(caso.objetoDaDivida == null || caso.objetoDaDivida == ""){
            return false;
        }
        if(caso.situacao == null || caso.situacao ==""){
            return false;
        }
        return true;
    }


    this.setDadosCasoModal = function(caso) {
        $('#casoNome').val(caso.nome),
            $('#casoCpf').val(caso.cpf),
            $('#casoEmail').val(caso.email),
            $('#casoCep').val(caso.cep),
            $('#casoNumero').val(caso.numeroDaCasa),
            $('#casoComplemento').val(caso.complemento),
            $('#casoValor').val(caso.valorDaDivida),
            $('#casoObjetivo').val(caso.objetoDaDivida),
            $('#casoSituacao').val(caso.situacao),
            $('#casoNumeroNaJustica').val(caso.numeroNaJustica)
    }

    this.limparDadosCasoModal = function() {
        $('#casoNome').val(''),
            $('#casoCpf').val(''),
            $('#casoEmail').val(''),
            $('#casoCep').val(''),
            $('#casoNumero').val(''),
            $('#casoComplemento').val(''),
            $('#casoValor').val(''),
            $('#casoObjetivo').val(''),
            $('#casoSituacao').val(''),
            $('#casoNumeroNaJustica').val('')
    }

    this.getDadosCasoModal = function() {
        var caso = {
            nome: $('#casoNome').val(),
            cpf: $('#casoCpf').val(),
            email: $('#casoEmail').val(),
            cep : $('#casoCep').val(),
            numeroDaCasa : $('#casoNumero').val(),
            complemento : $('#casoComplemento').val(),
            valorDaDivida : $('#casoValor').val(),
            objetoDaDivida : $('#casoObjetivo').val(),
            situacao : $('#casoSituacao').val(),
            numeroNaJustica : $('#casoNumeroNaJustica').val(),
            user : {
                idUser : $('#userId').val()
            }
        }

        return caso;
    }

    this.isEmail = function (email){
        var regex = /([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})/;
        return regex.test(email);
    }

    this.isCpf = function (cpf){
        var regex = /\d{3}\.\d{3}\.\d{3}\-\d{2}/;
        return regex.test(cpf);
    }

    this.isValue = function (valor){
        var regex = /\d\d*\,\d{2}/;
        return regex.test(valor);
    }

}
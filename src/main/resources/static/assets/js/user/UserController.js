var UserController = new function() {

    this.logged = function (){
        var loggedUser = $('#userId').val();
        if(loggedUser == "" || loggedUser == null){
            $('#logarUsuario').show(),
                $('#cadastarUsuario').show(),
                $('#cadastroCaso').hide(),
                $('#logOut').hide()
        }else{
            $('#logarUsuario').hide(),
                $('#cadastarUsuario').hide(),
                $('#cadastroCaso').show(),
                $('#logOut').show()
        }
    }

    this.login = function (){
        var found = false;
        if($('#userEmail').val() != "" && $('#userEmail').val() != null && $('#userSenha').val() != "" && $('#userSenha').val() != null) {
            $.get("/users", function (data) {
                $.each(data, function (i, item) {
                    if (found == false) {
                        if (item.email == $('#userEmail').val()) {
                            if (found == false) {
                                if (item.pass == $('#userSenha').val()) {
                                    $('#userId').val(item.idUser);
                                    $('#cadastrarUsuarioModal').modal('hide');
                                    UserController.limparDadosUserModal();
                                    UserController.logged();
                                    found = true;
                                }
                            }
                        }
                    }
                });
            });
        }else{
            alert("Dados incompletos ou com erros");
            UserController.limparDadosUserModal();
        }
    }

    this.logout = function (){
        $('#userId').val('');
        UserController.logged();
    }

    this.dynamicModal = function (){
        $('#logarUsuario').click(function(){
            $('#userNome').hide(),
                $('#label').hide(),
                $('#modalRegister').hide(),
                $('#modalLogin').show()
        })
        $('#cadastarUsuario').click(function(){
            $('#userNome').show(),
                $('#label').show(),
                $('#modalLogin').hide(),
                $('#modalRegister').show()
        })
    }

    this.delete = function(idUser) {
        $.ajax({
            url: '/users/'+idUser,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(result) {
            },
            error: function(request,msg,error) {
                alert('erro ao deletar');
            }
        });
    }

    this.save = function() {
        var idUserToEdit = $("#userId").val();
        if (idUserToEdit == null || idUserToEdit == "") {
            var user = this.getDadosUserModal();
            if(UserController.validateUser(user)) {
                $.ajax({
                    url: '/users',
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(user),
                    success: function () {
                        $("#userId").val("");
                        $('#cadastrarUsuarioModal').modal('hide');
                        UserController.limparDadosUserModal();
                    },
                    error: function (request, msg, error) {
                        $("#userId").val("");
                        $('#cadastrarUsuarioModal').modal('hide');
                        UserController.limparDadosUserModal();
                    }
                });
            }else{
                alert("Dados incompletos ou com erros");
                UserController.limparDadosUserModal();
            }
        }
        else {
            UserController.update(idUserToEdit);
        }

    }

    this.update = function(idUser) {
        var user = this.getDadosUserModal();

        $.ajax({
            url: '/users/'+idUser,
            method: 'PUT',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(user),
            success: function(result) {
                $("#userId").val("");
                $('#cadastrarUsuarioModal').modal('hide');
                UserController.limparDadosUserModal();
            },
            error: function(request,msg,error) {
                $("#userId").val("");
                $('#cadastrarUsuarioModal').modal('hide');
                UserController.limparDadosUserModal();
            }
        });
    }

    this.edit = function(idUser) {
        $("#userId").val(idUser);

        $.get( "/users/" + idUser, function( data ) {
            $('#cadastrarUsuarioModal').modal('show');
            UserController.setDadosUserModal(data);
        });
    }

    this.validateUser = function (user){
        if(user.name == null || user.name == ""){
            return false;
        }
        if(user.pass == null || user.pass == ""){
            return false;
        }
        if(user.email == null || user.email =="" || UserController.isEmail(user.email) == false){
            return false;
        }
        return true;
    }

    this.setDadosUserModal = function(user) {
        $('#userNome').val(user.nome),
            $('#userEmail').val(user.email),
            $('#userSenha').val(user.pass)
    }

    this.limparDadosUserModal = function() {
        $('#userNome').val(''),
            $('#userEmail').val(''),
            $('#userSenha').val('')
    }

    this.getDadosUserModal = function() {
        var user = {
            name: $('#userNome').val(),
            email: $('#userEmail').val(),
            pass : $('#userSenha').val()
        }

        return user;
    }

    this.isEmail = function (email){
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

}
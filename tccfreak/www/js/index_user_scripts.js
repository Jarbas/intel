var db = new WebSqlDB(sucesso, erro);

function sucesso() {
    console.log("sucesso DV");
}

function erro(error) {
    console.log("Erro de DB: " + error);
}

var padAssinatura;

/*jshint browser:true */
/*global $ */
(function () {
    "use strict";
    /*
      hook up event handlers 
    */
    function register_event_handlers() {

        /* button  #btnalunos */
        

        /* button  #btnvoltaraluno */
        $(document).on("click", "#btnvoltaraluno", function (evt) {
            /*global activate_subpage */
            activate_subpage("#page_55_16");
            return false;
        });

        /* button  #btnsalvaraluno */
        $(document).on("click", "#btnsalvaraluno", function (evt) {
            db.insertAluno(JSON.stringify({
                "nomalu": $("#txtnomealuno").val(),
                "nomcur": $("#txtnomecurso").val(),
                "fotalu": $("#imgaluno").attr('src')
            }), function (status) {
                if (status == true) {
                    // capturando os dados do aluno da tela        
                    navigator.notification.alert(
                        "Aluno cadastrado com sucesso!"
                    );
                }
            });

            return false;
        });

        /* button  #btntrabalhos */
        $(document).on("click", "#btntrabalhos", function (evt) {
            // listar dados dos trabalhos
            db.findTrabalhoAll(function (trabalhos) {
                // limpando a lista
                $("#lsttrabalhos").html("");
                for (var i = 0; i < trabalhos.length; i++) {
                    // adicionando os itens na lista
                    $("#lsttrabalhos").prepend(
                        '<ion-item id="' + trabalhos[i].codtra + '" class="item widget uib_w_6 item-button-right" data-uib="ionic/list_item" data-ver="0"> ' +
                        '<div class="buttons"> ' +
                        ' <button id="' + trabalhos[i].codtra + '" class="button button-positive" onclick="editTrabalho(this.id)"><i class="icon icon ion-edit"></i>                    </button> ' +
                        ' <button id="' + trabalhos[i].codtra + '" name = "' + i + '" class="button button-assertive" onclick="deleteTrabalho(this.id)"><i class="icon icon ion-trash-b"></i> ' +
                        ' </button>' +
                        ' </div>' +
                        trabalhos[i].codtra + ' - ' + trabalhos[i].nomtra + ' - ' + trabalhos[i].nomcur + '</ion-item>'
                    );
                }
            });

            /*global activate_subpage */
            activate_subpage("#sbltrabalhos");
            return false;
        });

        /* button  #btnassinatura */
       /* $(document).on("click", "#btnassinatura", function (evt) {
            var canvas = document.getElementById("canvasAssinatura");
            padAssinatura = new SignaturePad(canvas);
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight - ((window.innerHeight * 25) / 100);

            activate_subpage("#sbassinatura");
            return false;
        });*/

        /* button  #btnmenu */
        $(document).on("click", "#btnmenu", function (evt) {
            /*global uib_sb */
            /* Other possible functions are: 
              uib_sb.open_sidebar($sb)
              uib_sb.close_sidebar($sb)
              uib_sb.toggle_sidebar($sb)
               uib_sb.close_all_sidebars()
             See js/sidebar.js for the full sidebar API */

            uib_sb.toggle_sidebar($("#sbmenu"));
            return false;
        });

        $(document).on("click", "#imgaluno", function (evt) {
            navigator.camera.getPicture(
                onSuccessFoto,
                onErrorFoto, {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL
                }
            );
        });

        /* button  #btnsair */
    $(document).on("click", "#btnsair", function(evt)
    {
        
         navigator.notification.confirm('deseja sair?', function(buttonIndex){
             
             if (buttonIndex==1) {
                 
                 navigator.app.exit();
                 
             }
                 
              
         }, 'Sair', 
        'sim,nao')
        /* your code goes here */ 
         return false;
    });
    
        /* button  #butnSincronizar */
    $(document).on("click", "#butnSincronizar", function(evt)
    {
        /* your code goes here */ 
        
        navigator.notification.vibrate(2500);
        
         return false;
    });
    
        /* button  #btnbipsonoro */
    $(document).on("click", "#btnbipsonoro", function(evt)
    {
        /* your code goes here */ 
        navigator.notification.beep(10);
         return false;
    });
    
        /* button  #btnVibrar */
    $(document).on("click", "#btnVibrar", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#sbalunos"); 
         return false;
    });
    
        /* a */
    $(document).on("click", "undefined", function(evt)
    {
        /* your code goes here */ 
         return false;
    });
    
        /* button  #btnalunos */
    $(document).on("click", "#btnalunos", function(evt)
    {
        
        navigator.camera.getPicture()
        
         return false;
    });
    
        /* button  #btnalunos */
    $(document).on("click", "#btnalunos", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#sbalunos"); 
         return false;
    });
    
        /* button  #btnsalvaraluno */
    $(document).on("click", "#btnsalvaraluno", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#sbalunos"); 
         return false;
    });
    
    }
    document.addEventListener("app.Ready", register_event_handlers, false);
})();


function editTrabalho(codtra) {
    alert("Editar: " + codtra);
}

function deleteTrabalho(codtra) {
    db.deleteTrabalho(JSON.stringify({
        "codtra": codtra
    }), function (status) {
        if (status == true) {
            // removendo elementos
            var item = document.getElementById(codtra);
            item.parentNode.removeChild(item);
        }
    });
}

function saveAssinatura() {
    //$("#img").html(padAssinatura.toDataURL());
    activate_subpage("#page_55_16");
    return false;
}

function clearAssinatura() {
    padAssinatura.clear();
}

function onErrorFoto(erroFoto) {
    alert("Erro na captura da foto!" + erroFoto);
}

function onSuccessFoto(foto) {
    // exibindo a foto
    $("#imgaluno").attr("src",
        "data:image/jpeg;base64," +
        foto);
}

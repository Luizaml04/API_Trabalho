function ler(){
    divStatus = document.getElementById("status");
    divStatus.innerHTML = "carregando...";
    tabela = document.getElementById("tabela_emocoes");

    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            obj = JSON.parse( this.responseText );
            obj.forEach( dado => {
                if( document.getElementById("p" + prod.id ) == null ){
                    index = tabela.rows.length
                    row = tabela.insertRow(-1);
                    row.id = "p" + prod.id;
                    cellID = row.insertCell(0);
                    cellNOME = row.insertCell(1);
                    cellPRECO = row.insertCell(2);
                    cellEXCLUIR = row.insertCell(3);
                    cellID.innerHTML = dado.idDia;
                    cellNOME.innerHTML = dado.emocao;
                    cellPRECO.innerHTML = dado.nivel;
                    cellEXCLUIR.innerHTML = 
                    "<button onclick='excluir(" + prod.id +")' >EXCLUIR</button>";
                }
            });
            divStatus.innerHTML = "";
        }

        if( this.readyState == 4 && this.status != 200){
            divStatus.innerHTML = this.responseText;
        }

    };


    xhttp.open("GET" , "http://localhost:8001/", true);
    xhttp.send();

}
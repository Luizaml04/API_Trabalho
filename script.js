function ler() {
  divStatus = document.getElementById("status");
  divStatus.innerHTML = "carregando...";
  var tabela = document.getElementById("myTable");
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        var obj = JSON.parse(this.responseText);
        obj.forEach(function (dado) {
          if (document.getElementById("p" + dado.idDia) === null) {
            var index = tabela.rows.length;
            var row = tabela.insertRow(-1);
            row.id = "p" + dado.idDia;
            var cellID = row.insertCell(0);
            var cellEMOCAO = row.insertCell(1);
            var cellNIVEL = row.insertCell(2);
            var cellEXCLUIR = row.insertCell(3);
            cellID.innerHTML = dado.idDia;
            cellEMOCAO.innerHTML = dado.emocao;
            cellNIVEL.innerHTML = dado.nivel;
            cellEXCLUIR.innerHTML =
              "<button onclick='excluir(" + dado.idDia + ")'>EXCLUIR</button>";
          }
        });
        divStatus.innerHTML = "";
      } else {
        divStatus.innerHTML = this.responseText;
      }
    }
  };

  xhttp.open("GET", "http://localhost:8001/emocoes", true);
  xhttp.send();
}

function add() {
  var xhttp = new XMLHttpRequest();
  var selectEmocao = document.getElementsByName("selecaoEmocao")[0];
  var emocaoSelecionada = selectEmocao.value;
  var nivel = document.getElementById("nivel").value;

  console.log("Emoção selecionada:", emocaoSelecionada);
  console.log("Nível da emoção:", nivel);

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Aqui você pode fazer algo com a resposta da API, se necessário
      console.log("Emoção adicionada com sucesso!");
    }
  };

  xhttp.open("POST", "http://localhost:8001/inserirEmocao", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  var params = "Emoção=" + encodeURIComponent(emocaoSelecionada) + "&Nivel=" + encodeURIComponent(nivel);
  xhttp.send(params);
}




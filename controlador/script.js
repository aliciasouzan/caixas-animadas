function criarCaixa() {
  var numLinhas = parseInt(document.getElementById("numLinhas").value);
  var numColunas = parseInt(document.getElementById("numColunas").value);
  var raiz = document.querySelector(".raiz");
  raiz.innerHTML = "";

  var matriz = [];
  for (let linha = 0; linha < numLinhas; linha++) {
    matriz.push([]);
    for (
      let coluna = 0;
      coluna < (linha == 0 || linha == numLinhas - 1 ? numColunas : 2);
      coluna++
    ) {
      matriz[linha].push(0);
    }
  }

  var count = 1;
  for (let linha = 0; linha < numLinhas; linha++) {
    var linhaElemento = document.createElement("div");
    var isLinhaExtrema = linha == 0 || linha == numLinhas - 1;
    var numColunasDasLinhasIntermediarias = numColunas > 1 ? 2 : 1;

    linhaElemento.className = isLinhaExtrema
      ? "linha linhasExtremas"
      : "linha linhasIntermediarias";

    // Criar quadrados
    for (
      let coluna = 0;
      coluna <
      (isLinhaExtrema ? numColunas : numColunasDasLinhasIntermediarias);
      coluna++
    ) {
      var caixa = document.createElement("div");
      caixa.className = "caixa";
      caixa.style.backgroundColor = criarCor();

      if (linha == 0) {
        caixa.textContent = count++;
      } else if (linha == numLinhas - 1) {
        caixa.textContent = count + numColunas - coluna - 1;
      } else {
        if (coluna == 0 && numColunas > 1) {
          let numeroTotalDeCaixas = 2 * numColunas + 2 * numLinhas - 4;
          caixa.textContent = numeroTotalDeCaixas - linha + 1;
        } else {
          caixa.textContent = count++;
        }
      }

      linhaElemento.appendChild(caixa);
    }

    raiz.appendChild(linhaElemento);
  }
}

function criarCor() {
  var letras = "0123456789ABCDEF";
  var cor = "#";
  for (var i = 0; i < 6; i++) {
    cor += letras[Math.floor(Math.random() * 16)];
  }
  return cor;
}

var intervaloAnimacao;
var ordemInvertida = false;

function iniciarAnimacao() {
  var intervalo = document.getElementById("intervalo");
  clearInterval(intervaloAnimacao);
  intervaloAnimacao = setInterval(animarCaixas, intervalo.value);
}

function animarCaixas() {
  var caixas = Array.from(document.querySelectorAll(".caixa"));
  var caixasOrdenadas = caixas.sort(
    (a, b) => parseInt(a.textContent) - parseInt(b.textContent)
  );
  var selectCaixas = document.getElementById("sentido");

  if (selectCaixas.value === "1") ordemInvertida = false;
  else ordemInvertida = true;

  if (ordemInvertida) {
    var primeiraCaixa = caixasOrdenadas[0];
    var primeiroNumero = primeiraCaixa.textContent;
    var primeiraCor = primeiraCaixa.style.backgroundColor;

    for (var i = 0; i < caixasOrdenadas.length - 1; i++) {
      caixasOrdenadas[i].textContent = caixasOrdenadas[i + 1].textContent;
      caixasOrdenadas[i].style.backgroundColor =
        caixasOrdenadas[i + 1].style.backgroundColor;
    }

    caixasOrdenadas[caixasOrdenadas.length - 1].textContent = primeiroNumero;
    caixasOrdenadas[caixasOrdenadas.length - 1].style.backgroundColor =
      primeiraCor;
  } else {
    var ultimaCaixa = caixasOrdenadas[caixasOrdenadas.length - 1];
    var ultimoNumero = ultimaCaixa.textContent;
    var ultimaCor = ultimaCaixa.style.backgroundColor;

    for (var i = caixasOrdenadas.length - 1; i > 0; i--) {
      caixasOrdenadas[i].textContent = caixasOrdenadas[i - 1].textContent;
      caixasOrdenadas[i].style.backgroundColor =
        caixasOrdenadas[i - 1].style.backgroundColor;
    }

    caixasOrdenadas[0].textContent = ultimoNumero;
    caixasOrdenadas[0].style.backgroundColor = ultimaCor;
  }
}

function aplicarConfiguracoes() {
  var numLinhas = parseInt(document.getElementById("numLinhas").value);
  var numColunas = parseInt(document.getElementById("numColunas").value);
  var sentido = parseInt(document.getElementById("sentido").value);
  var intervalo = parseInt(document.getElementById("intervalo").value);

  var dados = {
    linhas: numLinhas,
    colunas: numColunas,
    sentido: sentido,
    intervalo: intervalo,
  };

  fetch("http://localhost/backend/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        console.log("Dados enviados com sucesso:", data.message);
        location.reload();
      } else {
        console.error("Erro ao enviar dados:", data.message);
      }
    })
    .catch((error) => {
      console.error("Erro ao enviar dados:", error);
    });
}
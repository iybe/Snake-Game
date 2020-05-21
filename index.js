let canvas = document.getElementById("jogo");
let hpontos = document.getElementById("pontos");
let tela = canvas.getContext("2d");
let qtdColunas = 30;
let qtdLinhas = 15;
let direcao = 6;
let cobra = new fila();
let colidiu = false;
let alvo;
let pontos;

function atualizarCobra() {
  let cabeca = cobra.back();
  switch (direcao) {
    case 8:
      if(cobra.dados.some(c => c.x === cabeca.x && c.y === (cabeca.y-1))) colidiu = true;
      cobra.push({"x": cabeca.x, "y": cabeca.y-1});
      break;
    case 6:
      if(cobra.dados.some(c => c.x === cabeca.x+1 && c.y === (cabeca.y))) colidiu = true;
      cobra.push({"x": cabeca.x+1, "y": cabeca.y});
      break;
    case 2:
      if(cobra.dados.some(c => c.x === cabeca.x && c.y === (cabeca.y+1))) colidiu = true;
      cobra.push({"x": cabeca.x, "y": cabeca.y+1});
      break;
    default:
      if(cobra.dados.some(c => c.x === cabeca.x-1 && c.y === (cabeca.y))) colidiu = true;
      cobra.push({"x": cabeca.x-1, "y": cabeca.y});
      break;
  }

  cabeca = cobra.back();
  if(alvo !== undefined && cabeca.x === alvo.x && cabeca.y === alvo.y){
    pontos++;
    alvo = undefined;
  }else{
    cobra.pop();
  }
  
  if(cabeca.x >= qtdColunas || cabeca.x < 0 || cabeca.y >= qtdLinhas || cabeca.y < 0){
    colidiu = true;
  }

}

function imprimirAlvo() {
  if(alvo !== undefined){
    desenharQuadrado(alvo.x,alvo.y,10,10,"red");
  }else{
    while (true) {
      let coluna = Math.floor(Math.random()*100)%qtdColunas;
      let linha = Math.floor(Math.random()*100)%qtdLinhas;
      if(!cobra.dados.some(c => c.x === coluna && c.y === linha)){
        desenharQuadrado(coluna,linha,10,10,"red");
        alvo = {"x": coluna, "y": linha};
        break;
      }
    }
  }
}

function atualizarPontos() {
  hpontos.innerHTML = "Pontos: "+pontos;
}

function imprimirCobra() {
  cobra.dados.forEach( c => desenharQuadrado(c.x,c.y,10,10,"green"));
}

function fila() {
  this.dados = [];

  this.push = function (valor) {
    this.dados.push(valor);
  }

  this.pop = function() {
    this.dados = this.dados.slice(1);
  }

  this.front = function () {
    return this.dados[0];
  }

  this.back = function () {
    return this.dados[this.dados.length-1];
  }

}

function desenharQuadrado(x,y,lq,aq,color) {
  tela.fillStyle = color;
  let px = x*lq;
  let py = y*aq;
  tela.fillRect(px,py,lq,aq);
}

function setarTela() {
  tela.fillStyle = "black";
  tela.fillRect(0, 0, 300, 150);
}

function main() {

  cobra.push({"x": 0, "y": 0});
  cobra.push({"x": 1, "y": 0});
  imprimirCobra();

  window.onkeypress = function (event) {
    switch (event.keyCode) {
      case 119:
        if(direcao !== 2) direcao = 8;
        break;
      case 115:
        if(direcao !== 8) direcao = 2;
        break;
      case 97:
        if(direcao !== 6) direcao = 4;
        break;
      case 100:
        if(direcao !== 4) direcao = 6;
        break;
      default:
        break;
    }
  }

  pontos = 0;
  const temporizador = setInterval(() => {
    setarTela();
    atualizarCobra();
    if(colidiu){
      clearInterval(temporizador);
    }
    imprimirAlvo();
    imprimirCobra();
    atualizarPontos();
  }, 100);
  
}

main();
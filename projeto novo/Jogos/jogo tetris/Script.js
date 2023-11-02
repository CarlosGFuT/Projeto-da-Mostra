
//obter um número inteiro aleatório entre o intervalo de [min,max]//

function getRandomInt(min, max) {
    min = Math.ceil(min); //Arredonda para cima o valor mínimo
    max = Math.floor(max); //Arredonda para baixo o valor máximo
  
    return Math.floor(Math.random() * (max - min + 1)) + min; //Gera um número aleatório entre 0 e 1 (incluindo 0 mas excluindo 1). Multiplica esse número pelo intervalo (max - min + 1) para distribuí-lo dentro do intervalo [0, max - min + 1). 
  }
  
  // gerar uma nova sequência tetrominó
  function generateSequence() {
    const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']; //array chamada 'sequence'
  
    while (sequence.length) { //inicia um loop while (enquanto) que continua enquanto a array
      const rand = getRandomInt(0, sequence.length - 1); //Esta linha gera um número aleatório entre 0 e o comprimento atual da array sequence menos 1. Esse número aleatório será usado para selecionar um elemento aleatório da array sequence.
      const name = sequence.splice(rand, 1)[0]; //o número aleatório gerado é usado para remover um elemento da array sequence. O elemento removido é atribuído à variável name. O [0] no final é necessário porque splice retorna um array com os elementos removidos, e queremos apenas o primeiro elemento (o nome do tetrominó).

      tetrominoSequence.push(name); //mantém a sequência dos tetrominós.
    }
  }
  
  // obter o próximo tetromino na sequência
  function getNextTetromino() {
    if (tetrominoSequence.length === 0) {
      generateSequence();
    }
  
    const name = tetrominoSequence.pop();
    const matrix = tetrominos[name];
  
    // I e O começam centrados, todos os outros começam no meio-esquerdo
    const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);
  
    // começa na linha 21 (-1), todos os outros começam na linha 22 (-2)
    const row = name === 'I' ? -1 : -2;
  
    return {
      name: name,      // nome da peça (L, O, etc.)
      matrix: matrix,  // a matriz de rotação atual
      row: row,        // linha atual (começa fora da tela)
      col: col         // coluna atual
    };
  }
  
  // girar uma matriz NxN 90 graus
  function rotate(matrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) =>
      row.map((val, j) => matrix[N - j][i])
    );
  
    return result;
  }
  
  // verifique se a nova matriz/linha/coluna é válida
  function isValidMove(matrix, cellRow, cellCol) {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] && (
            // fora dos limites do jogofora dos limites do jogo
            cellCol + col < 0 ||
            cellCol + col >= playfield[0].length ||
            cellRow + row >= playfield.length ||
            // colide com outra peça
            playfield[cellRow + row][cellCol + col])
          ) {
          return false;
        }
      }
    }
  
    return true;
  }
  
  // coloque o tetromino no campo de jogo
  function placeTetromino() {
    for (let row = 0; row < tetromino.matrix.length; row++) {
      for (let col = 0; col < tetromino.matrix[row].length; col++) {
        if (tetromino.matrix[row][col]) {
  
          // fim do jogo se a peça tiver alguma parte fora da tela
          if (tetromino.row + row < 0) {
            return showGameOver();
          }
  
          playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
        }
      }
    }
  
    // verifique se há linhas limpas começando de baixo e subindo
    for (let row = playfield.length - 1; row >= 0; ) {
      if (playfield[row].every(cell => !!cell)) {
  
        // solte todas as linhas acima desta
        for (let r = row; r >= 0; r--) {
          for (let c = 0; c < playfield[r].length; c++) {
            playfield[r][c] = playfield[r-1][c];
          }
        }
      }
      else {
        row--;
      }
    }
  
    tetromino = getNextTetromino();
  }
  
  // mostrar a tela de game over
  function showGameOver() {
    cancelAnimationFrame(rAF); //ancela o próximo quadro de animação. rAF é uma variável que mantém controle sobre o quadro de animação.
    gameOver = true; //Define a variável gameOver como true, indicando que o jogo terminou.vvvvvvvv
  
    context.fillStyle = 'black'; //Define a cor de preenchimento do contexto do canvas como preto.
    context.globalAlpha = 0.75;// Define a transparência global do contexto como 0.75 (75% de opacidade).
    context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60); //esenha um retângulo preto semi-transparente na metade da altura do canvas, com largura igual à do canvas e altura de 60 pixels.
  
    context.globalAlpha = 1;//Restaura a transparência global para 1 (opacidade completa).
    context.fillStyle = 'white'; //Define a cor de preenchimento como branca.
    context.font = '36px monospace'; //Define a fonte para um estilo monoespaçado com tamanho de 36 pixels.
    context.textAlign = 'center'; //Define o alinhamento de texto como centralizado.
    context.textBaseline = 'middle'; //: Define a linha base do texto como o meio.
    context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2); // Desenha o texto "GAME OVER!" no centro do canvas.
  }
  
  const canvas = document.getElementById('game'); //Obtém o elemento HTML com o id 'game', que é o canvas onde o jogo será desenhado.
  const context = canvas.getContext('2d'); //Obtém o contexto 2D do canvas, que é onde desenhamos os elementos do jogo.
  const grid = 32; //Define o tamanho de cada célula da grade do jogo como 32 pixels. Isso é usado para posicionar e desenhar os tetrominós.
  const tetrominoSequence = []; //Cria uma array vazia chamada tetrominoSequence que será usada para armazenar a sequência de tetrominós a serem usados no jogo.
  
  // acompanhe o que está em cada célula do jogo usando uma matriz 2d
  // o campo de jogo do tetris é 10x20, com algumas linhas fora da tela
  const playfield = [];
  
  // preencher o estado vazio
  for (let row = -2; row < 20; row++) {
    playfield[row] = [];
  
    for (let col = 0; col < 10; col++) {
      playfield[row][col] = 0;
    }
  }
  
  // como desenhar cada tetraminó
  const tetrominos = {
    'I': [
      [0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]
    ],
    'J': [
      [1,0,0],
      [1,1,1],
      [0,0,0],
    ],
    'L': [
      [0,0,1],
      [1,1,1],
      [0,0,0],
    ],
    'O': [
      [1,1],
      [1,1],
    ],
    'S': [
      [0,1,1],
      [1,1,0],
      [0,0,0],
    ],
    'Z': [
      [1,1,0],
      [0,1,1],
      [0,0,0],
    ],
    'T': [
      [0,1,0],
      [1,1,1],
      [0,0,0],
    ]
  };
  
  // cor de cada tetraminó
  const colors = {
    'I': 'cyan',
    'O': 'yellow',
    'T': 'purple',
    'S': 'green',
    'Z': 'red',
    'J': 'blue',
    'L': 'orange'
  };
  
  let count = 0; //Inicializa uma variável chamada count com o valor zero.
  let tetromino = getNextTetromino(); //nicializa uma variável chamada tetromino com o resultado da chamada da função getNextTetromino(), que retorna o próximo tetrominó na sequência.
  let rAF = null;  // mantém o controle do quadro de animação para que possamos cancelá-lo
  let gameOver = false; //Inicializa uma variável chamada rAF com o valor nulo. Ela será usada para controlar o quadro de animação do jogo.
  
  // loop de jogo
  function loop() {
    rAF = requestAnimationFrame(loop);
    context.clearRect(0,0,canvas.width,canvas.height);
  
    // desenhar o campo de jogo
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 10; col++) {
        if (playfield[row][col]) {
          const name = playfield[row][col];
          context.fillStyle = colors[name];
  
          // desenhar 1 px menor que a grade cria um efeito de grade
          context.fillRect(col * grid, row * grid, grid-1, grid-1);
        }
      }
    }
  
    // desenhe o tetromino ativo
    if (tetromino) {
  
      // tetromino cai a cada 35 quadros
      if (++count > 35) {
        tetromino.row++;
        count = 0;
  
        // coloque a peça se ela esbarrar em alguma coisa
        if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
          tetromino.row--;
          placeTetromino();
        }
      }
  
      context.fillStyle = colors[tetromino.name];
  
      for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
          if (tetromino.matrix[row][col]) {
  
            // desenhar 1 px menor que a grade cria um efeito de grade
            context.fillRect((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid-1, grid-1);
          }
        }
      }
    }
  }
  
  // ouça os eventos do teclado para mover o tetromino ativo
  document.addEventListener('keydown', function(e) {
    if (gameOver) return;
  
    // teclas de seta esquerda e direita (mover)
    if (e.which === 37 || e.which === 39) {
      const col = e.which === 37
        ? tetromino.col - 1
        : tetromino.col + 1;
  
      if (isValidMove(tetromino.matrix, tetromino.row, col)) {
        tetromino.col = col;
      }
    }
  
    // Tecla de seta para cima (girar)
    if (e.which === 38) {
      const matrix = rotate(tetromino.matrix);
      if (isValidMove(matrix, tetromino.row, tetromino.col)) {
        tetromino.matrix = matrix;
      }
    }
  
    // tecla de seta para baixo (soltar)
    if(e.which === 40) {
      const row = tetromino.row + 1;
  
      if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
        tetromino.row = row - 1;
  
        placeTetromino();
        return;
      }
  
      tetromino.row = row;
    }
  });
  
  
  
  // comece o jogo
  rAF = requestAnimationFrame(loop);
  
  
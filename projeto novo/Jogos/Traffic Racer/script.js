
$(function() {

    var anim_id;

    // Salvando objetos do DOM em variáveis
    var container = $('#container'); //variavel container
    var car = $('#car'); //variavel carro
    var car_1 = $('#car_1'); //variavel carro1
    var car_2 = $('#car_2');//variavel carro2
    var car_3 = $('#car_3'); //variavel carro3
    var line_1 = $('#line_1'); //variavel linha 1
    var line_2 = $('#line_2'); //variavel linha 2
    var line_3 = $('#line_3');//variavel linha 2
    var restart_div = $('#restart_div');
    var restart_btn = $('#restart');
    var score = $('#score'); 

    // Salvando algumas configurações iniciais
    var container_left = parseInt(container.css('left')); //Obtém a posição horizontal (esquerda) do elemento referenciado por container e a converte em um número inteiro utilizando parseInt().
    var container_width = parseInt(container.width()); //Obtém a largura do elemento referenciado por container e a converte em um número inteiro utilizando parseInt().
    var container_height = parseInt(container.height());//Obtém a altura do elemento referenciado por container e a converte em um número inteiro utilizando parseInt().
    var car_width = parseInt(car.width());//Obtém a largura do elemento referenciado por car e a converte em um número inteiro utilizando parseInt().
    var car_height = parseInt(car.height());//Obtém a largura do elemento referenciado por car e a converte em um número inteiro utilizando parseInt().

    // Algumas outras declarações
    var game_over = false; //indica se o jogo acabou ou não.

    var score_counter = 1; //mantem a contagem do escore ou pontuação do jogador. Ela começa com o valor 1.

    var speed = 2; //representa a velocidade de alguma funcionalidade no jogo. Neste caso, é definida como 2.
    var line_speed = 5;//representa a velocidade de outra funcionalidade no jogo, possivelmente algo relacionado à movimentação de linhas.

    var move_right = false;//é uma variável que indica se o jogador está se movendo para a direita. 
    var move_left = false;//é uma variável que indica se o jogador está se movendo para a esquerda. 
    var move_up = false;//é uma variável que indica se o jogador está se movendo para cima. 
    var move_down = false;//é uma variável que indica se o jogador está se movendo para baixo. 

    /* ------------------------------CÓDIGO DO JOGO COMEÇA AQUI------------------------------------------- */

    /* Mover os carros */
    $(document).on('keydown', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(esquerda);
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(direita);
            } else if (key === 38 && move_up === false) {
                move_up = requestAnimationFrame(cima);
            } else if (key === 40 && move_down === false) {
                move_down = requestAnimationFrame(baixo);
            }
        }
    });

    $(document).on('keyup', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {
                cancelAnimationFrame(move_right);
                move_right = false;
            } else if (key === 38) {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 40) {
                cancelAnimationFrame(move_down);
                move_down = false;
            }
        }
    });
//Esta função controla o movimento para a esquerda.

//Verifica se o jogo não terminou (game_over === false).

//Confere se o valor da propriedade left do elemento car (provavelmente o carro) é maior que zero (parseInt(car.css('left')) > 0). Isso garante que o elemento não ultrapasse a borda esquerda do container.

//Se as condições acima forem atendidas, atualiza a propriedade left do elemento car subtraindo 5 pixels (car.css('left', parseInt(car.css('left')) - 5);).

//Em seguida, chama recursivamente requestAnimationFrame(esquerda);, o que faz com que a função seja chamada novamente para animar o movimento.
    function esquerda() {
        if (game_over === false && parseInt(car.css('left')) > 0) {
            car.css('left', parseInt(car.css('left')) - 5);
            move_left = requestAnimationFrame(esquerda);
        }
    }
    //Esta função controla o movimento para a direita.

    //Verifica se o jogo não terminou (game_over === false).
    
    //Confere se o valor da propriedade left do elemento car é menor que a largura do container menos a largura do carro (parseInt(car.css('left')) < container_width - car_width). Isso garante que o elemento não ultrapasse a borda direita do container.
    
    //Se as condições acima forem atendidas, atualiza a propriedade left do elemento car adicionando 5 pixels (car.css('left', parseInt(car.css('left')) + 5);).
    
    //Em seguida, chama recursivamente requestAnimationFrame(direita); para animar o movimento.
    function direita() {
        if (game_over === false && parseInt(car.css('left')) < container_width - car_width) {
            car.css('left', parseInt(car.css('left')) + 5);
            move_right = requestAnimationFrame(direita);
        }
    }
    //Esta função controla o movimento para cima.
    
    //Verifica se o jogo não terminou (game_over === false).
    
    //Confere se o valor da propriedade top do elemento car é maior que zero (parseInt(car.css('top')) > 0). Isso garante que o elemento não ultrapasse a borda superior do container.
    
    //Se as condições acima forem atendidas, atualiza a propriedade top do elemento car subtraindo 3 pixels (car.css('top', parseInt(car.css('top')) - 3);).
    
    //Em seguida, chama recursivamente requestAnimationFrame(cima); para animar o movimento.
    function cima() {
        if (game_over === false && parseInt(car.css('top')) > 0) {
            car.css('top', parseInt(car.css('top')) - 3);
            move_up = requestAnimationFrame(cima);
        }
    }
   
    //Esta função controla o movimento para cima.
    
    //Verifica se o jogo não terminou (game_over === false).
    
    //Confere se o valor da propriedade top do elemento car é maior que zero (parseInt(car.css('top')) > 0). Isso garante que o elemento não ultrapasse a borda superior do container.
    
    //Se as condições acima forem atendidas, atualiza a propriedade top do elemento car subtraindo 3 pixels (car.css('top', parseInt(car.css('top')) - 3);).
    
    //Em seguida, chama recursivamente requestAnimationFrame(cima); para animar o movimento.
    function baixo() {
        if (game_over === false && parseInt(car.css('top')) < container_height - car_height) {
            car.css('top', parseInt(car.css('top')) + 3);
            move_down = requestAnimationFrame(baixo);
        }
    }

    /* Mover os carros e as linhas */
    anim_id = requestAnimationFrame(repetir);

    //Esta função é chamada continuamente usando requestAnimationFrame(repetir) para criar um loop de animação.
    function repetir() {
        if (colisao(car, car_1) || colisao(car, car_2) || colisao(car, car_3)) {
            parar_o_jogo();
            return;
        }

        score_counter++;//Incrementa o contador de pontuação 

        if (score_counter % 20 == 0) {
            score.text(parseInt(score.text()) + 1);//, aumenta a pontuação visualizada na tela.
        }
        if (score_counter % 500 == 0) {
            speed++;
            line_speed++;//aumenta a velocidade do jogo (speed++ e line_speed++).
        }

        carro_descendo(car_1);//para mover o carro 1 para baixo.
        carro_descendo(car_2);//para mover o carro 2 para baixo.
        carro_descendo(car_3);// para mover o carro 3 para baixo.

        linha_descendo(line_1);//para mover a linha 1 para baixo.
        linha_descendo(line_2);// para mover a linha 2 para baixo.
        linha_descendo(line_3);// para mover a linha 3 para baixo.

        anim_id = requestAnimationFrame(repetir); //continua o loop de animação.
    }

    function carro_descendo(carro) {//Esta função é responsável por mover um carro para baixo.
        var topo_atual_carro = parseInt(carro.css('top'));//Obtém a posição atual do topo do carro 
        if (topo_atual_carro > container_height) {//reposiciona o carro acima da tela e em uma posição horizontal aleatória 
            topo_atual_carro = -200;
            var carro_esquerda = parseInt(Math.random() * (container_width - car_width));
            carro.css('left', carro_esquerda);
        }
        carro.css('top', topo_atual_carro + speed);//Atualiza a posição vertical do carro, fazendo com que ele se mova para baixo 
    }

    function linha_descendo(linha) {//Esta função é responsável por mover uma linha para baixo.
        var topo_atual_linha = parseInt(linha.css('top'));//Obtém a posição atual do topo da linha 
        if (topo_atual_linha > container_height) {//reposiciona a linha acima da tela.
            topo_atual_linha = -50;
        }
        linha.css('top', topo_atual_linha + line_speed);//Atualiza a posição vertical da linha, fazendo com que ela se mova para baixo 
    }

    restart_btn.click(function() {
        location.reload(); //Este bloco de código trata do evento de clique no botão de reinício.
    });

    function parar_o_jogo() {//Esta função é chamada quando o jogo é encerrado.
        //para parar a animação.
        game_over = true;
        // para parar a animação,Também cancela os frames de movimento.
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        restart_div.slideDown();//Exibe o elemento de reinício
        restart_btn.focus();//Coloca o foco no botão de reinício 
    }

    /* ------------------------------CÓDIGO DO JOGO TERMINA AQUI------------------------------------------- */


    function colisao($div1, $div2) {//Verifica se duas divs (elementos HTML) se interceptam
        var x1 = $div1.offset().left;//Obtém a coordenada horizontal (esquerda) da posição da primeira div ($div1).
        var y1 = $div1.offset().top;// Obtém a coordenada vertical (topo) da posição da primeira div ($div1).
        var h1 = $div1.outerHeight(true);//Obtém a altura total (incluindo margens) da primeira div ($div1).
        var w1 = $div1.outerWidth(true);//Obtém a largura total (incluindo margens) da primeira div ($div1).
        var b1 = y1 + h1;//Calcula a coordenada vertical do fundo da primeira div.
        var r1 = x1 + w1;//Calcula a coordenada horizontal da direita da primeira div.
        var x2 = $div2.offset().left;//Obtém a coordenada horizontal (esquerda) da posição da segunda div ($div2).
        var y2 = $div2.offset().top;// Obtém a coordenada vertical (topo) da posição da segunda div ($div2).
        var h2 = $div2.outerHeight(true);//Obtém a altura total (incluindo margens) da segunda div ($div2).
        var w2 = $div2.outerWidth(true);//Obtém a largura total (incluindo margens) da segunda div ($div2).
        var b2 = y2 + h2;//Calcula a coordenada vertical do fundo da segunda div.
        var r2 = x2 + w2;// Calcula a coordenada horizontal da direita da segunda div.

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
});

const pacman = {}

const inicializarJuego = () =>{
    pacman.mundo = mundo1;
    pacman.x = mundo1_x_inicial;
    pacman.y = mundo1_y_inicial;
    pacman.mundo[pacman.y][pacman.x] = 3;
    pacman.puntaje = 0;
    pacman.ultimoMovimiento = 'right';
}

const actualizarMundo = (automatico) => {
    let data = '';
    if(automatico) {
        const um = pacman.ultimoMovimiento;
        mover(um=='up'?38:um=='down'?40:um=='left'?37:39, automatico);
    }
    if(pacman.mundo) {
        for(const fila of pacman.mundo){
            data += '<div class="row">';
            for(const col of fila) {
                switch(col) {
                    case 0:
                        data += '<div class="empty"></div>';
                        break;
                    case 1:
                        data += '<div class="brick"></div>';
                        break;
                    case 2:
                        data += '<div class="coin"></div>';
                        break;
                    case 3:
                        data += `<div class="pacman ${pacman.ultimoMovimiento}"></div>`;
                    default:
                }
            }
            data += '</div>';
        }
        $('#pacman-world').html(data);
    } else {
        throw Error('El mundo no está definido.......');
    }
}

const calcularPuntaje = (valor) => {
    if(valor == 2) {
        pacman.puntaje += 1;
    }
    $('#puntaje').html(`<p>Puntaje Total: ${pacman.puntaje} pts`)
}

const mover = (movimiento, automatico) => {
    $('.pacman').removeClass(pacman.ultimoMovimiento);
    pacman.mundo[pacman.y][pacman.x] = 0;
    switch(movimiento) {
        // Arriba
        case 38:
            pacman.ultimoMovimiento = "up";
            if(automatico && pacman.mundo[pacman.y-1][pacman.x] != 1) {
                calcularPuntaje(automatico && pacman.mundo[pacman.y-1][pacman.x]);
                pacman.y -= 1;
            }
            break;
        // Abajo
        case 40:
            pacman.ultimoMovimiento = "down";
            if(automatico && pacman.mundo[pacman.y+1][pacman.x] != 1){
                calcularPuntaje(automatico && pacman.mundo[pacman.y+1][pacman.x]);
                pacman.y += 1;
            }
            break;
        // Izquierda
        case 37:
            pacman.ultimoMovimiento = "left";
            if(automatico && pacman.mundo[pacman.y][pacman.x-1] != 1) {
                calcularPuntaje(automatico && pacman.mundo[pacman.y][pacman.x-1]);
                pacman.x -= 1;
            }
            break;
        // Derecha
        case 39:
            pacman.ultimoMovimiento = "right";
            if(automatico && pacman.mundo[pacman.y][pacman.x+1] != 1) {
                calcularPuntaje(automatico && pacman.mundo[pacman.y][pacman.x+1]);
                pacman.x += 1;
            }
           break;
    }
    pacman.mundo[pacman.y][pacman.x] = 3;
    $('.pacman').addClass(pacman.ultimoMovimiento);
    actualizarMundo(false);
}


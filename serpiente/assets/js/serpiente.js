const serpiente = {}

const inicializarJuego = (interval) =>{
    serpiente.mundo = mundo1;
    serpiente.x = mundo1_x_inicial;
    serpiente.y = mundo1_y_inicial;
    serpiente.mundo[serpiente.y][serpiente.x] = 8;
    serpiente.puntaje = 0;
    serpiente.ultimoMovimiento = 'right';
    serpiente.interval = interval;
    serpiente.terminado = false;
    serpiente.cola = []
    for(let i = 1; i <= mundo1_largo_cola_inicial; i++) {
        serpiente.cola.push({x: serpiente.x-i, y: serpiente.y});

    }
    crearComida();
}

const actualizarMundo = (automatico) => {
    if(serpiente.interval) {
        if(automatico) {
            const um = serpiente.ultimoMovimiento;
            mover(um=='up'?38:um=='down'?40:um=='left'?37:39, automatico);
        }
        if(serpiente.mundo) {
            let data = '';
            for(let i = 0; i < serpiente.mundo.length; i++) {
                data += '<div class="row">';
                for(let j = 0; j < serpiente.mundo[i].length; j++) {
                    col = serpiente.mundo[i][j];
                    switch(col) {
                        case 0:
                            data += `<div class="empty ${(i + j)%2==0?'pair':'odd'}"></div>`;
                            break;
                        case 1:
                            data += '<div class="brick"></div>';
                            break;
                        case 2:
                            data += `<div class="comida-2 ${(i + j)%2==0?'pair':'odd'}"></div>`;
                            break;
                        case 3:
                            data += `<div class="comida-3 ${(i + j)%2==0?'pair':'odd'}"></div>`;
                            break;
                        case 4:
                            data += `<div class="comida-4 ${(i + j)%2==0?'pair':'odd'}"></div>`;
                            break;
                        case 5:
                            data += `<div class="comida-5 ${(i + j)%2==0?'pair':'odd'}"></div>`;
                            break;
                        case 6:
                            data += `<div class="comida-6 ${(i + j)%2==0?'pair':'odd'}"></div>`;
                            break;
                        case 8:
                            data += `<div class="snake ${serpiente.ultimoMovimiento} ${(i + j)%2==0?'pair':'odd'}"></div>`;
                            break;
                        case 9:
                            data += `<div class="snake tail ${(i + j)%2==0?'pair':'odd'}"></div>`;
                            break;
                        default:
                    }
                }
                data += '</div>';
            }
            $('#world').html(data);
        } else {
            throw Error('El mundo no está definido.......');
        }
    }
}

const calcularPuntaje = (valor) => {
    if(valor === 2) {
        serpiente.puntaje += 10;
        serpiente.come = true;
        crearComida();
    } else if(valor === 3) {
        crearComida();
        serpiente.come = true;
        serpiente.puntaje += 15;
    } else if(valor === 4) {
        crearComida();
        serpiente.come = true;
        serpiente.puntaje += 20;
    } else if(valor === 5) {
        crearComida();
        serpiente.come = true;
        serpiente.puntaje += 20;
    } else if(valor === 6) {
        crearComida();
        serpiente.come = true;
        serpiente.puntaje += 15;
    } else if(valor === 9) {
        terminarJuego(true);
    }
    $('#puntaje').html(`<p>Puntaje Total: ${serpiente.puntaje} pts</p>`)
}

const crearComida = () => {
    const max = 6;
    const min = 2;
    const valor = Math.floor((Math.random() * (max-min)) + min);
    const y = Math.floor(Math.random() * (serpiente.mundo.length-1));
    const x = Math.floor(Math.random() * (serpiente.mundo[0].length-1));
    if( serpiente.mundo[y][x] != 1 && serpiente.mundo[y][x] != 9 && serpiente.mundo[y][x] != 8){
        serpiente.mundo[y][x] = valor;
    } else {
        crearComida();
    }
}

const terminarJuego = (choco) => {
    if(choco) {
        Swal.fire('Juego terminado', `El juego ha terminado, tu puntaje es de ${serpiente.puntaje}`, 'warning')
    }
    $('#puntaje').html(`<p>Juego Terminado</p><p>Puntaje Final: ${serpiente.puntaje} pts</p>`)
    serpiente.terminado = true;
    clearInterval(serpiente.interval);
}

const mover = (movimiento, automatico) => {
    if(!serpiente.terminado) {
        $('.snake').removeClass(serpiente.ultimoMovimiento);
        const x = serpiente.x;
        const y = serpiente.y;
        serpiente.mundo[serpiente.y][serpiente.x] = 0;
        switch(movimiento) {
            // Arriba
            case 38:
                serpiente.ultimoMovimiento = "up";
                if(automatico && serpiente.mundo[serpiente.y-1][serpiente.x] != 1) {
                    calcularPuntaje(automatico && serpiente.mundo[serpiente.y-1][serpiente.x]);
                    serpiente.y -= 1;
                } else if(automatico) {
                    terminarJuego(true);
                }
                break;
            // Abajo
            case 40:
                serpiente.ultimoMovimiento = "down";
                if(automatico && serpiente.mundo[serpiente.y+1][serpiente.x] != 1){
                    calcularPuntaje(automatico && serpiente.mundo[serpiente.y+1][serpiente.x]);
                    serpiente.y += 1;
                } else if(automatico) {
                    terminarJuego(true);
                }
                break;
            // Izquierda
            case 37:
                serpiente.ultimoMovimiento = "left";
                if(automatico && serpiente.mundo[serpiente.y][serpiente.x-1] != 1) {
                    calcularPuntaje(automatico && serpiente.mundo[serpiente.y][serpiente.x-1]);
                    serpiente.x -= 1;
                } else if(automatico) {
                    terminarJuego(true);
                }
                break;
            // Derecha
            case 39:
                serpiente.ultimoMovimiento = "right";
                if(automatico && serpiente.mundo[serpiente.y][serpiente.x+1] != 1) {
                    calcularPuntaje(automatico && serpiente.mundo[serpiente.y][serpiente.x+1]);
                    serpiente.x += 1;
                } else if(automatico) {
                    terminarJuego(true);
                }
                break;
        }
        serpiente.mundo[serpiente.y][serpiente.x] = 8;
        // Actualizar Cola
        serpiente.mundo[y][x] = 9;
        serpiente.cola.unshift({x: x, y:y});
        if(serpiente.cola.length > 0) {
            if(!serpiente.come) {
                const del = serpiente.cola.pop();
                serpiente.mundo[del.y][del.x] = 0;
            }
            serpiente.come = false;
            for(let obj of serpiente.cola){
                serpiente.mundo[obj.y][obj.x] = 9;
            }
        }

        $('.snake').addClass(serpiente.ultimoMovimiento);
        actualizarMundo(false);
    }
}


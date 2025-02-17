const tablero = document.getElementById('idtablero');
const cuadros = document.querySelectorAll('.Tablero div');
const turnoIndicador = document.getElementById('jueguito');
const mensaje = document.getElementById('message');
const reiniciarButton = document.getElementById('reiniciarjuego');   

const marcadorX = document.getElementById('victorias-X');
const marcadorO = document.getElementById('victorias-O');
marcadorX.textContent = localStorage.getItem("victoriasX") || 0;
marcadorO.textContent = localStorage.getItem("victoriasO") || 0;
let jugadorActual = 'X';
let estadoJuego = ['', '', '', '', '', '', '', '', ''];  
let juegoActivo = true;
let victoriasX = 0;
let victoriasO = 0;

function manejarClickCuadro(event) {
    const cuadroIndex = Array.from(cuadros).indexOf(event.target);  
    if (estadoJuego[cuadroIndex] !== '' || !juegoActivo || jugadorActual === 'O') {
        return;  
    }

    
    estadoJuego[cuadroIndex] = jugadorActual;
    event.target.textContent = jugadorActual;

    if (verificarGanador()) {
        mensaje.textContent = `${jugadorActual} ha ganado!`;
        if (jugadorActual === 'X') {
            victoriasX++;
            marcadorX.textContent = victoriasX;
            localStorage.setItem("victoriasX",victoriasX);
        } else if(jugadorActual === "O") {
            victoriasO++;
            marcadorO.textContent = victoriasO;
            localStorage.setItem("victoriasO",victoriasO);   
        }
        juegoActivo = false;
    } else if (estadoJuego.every(cuadro => cuadro !== '')) {
        mensaje.textContent = 'Empate!';
        juegoActivo = false;
    } else {
        // Cambiar turno a la compu
        jugadorActual = 'O';
        turnoIndicador.textContent = 'O';
        setTimeout(() => {
            computadoraJuega();
        }, 300);
    }
}

function verificarGanador() {
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  
        [0, 4, 8], [2, 4, 6]               
    ];

    for (let combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;
        if (estadoJuego[a] !== '' && estadoJuego[a] === estadoJuego[b] && estadoJuego[a] === estadoJuego[c]) {
            cuadros[a].classList.add('celda-ganadora');
            cuadros[b].classList.add('celda-ganadora');
            cuadros[c].classList.add('celda-ganadora');
            return true;
        }
    }
    return false;
}

function reiniciarjuego() {
    estadoJuego = ['', '', '', '', '', '', '', '', ''];
    juegoActivo = true;
    jugadorActual = 'X';
    turnoIndicador.textContent = 'X';
    mensaje.textContent = '';
    
    cuadros.forEach(cuadro => {
        cuadro.textContent = '';  
        cuadro.classList.remove('celda-ganadora');  
    });
}

function computadoraJuega() {
    // Hacer que la compu juegue 
    const opcionesDisponibles = estadoJuego.map((valor, index) => valor === '' ? index : null).filter(valor => valor !== null);
    const movimiento = opcionesDisponibles[Math.floor(Math.random() * opcionesDisponibles.length)];
    
 
    estadoJuego[movimiento] = jugadorActual;
    cuadros[movimiento].textContent = jugadorActual;

    if (verificarGanador()) {
        mensaje.textContent = `${jugadorActual} ha ganado!`;
        if (jugadorActual === 'X') {
            victoriasX++;
            marcadorX.textContent = victoriasX;            
        } else if(jugadorActual === "O") {
            victoriasO++;
            marcadorO.textContent = victoriasO;
            localStorage.setItem("victoriasO",victoriasO);   
            
        }
        juegoActivo = false;
    } else if (estadoJuego.every(cuadro => cuadro !== '')) {
        mensaje.textContent = 'Empate!';
        juegoActivo = false;
    } else {
        // Cambiar turno al jugador
        jugadorActual = 'X';
        turnoIndicador.textContent = 'X';
    }
}

cuadros.forEach(cuadro => {
    cuadro.addEventListener('click', manejarClickCuadro);
});

reiniciarButton.addEventListener('click', reiniciarjuego);



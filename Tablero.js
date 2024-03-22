class Tablero {
    constructor(filas, columnas, numBombas) {
        this.filas = filas;
        this.columnas = columnas;
        this.numBombas = numBombas;
        this.tablero = this.generaTablero();
        this.colocaBombas();
        this.calcularAdyacentes();
    }

    generaTablero() {
        let matriz = [];
        for (let i = 0; i < this.filas; i++) {
            let fila = [];
            for (let k = 0; k < this.columnas; k++) {
                fila.push(new Casilla());
            }
            matriz.push(fila);
        }
        return matriz;
    }

    colocaBombas() {
        let contadoraBombas = 0;

        while (contadoraBombas < this.numBombas) {
            let randomX = Math.floor(Math.random() * this.filas);
            let randomY = Math.floor(Math.random() * this.columnas);

            if (!this.tablero[randomX][randomY].bomba) {
                this.tablero[randomX][randomY].bomba = true;
                contadoraBombas++;
            }
        }
    }

    calcularAdyacentes() {
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                const bombasAdyacentes = this.contarBombasAdyacentes(i, j);
                this.tablero[i][j].adyacentes = bombasAdyacentes;
            }
        }
    }

    obtenCasillasAdyacentes(x, y) {
        const adyacentes = [];
        //Recorrer del -1 al 1 pasando por 0 para sacar las coordenadas
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newX = x + i;
                const newY = y + j;

                if (newX >= 0 && newX < this.filas && newY >= 0 && newY < this.columnas) {
                    adyacentes.push({ x: newX, y: newY });
                }
            }
        }

        return adyacentes;
    }

    contarBombasAdyacentes(x, y) {
        let bombasAdyacentes = 0;
        const casillasAdyacentes = this.obtenCasillasAdyacentes(x, y);

        for (const casilla of casillasAdyacentes) {
            if (this.tablero[casilla.x][casilla.y].bomba) {
                bombasAdyacentes++;
            }
        }

        return bombasAdyacentes;
    }  
}

const miModulo = (() => {
    'use strict';

        
    let deck = [];
    const tipos = ['C','D','H','S'],
        especiales = ['A','J','Q','K'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0;

    let puntosJugadores = [];



    //Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');
          
    //Esta funcion incializa el juego.
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];
        for(let i = 0; i<numJugadores; i++){
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem =>elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    }

    //Esta funcion crea el deck.
    const crearDeck = () =>{

        deck = [];
        for( let i = 2; i <= 10; i++){
            for(let tipo of tipos){
                deck.push( i + tipo);
            }

        };

        for(let tipo of tipos){
            for(let esp of especiales){
            deck.push( esp + tipo);
            }
        }
        return _.shuffle(deck);;
    }


    //Esta funcion me permite tomar una carta
    const pedirCarta = () => {
        if(deck.length === 0 ){
            throw 'No hay carta en el deck';
        }
        return deck.pop();
    };


    const valorCarta = (carta) =>{
        const valor = carta.substring(0,carta.length-1);
        return (isNaN(valor)) ? 
                (valor === 'A') ? 11 : 10
                : valor * 1;
        
        
        // let puntos = 0;
        // if(isNaN(valor)){

        //     puntos = ( valor === 'A' ) ? 11 : 10;

        // }else{
        //     console.log('Es un numero');
        //     puntos = valor * 1;
        // }

        // console.log(puntos);
    };
//Turno: 0 = primer jugador y el ultimo la computadora
    const acumularPuntos = (carta, turno) =>{

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];


    }

    const crearCarta = (carta,turno) =>{
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);

    }

    const determinarGanador = () =>{

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
        if(puntosComputadora ===puntosMinimos){
            alert('Nadie gana: ()');
        }else if( puntosMinimos > 21){
            alert('Computadora gana');
        }else if(puntosComputadora > 21){
            alert('Jugador Gana');
        }else{
            alert('Computadora Gana');
        }
        }, 100);
    }

    //Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do{
        const carta = pedirCarta();
        puntosComputadora = acumularPuntos(carta,puntosJugadores.length-1);
        crearCarta(carta, puntosJugadores.length-1);
        // puntosComputadora = puntosComputadora + valorCarta(carta);

        // puntosHTML[1].innerText = puntosComputadora;

        // <img class="carta" src="assets/cartas/2C.png">
        // const imgCarta = document.createElement('img');
        // imgCarta.src = `assets/cartas/${ carta }.png`;
        // imgCarta.classList.add('carta');

        // divCartasComputadora.append(imgCarta);



        }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <=21));
        
        determinarGanador();
        
    }


    //Eventos:
    //callback puede ser funcion normal o flecha
    btnPedir.addEventListener('click',() =>{
        
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta,0);

        crearCarta(carta,0);


        if(puntosJugador >21 ){
            console.warn('Lo siento mucho, perdiste.');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        }else if(puntosJugador===21){
            console.warn('21, genial!')
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        }
    })

    btnDetener.addEventListener('click', () =>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);

    })

    // btnNuevo.addEventListener('click',() =>{

    //     inicializarJuego();

        // deck = [];
        // deck = crearDeck();

        // puntosJugador = 0,
        // puntosComputadora = 0;
        // puntosHTML[0].innerText = 0;
        // puntosHTML[1].innerText = 0;
        
        // divCartasComputadora.innerHTML = false;
        // divCartasJugador.innerHTML = false;

    // }); 

    return{
        nuevoJuego: inicializarJuego
    };

})();




'use strict';

const frutas = [
    { index: 1, nombre: 'Cereza', simbolo: '🍒' },
    { index: 2, nombre: 'Limón', simbolo: '🍋' },
    { index: 3, nombre: 'Sandía', simbolo: '🍉' },
    { index: 4, nombre: 'Uva', simbolo: '🍇' },
    { index: 5, nombre: 'Plátano', simbolo: '🍌' }
];

const playButton = document.getElementById('play-button');

const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');

const winAnnouncement = document.getElementById('win-announcement');
const creditsValue = document.getElementById('credits-value');
let creditos;

function jugar(){
    creditos = Number(creditsValue.textContent);

    winAnnouncement .innerHTML = '';

    console.log(creditos);
    
    const indicesFrutas = generarTresNumerosAleatorios();
    const fruta1 = `${frutas[indicesFrutas[0]].simbolo}`;
    const fruta2 = `${frutas[indicesFrutas[1]].simbolo}`;
    const fruta3 = `${frutas[indicesFrutas[2]].simbolo}`;

    slot1.innerHTML = fruta1;
    slot2.innerHTML = fruta2;
    slot3.innerHTML = fruta3;

    creditos--;
    creditsValue.textContent = creditos;
    
    if (indicesFrutas[0] + 1  === frutas[0].index && indicesFrutas[1] + 1  === frutas[1].index && indicesFrutas[2] + 1  === frutas[2].index) {
        window.alert('Has ganado el juego!');
        window.location = '../index.html';
    }

    if (fruta1 === fruta2 && fruta1 === fruta2 && fruta2 === fruta3) {
        winAnnouncement .innerHTML = '¡+3 CREDITOS!';
        creditos = creditos + 3;
        creditsValue.textContent = creditos;
    }

    if (fruta1 === fruta2 || fruta2 === fruta3 || fruta1 === fruta3 ) {
        winAnnouncement .innerHTML = '¡+1 CREDITOS!';
        creditos = creditos + 1;
        creditsValue.textContent = creditos;
    }

    if(creditos === 0) {
        window.alert('No quedan créditos.');
        window.location = '../index.html';
    }
}

function generarTresNumerosAleatorios() {
    return [Math.floor(Math.random() * 5), Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)];
}

playButton.addEventListener('click', () => {
    jugar();
});

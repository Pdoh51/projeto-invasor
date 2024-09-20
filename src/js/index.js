const video = document.getElementById('video');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const prevButton = document.getElementById('anterior');
const nextButton = document.getElementById('proximo');
const playlistButtons = document.querySelectorAll('.playlist-controles button');
const barraProgresso = document.getElementById('barraProgresso');
const tempoAtual = document.getElementById('tempoAtual');
const tempoTotal = document.getElementById('tempoTotal');
const playlistControles = document.querySelectorAll('.nome');

const tracks = [
    './src/musicas/1-invasor.mpeg',
    './src/musicas/2-nao-acreditei.mpeg',
    './src/musicas/3-viagem-de-chihiro.mpeg',
    './src/musicas/4-roda-gigante.mpeg',
    './src/musicas/5-sem-querer.mpeg',
    './src/musicas/6-algodao-interludio.mpeg',
    './src/musicas/7-reigan.mpeg',
    './src/musicas/8-desabafos-nao-mentem.mpeg',
    './src/musicas/9-camomila.mpeg'
];

let currentTrackIndex = 0;

function loadTrack(index) {
    if (index < 0 || index >= tracks.length) return;
    video.src = tracks[index];
    video.play();
    currentTrackIndex = index;
}

playButton.addEventListener('click', () => {
    if (video.src) {
        video.play();
    } else {
        loadTrack(currentTrackIndex);
    }
});

pauseButton.addEventListener('click', () => {
    video.pause();
});

prevButton.addEventListener('click', () => {
    if (currentTrackIndex > 0) {
        const nomeSelecionado = document.querySelector('.nome.selecionado');
        nomeSelecionado.classList.remove('selecionado');
        loadTrack(currentTrackIndex - 1);
        const anteriorNome = document.querySelector(`.nome[data-index="${currentTrackIndex}"]`);
        anteriorNome.classList.add('selecionado');
    }
});

nextButton.addEventListener('click', () => {
    if (currentTrackIndex < tracks.length - 1) {
        const nomeSelecionado = document.querySelector('.nome.selecionado');
        nomeSelecionado.classList.remove('selecionado');
        loadTrack(currentTrackIndex + 1);
        const proximoNome = document.querySelector(`.nome[data-index="${currentTrackIndex}"]`);
        proximoNome.classList.add('selecionado');
    }
});

playlistButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        loadTrack(index);
    });
});

video.addEventListener('ended', () => {
    if (currentTrackIndex < tracks.length - 1) {
        const nomeSelecionado = document.querySelector('.nome.selecionado');
        nomeSelecionado.classList.remove('selecionado')
        loadTrack(currentTrackIndex + 1);
        const proximoNome = document.querySelector(`.nome[data-index="${currentTrackIndex}"]`);
        proximoNome.classList.add('selecionado');
    }
});

video.addEventListener('loadedmetadata', () => {
    barraProgresso.max = video.duration;
    tempoTotal.textContent = formatarTempo(video.duration);
  });

  video.addEventListener('timeupdate', () => {
    barraProgresso.value = video.currentTime;
    tempoAtual.textContent = formatarTempo(video.currentTime);
  });
  
  barraProgresso.addEventListener('input', () => {
    video.currentTime = barraProgresso.value;
  });
  
  function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60).toString().padStart(2, '0');
    return `${minutos}:${seg}`;
  }

  playlistControles.forEach((nome) =>{
    nome.addEventListener("click", () =>{

        const nomeSelecionado = document.querySelector(".nome.selecionado")
        nomeSelecionado.classList.remove('selecionado')

        nome.classList.add("selecionado")
    })
  })
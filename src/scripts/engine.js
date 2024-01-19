/* Seleciona todos os elementos das teclas do piano no documento */
const pianoKeys = document.querySelectorAll(".piano-keys .key");

/* Armazena o input do volume */
const volumeSlider = document.querySelector(".volume-slider input");

/* Armazena o input de exibir as teclas */
const keysCheck = document.querySelector(".keys-check input");

/* Vetor para armazenar as teclas mapeadas existentes no piano */
let mappedKeys = [];

/* Objeto de áudio para reproduzir os sons das teclas */
let audio = new Audio("./src/tunes/a.wav");

/* Função playTune que reproduz o som, adiciona e remove o efeito visual ao clicar em uma tecla */
const playTune = (key) => {
  // Define dinamicamente o arquivo de som com base no valor da tecla
  audio.src = `./src/tunes/${key}.wav`;

  // Reproduz o som
  audio.play();

  // Captura o elemento HTML que possui o valor equivalente à tecla
  const clickedKey = document.querySelector(`[data-key="${key}"]`);

  // Adiciona a classe 'active' ao elemento para efeito visual
  clickedKey.classList.add("active");

  /* Após 150ms, remove a classe 'active' do elemento para resetar o efeito visual */
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

/* Adiciona um evento de clique para cada tecla do piano */
pianoKeys.forEach((key) => {
  // Chama a função playTune com o valor da tecla associado como parâmetro
  key.addEventListener("click", () => playTune(key.dataset.key));

  // Captura as teclas mapeadas no piano e as adiciona ao vetor mappedKeys
  mappedKeys.push(key.dataset.key);
});

/* Adiciona um evento para tecla pressionada no teclado */
document.addEventListener("keydown", (e) => {
  // Chama a função playTune com o valor da tecla pressionada como parâmetro somente se a tecla pressionada for pertencente ao piano
  if (mappedKeys.includes(e.key)) {
    playTune(e.key);
  }
});

/* Função handleVolume que recebe um evento e manipula o volume do som */
const handleVolume = (e) => {
  audio.volume = e.target.value;
};

/* Função showHideKeys que recebe um evento e exibe ou oculta as teclas */
const showHideKeys = () => {
  pianoKeys.forEach(key => key.classList.toggle("hide"))
}

/* Adiciona um evento para o input do volume e chama a função handleVolume */
volumeSlider.addEventListener("input", handleVolume);

/* Adiciona um evento para o input de ligar as teclas e chama a função showHideKeys */
keysCheck.addEventListener("click", showHideKeys);

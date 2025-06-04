const btn = document.getElementById('start');
const status = document.getElementById('status');
const historial = document.getElementById('historial');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
  btn.disabled = true;
  status.textContent = 'Lo siento, tu navegador no soporta reconocimiento de voz.';
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = 'es-ES';
  recognition.interimResults = false;

  btn.onclick = () => {
    recognition.start();
  };

  recognition.onstart = () => {
    status.textContent = 'Escuchando... 🎙️';
    btn.disabled = true;
    btn.style.cursor = 'wait';
  };

  recognition.onend = () => {
    status.textContent = 'Haz clic para empezar a escuchar';
    btn.disabled = false;
    btn.style.cursor = 'pointer';
  };

  recognition.onresult = e => {
    const texto = e.results[0][0].transcript;
    agregarMensaje(texto);
  };

  recognition.onerror = e => {
    agregarMensaje(`Error: ${e.error}`, true);
    status.textContent = '';
    btn.disabled = false;
    btn.style.cursor = 'pointer';
  };

  status.textContent = 'Haz clic para empezar a escuchar';
}

function agregarMensaje(texto, esError = false) {
  const div = document.createElement('div');
  div.classList.add('mensaje');
  if (esError) {
    div.style.background = '#dc3545'; // rojo para errores
  }
  div.textContent = texto;
  historial.appendChild(div);
  historial.scrollTop = historial.scrollHeight;
}

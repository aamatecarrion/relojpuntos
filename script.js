window.onload = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const radio = 10;
  const canvasHeight = 60 * radio;
  const canvasWidth = 1440 * radio;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  let started = false;

  let ultimoDibujado = 0;

  function dibujarPunto(numero) {
    const y = (numero % dotsPerCol) * radio;
    const x = Math.floor(numero / dotsPerCol) * radio;

    // Pintar de blanco todos los segundos del minuto 00 de cada hora
    if (numero % 3600 < 60) {
      ctx.fillStyle = `white`;
    } else {
      const color30 = Math.floor(numero / 3600) * 15;

      ctx.fillStyle = `hsl(${color30}, 100%, 50%)`;
    }

    ctx.beginPath();
    ctx.arc(x + radio / 2, y + radio / 2, radio / 3, 0, Math.PI * 2);
    ctx.fill();

    ultimoDibujado = numero;
  }

  function dibujarHoras() {

    for (let i = 0; i < 24; i++) {
      const marcaHoraria = (canvasWidth / 24) * i;
      
      const startX = marcaHoraria;
      const startY = 0;
      
      // Coordenadas de fin de la línea
      const endX = marcaHoraria;
      const endY = canvasHeight;
      
      // Estilo de la línea
      ctx.strokeStyle = "red"; // Color de la línea
      ctx.lineWidth = 1; // Ancho de la línea
      
      // Dibuja la línea
      ctx.beginPath(); // Inicia un nuevo trazo
      ctx.moveTo(startX, startY); // Mueve el lápiz a las coordenadas de inicio
      ctx.lineTo(endX, endY); // Dibuja una línea hasta las coordenadas de fin
      ctx.stroke();

      ctx.font = "400px Arial";
      ctx.textAlign = "left";
      ctx.textBaseline = "top"; // Tamaño y tipo de fuente
      ctx.fillStyle = "rgba(0, 0, 0, 1)"; // Color del texto
      ctx.fillText(`${i}`, marcaHoraria + 70, 110);
    }
  }

  function milisegundosDesde12am() {
    const actualDate = new Date();
    const diaEn12am = new Date(
      actualDate.getFullYear(),
      actualDate.getMonth(),
      actualDate.getDate()
    );
    const diferencia = actualDate - diaEn12am;
    return diferencia;
  }

  const dotsPerCol = Math.floor(canvasHeight / radio);
  function draw() {
    const segundos = Math.floor(milisegundosDesde12am() / 1000);

    if (!started) {
      started = true;
      for (let i = 0; i < segundos; i++) {
        dibujarPunto(i);
      }

    }
    if (started && segundos > ultimoDibujado) {

      dibujarPunto(segundos);
      dibujarHoras();   
      
    }

  }
  setInterval(draw, 10);
};

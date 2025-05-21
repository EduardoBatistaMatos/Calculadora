const display = document.getElementById("display");

// Adiciona números ao display
document.querySelectorAll(".number").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (display.textContent === "0") {
      display.textContent = btn.textContent;
    } else {
      display.textContent += btn.textContent;
    }
  });
});

// Adiciona operadores ao display
document.querySelectorAll(".operation").forEach((btn) => {
  btn.addEventListener("click", () => {
    const lastChar = display.textContent.slice(-1);
    if (!["+", "-", "*", "/"].includes(lastChar)) {
      display.textContent += btn.textContent;
    }
  });
});

// Limpa o display
document.querySelector(".clear").addEventListener("click", () => {
  display.textContent = "0";
});

// Calcula o resultado
document.querySelector(".equals").addEventListener("click", () => {
  const expressao = display.textContent;

  const operador = expressao.match(/[-+/*]/)?.[0]; // ou coloque o hífen no final ou no início
  if (!operador) {
    display.textContent = "Erro";
    return;
  }

  const [a, b] = expressao.split(operador);
  if (!a || !b || isNaN(a) || isNaN(b)) {
    display.textContent = "Erro";
    return;
  }

  // Define a URL completa da API de acordo com o operador
  let url;
  switch (operador) {
    case "+":
      url = `https://soma-liart.vercel.app/soma?num1=${a}&num2=${b}`;
      break;
    case "-":
      url = `https://subtracao-sigma.vercel.app/subtracao?num1=${a}&num2=${b}`;
      break;
    case "*":
      url = `https://multplicacao.vercel.app/multiplicacao?num1=${a}&num2=${b}`;
      break;
    case "/":
      url = `https://divisao-nine.vercel.app/divisao?num1=${a}&num2=${b}`;
      break;
  }

  // Faz a requisição à API correspondente
  axios
    .get(url)
    .then((res) => {
      display.textContent = res.data.result || res.data.resultado;
    })
    .catch((err) => {
      display.textContent = "Erro";
      console.error("Erro na requisição:", err);
    });
});

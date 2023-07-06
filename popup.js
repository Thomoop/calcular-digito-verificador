function calculateVerifierDigit() {
  var rutNumbers = document.getElementById("rut-numbers").value;

  if (!/^[0-9]+$/.test(rutNumbers)) {
    return "RUT inválido";
  }

  var dv = calculateDigitVerificador(rutNumbers);

  return rutNumbers + "-" + dv;
}

function calculateAndShowResult() {
  var result = calculateVerifierDigit();
  var resultElement = document.getElementById("result");
  resultElement.innerHTML = result;
}

function calculateDigitVerificador(rutNumber) {
  var suma = 0;
  var factor = 2;

  for (var i = rutNumber.length - 1; i >= 0; i--) {
    suma += factor * parseInt(rutNumber.charAt(i));
    factor = factor == 7 ? 2 : factor + 1;
  }

  var resto = suma % 11;
  var dv = 11 - resto;

  if (dv == 11) {
    return "0";
  } else if (dv == 10) {
    return "K";
  } else {
    return String(dv);
  }
}

function generateRandomRUT() {
  var rutNumbers = Math.floor(Math.random() * (25000000 - 1000000 + 1) ) + 1000000;
  var dv = calculateDigitVerificador(String(rutNumbers));
  return rutNumbers + "-" + dv;
}

function calculateAndShowRandomRUT() {
  var result = generateRandomRUT();
  var resultElement = document.getElementById("result");
  resultElement.innerHTML = result;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
    console.log('Copiado al portapapeles!');
    document.title = 'Copiado al portapapeles!';
    setTimeout(function() {
      document.title = 'Calculadora de RUT';
    }, 2000);
  }).catch(function(error) {
    console.error('Error al copiar al portapapeles: ', error);
  });
}

var button = document.getElementById("calculate-button");
button.addEventListener('click', function() {
  calculateAndShowResult();
  copyToClipboard(document.getElementById("result").innerText);
});

var randomButton = document.getElementById("random-button");
randomButton.addEventListener('click', function() {
  calculateAndShowRandomRUT();
  copyToClipboard(document.getElementById("result").innerText);
});

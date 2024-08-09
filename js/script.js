const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz".split("");
const digits = "0123456789".split("");
const punctuation = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~".split("");

let geneBtn = document.getElementById("geneBtn");
let lettersCount = document.getElementById("lettersCount");
let outputInput = document.querySelector(".output input");

let upperCaseRatio = document.getElementById("s1");
let lowerCaseRatio = document.getElementById("s2");
let digitsRatio = document.getElementById("s3");
let PunctuationRatio = document.getElementById("s4");
let ratios = document.querySelectorAll(".range span");
let ratioInputs = document.querySelectorAll(".range input");
let totalRatio = document.querySelector(".total-ratio");

(function handleRatios() {
  function updateRatioText(ratioElement, ratioValue) {
    ratioElement.textContent = ratioValue + "%";
  }

  function updateRatios(input, index) {
    updateRatioText(index, input.value);
    input.addEventListener("input", () => {
      updateRatioText(ratios[index], input.value);
      totalRatioChange();
    });
  }
  ratioInputs.forEach(updateRatios);
  for (let i = 0; i < ratios.length; i++) {
    updateRatioText(ratios[i], ratioInputs[i].value);
  }

  geneBtn.addEventListener("click", getRandomChars);

  function totalRatioChange() {
    totalRatio.innerHTML = `Total ratio: ${+upperCaseRatio.value +
      +lowerCaseRatio.value +
      +digitsRatio.value +
      +PunctuationRatio.value
      }%`;
  }

  totalRatioChange();
})();

function getRandomChars() {
  let lettersCountValue = parseInt(lettersCount.value);

  if (
    +upperCaseRatio.value +
    +lowerCaseRatio.value +
    +digitsRatio.value +
    +PunctuationRatio.value ===
    100
  ) {
    if (lettersCountValue >= 6) {
      let part1 = Math.round((lettersCountValue * upperCaseRatio.value) / 100);
      let part2 = Math.round((lettersCountValue * lowerCaseRatio.value) / 100);
      let part3 = Math.round((lettersCountValue * digitsRatio.value) / 100);
      let part4 = Math.round(
        (lettersCountValue * PunctuationRatio.value) / 100
      );

      let upperCaseRandom = [];
      let lowerCaseRandom = [];
      let digitsRandom = [];
      let punctuationRandom = [];

      for (let u = 0; u < part1; u++) {
        upperCaseRandom.push(
          upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)]
        );
      }

      for (let l = 0; l < part2; l++) {
        lowerCaseRandom.push(
          lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)]
        );
      }

      for (let d = 0; d < part3; d++) {
        digitsRandom.push(digits[Math.floor(Math.random() * digits.length)]);
      }

      for (let p = 0; p < part4; p++) {
        punctuationRandom.push(
          punctuation[Math.floor(Math.random() * punctuation.length)]
        );
      }

      let totalOfChars = upperCaseRandom
        .concat(lowerCaseRandom)
        .concat(digitsRandom)
        .concat(punctuationRandom);
      let result = shuffle(totalOfChars).join("");
      outputInput.value = result;
    } else if (lettersCountValue <= 0 || lettersCountValue <= 6) {
      alert("Please enter a valid number of characters (at least 6).");
      lettersCount.value = "";
    } else if (lettersCountValue != "") {
      alert("Please enter the number of characters");
    }
  } else {
    alert("Total ratio must be 100%");
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

let copyBtn = document.getElementById("copyBtn");
copyBtn.addEventListener("click", copyToClipboard);

function copyToClipboard() {
  navigator.clipboard.writeText(outputInput.value).then(() => {
    copyBtn.textContent = "Copied";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1000);
  });
}

const upperCaseLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const lowerCaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const punctuation = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];

let geneBtn = document.getElementById("geneBtn");
let lettersCount = document.getElementById("lettersCount");
let outputSpan = document.querySelector(".output span");

let upperCaseRatio = document.getElementById("s1");
let lowerCaseRatio = document.getElementById("s2");
let digitsRatio = document.getElementById("s3");
let PunctuationRatio = document.getElementById("s4");
let ratios = document.querySelectorAll(".range span");
let totalRatio = document.querySelector(".total-ratio");


(function updateRatios () {
    function updateRatioText(ratioElement, ratioValue) {
        ratioElement.textContent = ratioValue + "%";
    }
    ratios[0].textContent = upperCaseRatio.value + "%";
    upperCaseRatio.addEventListener("input", function () {
        updateRatioText(ratios[0], upperCaseRatio.value);
        totalRatioChange ()
    });
    
    ratios[1].textContent = lowerCaseRatio.value + "%";
    lowerCaseRatio.addEventListener("input", function () {
        updateRatioText(ratios[1], lowerCaseRatio.value);
        totalRatioChange ()
    });
    
    ratios[2].textContent = digitsRatio.value + "%";
    digitsRatio.addEventListener("input", function () {
        updateRatioText(ratios[2], digitsRatio.value);
        totalRatioChange ()
    });
    
    ratios[3].textContent = PunctuationRatio.value + "%";
    PunctuationRatio.addEventListener("input", function () {
        updateRatioText(ratios[3], PunctuationRatio.value);
        totalRatioChange ()
    });
    
    geneBtn.addEventListener("click", getRandomChars);

    function totalRatioChange () {
        totalRatio.innerHTML = `<b>Total ratio:</b> ${+upperCaseRatio.value + +lowerCaseRatio.value + +digitsRatio.value + +PunctuationRatio.value}%`
    };

    totalRatioChange ()
    
}) ()



function getRandomChars() {
    let lettersCountValue = parseInt(lettersCount.value);
    
    if (+upperCaseRatio.value + +lowerCaseRatio.value + +digitsRatio.value + +PunctuationRatio.value === 100) {
        if (lettersCountValue >= 6) {
            let part1 = Math.round(lettersCountValue * upperCaseRatio.value / 100);
            let part2 = Math.round(lettersCountValue * lowerCaseRatio.value / 100);
            let part3 = Math.round(lettersCountValue * digitsRatio.value / 100);
            let part4 = Math.round(lettersCountValue * PunctuationRatio.value / 100);
    
            let upperCaseRandom = [];
            let lowerCaseRandom = [];
            let digitsRandom = [];
            let punctuationRandom = [];
    
            for (let u = 0; u < part1; u++) {
                upperCaseRandom.push(upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)]);
            }
    
            for (let l = 0; l < part2; l++) {
                lowerCaseRandom.push(lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)]);
            }
    
            for (let d = 0; d < part3; d++) {
                digitsRandom.push(digits[Math.floor(Math.random() * digits.length)]);
            }
    
            for (let p = 0; p < part4; p++) {
                punctuationRandom.push(punctuation[Math.floor(Math.random() * punctuation.length)]);
            }
    
            let totalOfChars = upperCaseRandom.concat(lowerCaseRandom).concat(digitsRandom).concat(punctuationRandom);
            let result = shuffle(totalOfChars).join("");
            outputSpan.innerHTML = result;
        }else if (lettersCountValue <= 0) {
            alert("Please enter a valid number of characters.");
        }else if(lettersCountValue <= 6){
            alert("Please enter a number of at least 6")
        }else if(lettersCountValue != ""){
            alert("Please enter the number of characters")
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
    navigator.clipboard.writeText(outputSpan.textContent).then(() => {
        copyBtn.textContent = "Copied";
        setTimeout(() => {
            copyBtn.textContent = "Copy";
        }, 1000); 
    })
}

//grab elements from DOM [used const instead of vars so I would not re-declare variables by accident]
const resultE = document.getElementById('results');
const clipE = document.getElementById('clipboard');
const valueE = document.getElementById('value');
const rangeE = document.getElementById('myRange');
const upperE = document.getElementById('uprCas');
const lowerE = document.getElementById('lwrCas');
const numberE = document.getElementById('numQ');
const symbolE = document.getElementById('symQ');
const generateE = document.getElementById('gen-btn');

//sets the initial number value in the span based on slider position
valueE.innerHTML = rangeE.value;

rangeE.oninput = function() {
    valueE.innerHTML = rangeE.value;
}

const randomFunction = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol
};


//generate event listen
generateE.addEventListener('click', () => {
    const length = parseInt(rangeE.value); //returns string, need a number so I parsed value.
    const hasUpper = upperE.checked;
    const hasLower = lowerE.checked;
    const hasNumber = numberE.checked;
    const hasSymbol = symbolE.checked;

    resultE.innerText = generatePassword(
        hasUpper, 
        hasLower, 
        hasNumber, 
        hasSymbol, 
        length)
})

// Genrate password function stopped here
    function generatePassword(Upper, Lower, Number, Symbol, length) {

    let generatedPassword = '';

    const typesCount = Upper + Lower + Number + Symbol;

    Console.log(typesCount)
}

/* 
return String.fromCharCode() [returns a letter, number or symbol from the character set]
Math.random() [generates a random decimal number]
Math.floor() [Rounding]
my.length [returns the number of characters in a string or an array]
*/

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65); //26 is number of alphabets & 65 is where uppercase starts on chart
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97); //26 is number of alphabets & 97 is where lowercase starts on chart
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48); //10 is number of characters (including 0) & 48 is where the numbers starts
}

function getRandomSymbol() {
    const symbol = '!@#$%^&*()-_+={}?~';
    return symbol[Math.floor(Math.random() * symbol.length)]
}


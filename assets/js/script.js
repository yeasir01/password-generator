//grab elements from DOM [used const instead of vars - will not be re-declaring variables]
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

//updates the value in the span based on slider position
rangeE.oninput = function() {
    valueE.innerHTML = rangeE.value;
}

//copy password to clipboard
function copyFunction(){
    const copyText = resultE;
    copyText.select();
    copyText.setSelectionRange(0, 999)
    document.execCommand('copy');
    alert("Password Copied: " + copyText.value)
}

const randomFunction = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

//generate event listen instead of setting onclick in html document
generateE.addEventListener('click', () => {
    const length = parseInt(rangeE.value); //returns string, need a number so I parsed value.
    const hasUpper = upperE.checked;
    const hasLower = lowerE.checked;
    const hasNumber = numberE.checked;
    const hasSymbol = symbolE.checked;

    resultE.value = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length); //sets the password value in the textbox
})

/* 
GENERATE PASSWORD FUNCTION
1. Intialize password variable
2. filter out unchecked types
3. loop over length call a generator function for each type
4. Since there are 4 types generator will always return a min of 4 - preform slice
5. add the final password to the textbox
*/

function generatePassword(upper, lower, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = upper + lower + number + symbol; //counts number of values checked

    const typesArr = [{upper}, {lower}, {number}, {symbol}].filter //set an array, curley brackets return "upper:true" instead of "true"
    (
        item => Object.values(item) [0]
    ); 
    
    if(typesCount == 0) { //if all boxes unchecked return an empty string
        return '';
    }

    for (let i = 0; i < length; i += typesCount){ //goes through for loop & generates differnt types
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunction[funcName]();
        })
    }

    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword
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
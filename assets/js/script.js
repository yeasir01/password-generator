const result = document.getElementById('result');
const rangeSelector = document.getElementById('rangeSelector');
const rangeText = document.getElementById('rangeText');
const copyButton = document.getElementById('copyButton');
const generateButton = document.getElementById('genButton');
const includeUppers = document.getElementById('includeUppers');
const includeLowers = document.getElementById('includeLowers');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');

const uppersArray = genCharArray(65, 90);
const lowersArray = genCharArray(97, 122);
const numbersArray = genCharArray(48, 57);
const symbolsArray = ['!', '@', '$', '&', '?', '~', '%', '?', '*', '+', '-', '^'];

let mixCharArray = [];

rangeSelector.addEventListener('input', () => {
    rangeText.textContent = rangeSelector.value;
});

copyButton.addEventListener('click', () => {
    result.select();
    result.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert(`Copied "${result.value}" to your clipboard!`);
});

generateButton.addEventListener('click', genPassword);

function genCharArray(start, end) {
    const numberArray = Array(end - start + 1).fill().map((_, idx) => start + idx);
    const charSetArray = String.fromCharCode(...numberArray).split("");
    return charSetArray;
}

function genRandChar(array){
    const idx = Math.floor(Math.random() * array.length);
    return array[idx];
}

function genMixCharArray(){
    
    const uprChecked = includeUppers.checked;
    const lowChecked = includeLowers.checked;
    const numChecked = includeNumbers.checked;
    const symChecked = includeSymbols.checked;

    mixCharArray = [];

    if (uprChecked){
        mixCharArray.push(...uppersArray);
    }

    if (lowChecked) {
        mixCharArray.push(...lowersArray);
    }

    if (numChecked) {
        mixCharArray.push(...numbersArray);
    }

    if (symChecked) {
        mixCharArray.push(...symbolsArray);
    }
}

function genPassword(){
    try {
        const passLength = parseInt(rangeSelector.value);
        let password = '';

        genMixCharArray()

        if ( mixCharArray.length === 0 ) {
            result.value = '';

        } else {
            for (let i = 0; i < passLength; i++) {
                const character = genRandChar(mixCharArray);
                password += character;
            }
            result.value = password;
        }
        
    } catch (err) {
        result.value = "😰 Ouch that's an error";
        result.style.color = 'red';
    }
}
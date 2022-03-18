const results = document.getElementById('result');
const rangeSelector = document.getElementById('rangeSelector');
const rangeValue = document.getElementById('rangeText');
const copyBtn = document.getElementById('copyButton');
const generateBtn = document.getElementById('genButton');
const includeUppers = document.getElementById('includeUppers');
const includeLowers = document.getElementById('includeLowers');
const includeSymbols = document.getElementById('includeSymbols');
const includeNumbers = document.getElementById('includeNumbers');

const uppers = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const lowers = ['a', 'b', 'c', 'd', 'e', 'f','g', 'h', 'i', 'j', 'k', 'l','m', 'n', 'o', 'p', 'q', 'r','s', 't', 'u', 'v', 'w', 'x','y', 'z'];
const symbols = ['!', '@', '$', '&', '?', '~', '%', '?', '*', '+', '-', '^'];
const numbers = [1,2,3,4,5,6,7,8,9,0];

function generateAssets() {

    let assets = [];
    
    if (includeUppers.checked) {
        assets.push(...uppers)
    }
    
    if (includeLowers.checked) {
        assets.push(...lowers)
    }
    
    if (includeSymbols.checked) {
        assets.push(...symbols)
    }
    
    if (includeNumbers.checked) {
        assets.push(...numbers)
    }

    return assets;
};

function generateRandomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength )
}

function generatePassword() {
    let finalPassword = [];
    const assetsArray = generateAssets();
    
    for (let i = 0; i < rangeSelector.value; i++) {
        const idx = generateRandomIndex(assetsArray.length);
        finalPassword.push(assetsArray[idx]);
    }

    results.value = finalPassword.join("");
}

function updateRangeValue() {
    rangeValue.textContent = rangeSelector.value;
}

async function copyToClipBoard(){
    try {
        await navigator.clipboard.writeText(results.value);
        alert("Password Copied to clipboard!");
    } catch (err) {
        console.log("err");
    }
}

copyBtn.addEventListener('click', copyToClipBoard);
rangeSelector.addEventListener("input", updateRangeValue);
generateBtn.addEventListener("click", generatePassword);
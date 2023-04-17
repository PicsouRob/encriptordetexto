window.addEventListener('DOMContentLoaded', (event) => {
    var encrypt = document.querySelector('#encrypt');
    var decrypt = document.querySelector('#decrypt');
    var input = document.querySelector('#input');
    var result = document.querySelector('.right');
    
    var inputValue = '';
    const btn = document.createElement('button');
    
    encrypt.addEventListener("click", encryptText);
    decrypt.addEventListener('click', decryptText);
    btn.addEventListener('click', copyText);
    
    input.addEventListener('change', function () {
        inputValue = input.value.toLowerCase();
    });
    
    const fragment = document.createDocumentFragment();
    
    const img = document.createElement('img');
    img.src = 'Muñeco.png';
    img.className = 'right-img';
    
    const h1 = document.createElement('h1');
    h1.textContent = 'Ningún mensaje fue encontrado';
    h1.className = 'right-title';
    
    const p = document.createElement('p');
    p.textContent = 'Ingresa el texto que desees encriptar o desencriptar.';
    p.className = 'right-text';
    
    fragment.appendChild(img);
    fragment.appendChild(h1);
    fragment.appendChild(p);
    
    result.appendChild(fragment);
    
    const resultText = document.createElement('p');
    const div = document.createElement('div');
    let isEncrypt = false;
    let isDecrypt = false;
    const lettersToEncrypt = [ 'e', 'i', 'a', 'o', 'u' ];
    const LettersEncryptValue = [ 'enter', 'imes', 'ai', 'ober', 'ufat' ];
    let outputText = '';
    var textToCopy = '';
    let numberOfEncrypt = 0;

    function encryptText() {
        isDecrypt = false;
        if (inputValue) {
            if (numberOfEncrypt === 0) {
                result.removeChild(img);
                result.removeChild(h1);
                result.removeChild(p);
                numberOfEncrypt = 1;
            }
            result.style.display = 'grid';
            btn.style.width = '100%';
            
            div.className = 'result';
            
            btn.textContent = 'Copiar';
            btn.className = 'copy';
            
            div.appendChild(resultText);
            div.appendChild(btn);
        }
        isEncrypt = true;
        
        let inputValueArray = inputValue.split("");
        
        for (let i = 0; i <= inputValueArray.length - 1; i++) {
            lettersToEncrypt.forEach((val, ind) => {
                let position = inputValueArray.indexOf(val);
                inputValueArray[ position ] = LettersEncryptValue[ ind ];
                outputText = inputValueArray.join("");
            });
        }
        
        resultText.innerHTML = outputText;
        textToCopy = outputText;
        
        inputValue.length > 0 ? result.appendChild(div) : alert("Tiene que encriptar un texto para poder descriptarlo!");
    }
    
    function decryptText() {
        if (outputText) {
            isDecrypt = true;
            isEncrypt = false;
            var decryptedText = outputText;
            
            for (let k = 0; k <= outputText.length - 1; k++) {
                for (let i = 0; i <= LettersEncryptValue.length - 1; i++) {
                    var regex = LettersEncryptValue[i];
                    decryptedText = decryptedText.replace(regex, lettersToEncrypt[i]);
                }
            }
            
            resultText.innerHTML = decryptedText;
            textToCopy = decryptedText;
        } else {
            alert("Tiene que ingresar un texto para poder descriptarlo!");
        }
    }
    
    async function copyText() {
        await navigator.clipboard.writeText(textToCopy);
    }
});
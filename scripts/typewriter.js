let i = 0;
let randString = "";
let randSymbol = ">>/: ";

let symbolsArray = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "!",
    "?",
    "£",
    "&",
    "*",
    "-",
    "_",
    "+",
    "=",
    ":",
    ">",
    "<",
    "$",
    "/",
    "%",
    "#",
    "±",
    "≠",
];

function reset(text) {
    txt = txt.slice(0, 4);
    return txt;
}

function changeText(text, label) {
    reset(text);
    return (txt += ` ${label}`);
}

function wrapper(original, callback) {
    original;
    callback;
}

function typeWriter() {
    document.querySelector(".resolve").style.animationPlayState = "running";
    document.querySelector(".resolve").textContent += randSymbol;

    setTimeout(() => wrapper(randSelect(32), typeRandomiser()), 2500);
}

function generator(arrayList) {
    return arrayList[Math.floor(Math.random() * arrayList.length)];
}

function randSelect(num) {
    if (num > 0) {
        randString += generator(symbolsArray);
        randSelect(num - 1);
    }
}

function updateRandSymbol(character) {
    randSymbol += character.slice(-1);
}

function typeRandomiser() {
    let isComplete = false;

    if (i < randString.length && isComplete == false) {
        document.querySelector(".resolve").textContent =
            randSymbol +
            randString.charAt(i) +
            randString.charAt(i - 1) +
            randString.charAt(i - 2) +
            randString.charAt(i - 3) +
            randString.charAt(i - 4) +
            randString.charAt(i - 5) +
            randString.charAt(i - 6) +
            randString.charAt(i - 7) +
            randString.charAt(i - 8) +
            randString.charAt(i - 9) +
            randString.charAt(i - 10) +
            randString.charAt(i - 11) +
            randString.charAt(i - 12) +
            randString.charAt(i - 13) +
            randString.charAt(i - 14) +
            randString.charAt(i - 15) +
            randString.charAt(i - 16) +
            randString.charAt(i - 17) +
            randString.charAt(i - 18) +
            randString.charAt(i - 19);
        i++;
        setTimeout(typeRandomiser, 40);
    } else {
        document.querySelector(".resolve").textContent += randSymbol;
        isComplete = true;
        i = 0;
        lockedIn("RE: Holographics_on");
    }
}

function lockedIn(letter) {
    document.querySelector(".resolve").textContent = randSymbol;
    document.querySelector(".resolve").textContent += letter;
    randSymbol = document.querySelector(".resolve").textContent;
}

document.addEventListener("DOMContentLoaded", typeWriter);
window.addEventListener("orientationchange", function () {
    window.location.reload(true);
});

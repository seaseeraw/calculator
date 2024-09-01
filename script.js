let topResult = "";
let bottomResult = "";


// Calculate all values
const calculateValue = (operationString) => {
    try {
        if (operationString === "") {
            result = "0";
        } else {
            result = eval(operationString);
        }
    } catch (e) {
        result = "0";
    }
    return result;
};

// get all buttons for calculator
const allButtons = document.querySelectorAll(".btn");
const operatorList = ["/", "x", "*", "-", "+", "=", "%"];
const numberList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const specialCharacterList = [".", "Enter"];

// Add click event for all buttons
allButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        addToDisplay(btn.innerText);
    });
});

// 10.10+100 -> 100
// 90 -> 90
// 10+20+30 -> 30
// 90+100+80+70/100 -> 100
function getLastNumber(numInput) {
    let highestIndex = {
        index: 0,
        symbol: ",",
    };
    // ["/", "x", "*", "-", "+", "=", "%"];

    for (operator of operatorList) {
        operatorIndex = numInput.lastIndexOf(operator);
        if (operatorIndex > highestIndex.index) {
            highestIndex.index = operatorIndex;
            highestIndex.symbol = operator;
        }
    }
    //['90+100+80+70','100']

    numInputArray = numInput.split(highestIndex.symbol);
    console.log(numInputArray);
    return numInputArray[numInputArray.length - 1];
}

function allowDot(numInput) {
    let lastExpression = getLastNumber(numInput);
    console.log(lastExpression);
    if (lastExpression.includes(".")) {
        return false;
    } else {
        return true;
    }
}

// Add to top-display
const addToDisplay = (str) => {
    const topDisplay = document.querySelector(".top-display");
    const bottomDisplay = document.querySelector(".bottom-display");

    switch (str.toLowerCase()) {
        case "c":
            topResult = "";
            break;
        case "del":
            topResult = topResult.substr(0, topResult.length - 1);
            break;
        case "%":
        case "/":
        case "x":
        case "-":
        case "+":
        case "*":
            if (topResult.length > 0) {
                if (str == "x") {
                    str = "*";
                }
                topResult = topResult + str;
            }
            break;
        case "=":
        case "enter":
            break;
        case ".":
            if (allowDot(topResult)) {
                topResult = topResult + str;
            }
            break;
        default:
            topResult = topResult + str;
            break;
    }

    // Top Value
    topDisplay.innerText = topResult;

    // Evaulate value
    bottomResult = calculateValue(topResult);
    bottomDisplay.innerText = bottomResult;

    if (bottomDisplay.innerText == "420") {
        cheerAudio.play();
    }
};

document.addEventListener("keydown", (event) => {
    if (event.key == "Backspace") {
        addToDisplay("DEL");
    } else if (event.key == "Enter") {
        addToDisplay("Enter");
    } else if (
        operatorList.includes(event.key) ||
        specialCharacterList.includes(event.key)
    ) {
        addToDisplay(event.key);
    } else if (numberList.includes(parseInt(event.key))) {
        addToDisplay(event.key);
    }
});
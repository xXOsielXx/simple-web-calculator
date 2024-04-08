let num1;
let operator;
let num2;

function resetVars() {
	num1 = ""
	operator = ""
	num2 = ""
};

resetVars();

function operate(
	num1, 
	operator, 
	num2
) {
	let result;

	switch(operator) {
		case "+":
			result = num1 + num2;
			break;
		case "-":
			result = num1 - num2;
			break;
		case "x":
			result = num1 * num2;
			break;
		case "÷":
			result = num1 / num2;
			break
	};

	return result;
};

const panel = document.querySelector("#panel span")

function displayPanelContent() {
	panel.textContent = num1 + operator + num2;
};

let symbols = ["+", "-", "x", "÷"];

function checkForSymbols(scope) {
	return symbols.some(symbol => {
		if (scope=="lastChar") {
			return panel.textContent.charAt(
				panel.textContent.length - 1) == symbol;
		}
		else {
			return panel.textContent.includes(symbol);
		}
	});
};

let currentNumber = "first";

const numbers = document.querySelectorAll(".number");

numbers.forEach(e => {
	e.addEventListener("click", () => {
		if (!panel.textContent.includes("e")) {
			if (currentNumber=="second") {
				num2 += e.textContent;
			}
			else {
				num1 += e.textContent;
				currentNumber = "first";
			}
			displayPanelContent();
		}
	})
});

function displayDot() {
	if (
		currentNumber=="first" && 
		num1 &&
		!num1.includes(".")
		) {
		num1 += ".";
	}
	else if (
		currentNumber=="second" && 
		num2 &&
		!num2.includes(".")
		) {
		num2 += ".";
	}
	displayPanelContent();
}

const dotBtn = document.querySelector("#dot-btn");

dotBtn.addEventListener("click", displayDot);

const operators = document.querySelectorAll(".operator");

operators.forEach(e => {
	e.addEventListener("click", () => {
		if (!panel.textContent.includes("e") && 
			!checkForSymbols("lastChar")
			) {
			if (num2) {
				displayResult()
			}
			else if (panel.textContent) {
				operator = e.textContent;
				currentNumber = "second";
			}
			else {
				num1 += e.textContent;
			}

			displayPanelContent();
		}
	})
});

const resetBtn = document.querySelector("#reset-btn");

resetBtn.addEventListener("click", () => {
	resetVars();
	panel.textContent = "";
});

function deleteChar() {
	if (panel.textContent=="Infinity") {
		resetVars();
	}
	else if (currentNumber=="first") {
		num1 = num1.slice(0, -1);
	}
	else if(currentNumber=="second" && num2) {
		num2 = num2.slice(0, -1);
	}
	else {
		operator = operator.slice(0, -1);
		currentNumber = "first";
	}
	displayPanelContent();
}

const deleteBtn = document.querySelector("#delete-btn");

deleteBtn.addEventListener("click", deleteChar);

const equalBtn = document.querySelector("#equal-btn");

function displayResult() {
	let result = operate(parseFloat(num1), operator, parseFloat(num2));
	if (!Number.isInteger(result)) {
		result = result.toFixed(2);
	}
	panel.textContent = result;
	num1 = String(result);
	operator = "";
	num2 = "";
	currentNumber = "first";
};

equalBtn.addEventListener("click", () => {
	if (!panel.textContent.includes("e") && num2) {
	  displayResult();
	}
});

document.addEventListener("keydown", e => {
	let key = e.key;

	let isOperator;

	if(key == "Backspace") {
		deleteChar();
	}
	else if (!panel.textContent.includes("e")) {
		for (let i in symbols) {
			if (key == symbols[i]) {
				isOperator = true;
			}
		};

		if (isOperator ||
			key == "/" ||
			key == "*"
			) {
			if (!panel.textContent) {
				if (key == "+" ||
					key == "-"
					) {
					num1 += key;
				}
			}
			else {
				if (isOperator) {
					operator = key;
				}
				else if(key == "/") {
					operator = "÷";
				}
				else if(key == "*") {
					operator = "x";
				}

				if (num2) {
					displayResult();
				}
				else {
					currentNumber = "second";
				}
			}
		}
		else if(key == "=" || 
			key == "Enter"
			) {
			if (!panel.textContent.includes("e") && num2) {
	  			displayResult();
			}
		}
		else if(key == ".") {
			displayDot();
		}
		else if (!isNaN(key)) {
			if (currentNumber=="second") {
				num2 += key;
			}
			else {
				num1 += key;
			}
		}
	}

	displayPanelContent();
});
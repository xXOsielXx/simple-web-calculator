let num1;
let operator;
let num2;

resetVars();

const panel = document.querySelector("#panel span")
let symbols = ["+", "-", "x", "÷"];
let currentNumber = "first";

// Reset button

const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", () => {
	resetVars();
	panel.textContent = "";
});

// Delete button

const deleteBtn = document.querySelector("#delete-btn");
deleteBtn.addEventListener("click", deleteChar);

// Numbers

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

// Dot button

const dotBtn = document.querySelector("#dot-btn");
dotBtn.addEventListener("click", displayDot);

// Operators

const operators = document.querySelectorAll(".operator");
operators.forEach(e => {
	e.addEventListener("click", () => {
		if (!panel.textContent.includes("e") && 
			!checkForSymbols("lastChar")
			) {
			if (num2) {
				displayResult();
				operator = e.textContent;
				currentNumber = "second";
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

// Equal button

const equalBtn = document.querySelector("#equal-btn");
equalBtn.addEventListener("click", () => {
	if (!panel.textContent.includes("e") && num2) {
	  displayResult(true);
	}
});

// Keyboard

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
			else if(!checkForSymbols("lastChar")) {
				if (num2) {
					displayResult();
					operator = key;
				}
				if (isOperator) {
					operator = key;
				}
				else if(key == "/") {
					operator = "÷";
				}
				else if(key == "*") {
					operator = "x";
				}
				currentNumber = "second";
			}
		}
		else if(key == "=" || 
			key == "Enter"
			) {
			if (!panel.textContent.includes("e") && num2) {
	  			displayResult(true);
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

// Functions

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

function resetVars() {
	num1 = ""
	operator = ""
	num2 = ""
};

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

function displayResult(resetOperator) {
	let result = operate(parseFloat(num1), operator, parseFloat(num2));
	if (!Number.isInteger(result)) {
		result = result.toFixed(2);
	}
	panel.textContent = result;
	num1 = String(result);
	if (resetOperator) {
		operator = "";
	}
	num2 = "";
	currentNumber = "first";
};

function displayPanelContent() {
	panel.textContent = num1 + operator + num2;
};
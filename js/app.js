const inputBillAmount = document.querySelector("#billAmount");
const inputCashGiven = document.querySelector("#cash-given");
const noOfNotes = document.querySelectorAll(".noNotes");
const amount = document.querySelectorAll(".amount");
const table = document.querySelector("#table");

var showMsg = document.querySelector("#showBox");

const enter = document.querySelector("#enter");

//table.classList.add("tb-hide")
const noteArray = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

function processCash(bill, cashProvided) {
	clearPreviewData();
	var returnAmt = cashProvided - bill;

	showMsg.innerText = `Cash to Return: ${returnAmt}`;

	table.classList.remove("tb-hide");

	for (let i = 0; i < noteArray.length; i++) {
		returnAmt = compare(returnAmt, noteArray[i], i);
	}
}

// processing return amount with array of notes
function compare(remainderAmt, noteAmt, index) {
	var noOfNotesPosition = noOfNotes[index];
	var amountPosition = amount[index];

	noOfNotesPosition.style.fontWeight = "normal";
	amountPosition.style.fontWeight = "normal";

	if (remainderAmt >= noteAmt) {
		let notes = Math.floor(remainderAmt / noteAmt);
		remainderAmt = remainderAmt - notes * noteAmt;

		noOfNotesPosition.innerText = `${notes}`;
		noOfNotesPosition.style.fontWeight = "bold";
		amountPosition.style.fontWeight = "bold";
	}
	return remainderAmt;
}
//to show messages
function showMessage(text) {
	showMsg.innerText = text;
	table.classList.add("tb-show");
}

// to clear notes if page is not refreshed
function clearPreviewData() {
	for (let notes of noOfNotes) {
		notes.innerText = "0";
	}
}

function cashHandler() {
	let billAmount = Number(inputBillAmount.value);
	let cashGiven = Number(inputCashGiven.value);
	if ((billAmount == "") | (cashGiven == "")) {
		showMessage("Please enter amount");
	} else if (billAmount > cashGiven) {
		console.log(billAmount, cashGiven);
		showMessage("Oops!Do you want to wash plates?");
	} else if (billAmount == cashGiven) {
		showMessage("No cash to return");
	} else {
		processCash(billAmount, cashGiven);
	}
}

enter.addEventListener("click", cashHandler);

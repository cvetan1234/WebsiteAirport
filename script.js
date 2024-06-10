var cities = ['London', 'Paris', 'Istanbul', 'Moscow', 'Madrid', 'Barcelona', 'Rome', 'Frankfurt', 'Amsterdam', 'Munich', 'Los Angeles', 'Manchester', 'Lisbon', 'Zurich', 'Vienna', 'Berlin', 'Athens', 'Dusseldorf', 'Stockholm', 'Oslo', 'Helsinki', 'Warsaw', 'Copenhagen', 'Dubai', 'Edinburgh', 'Nice', 'Helsinki', 'Milan', 'Barcelona', 'Edinburgh', 'Ankara',];

var currentNumber = 1;

// Generate the background:
(function generateCircles(){
	var numCircles = 50; 
	var circleSize = 1.3; 

	for (var i = 0; i < numCircles; i++) {
		var circle = document.createElement('div');
		circle.className = 'circle';
		circle.style.backgroundColor = '#FFFFFF'; 
		
		// Generate random numbers for position and size of the circles
		var randomX = Math.floor(Math.random() * (9.5/10*document.body.clientWidth));
		var randomY = Math.floor(Math.random() * (9.5/10*document.body.clientHeight));
		var randomSize = Math.floor(Math.random() * 10) + 1;
		
		circle.style.left = randomX + 'px';
		circle.style.top = randomY + 'px';
		circle.style.width = circleSize*randomSize + 'vw';
		circle.style.height = circleSize*randomSize + 'vw';

		document.body.appendChild(circle);
	}
})();

function sortTable(columnIndex) {
	var table, rows, switching, i, x, y, shouldSwitch;
	table = document.getElementById("tbl");
	switching = true;

	while (switching) {
		switching = false;
		rows = table.rows;

		for (i = 1; i < rows.length - 1; i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("td")[columnIndex];
			y = rows[i + 1].getElementsByTagName("td")[columnIndex];
	  
			if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
				shouldSwitch = true;
				break;
			}
		}

		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
		}
	}
}

function createCell(text){
	c = document.createElement('td');
	t = document.createTextNode(text);
	c.append(t)
	return c
}

function generateRandomTime(startHour, endHour, startMinute, endMinute) {
	// Generate a random time in the specified range
	var randomHour = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
	var randomMinute = Math.floor(Math.random() * (endMinute - startMinute + 1)) + startMinute;
	
	// Format the hour and minute values
	var formattedHour = ('0' + randomHour).slice(-2);
	var formattedMinute = ('0' + randomMinute).slice(-2);

	return formattedHour + ':' + formattedMinute;
}

// Get a random option from the provided array:
function getRandomOption(options) {
	var randomIndex = Math.floor(Math.random() * options.length);
	return options[randomIndex];
}

function createRow(num, a, b, c, d, e) {
	let t = document.querySelector('#tbl');

	let r =  document.createElement('tr');
	
	c0 = createCell(num);
	c1 = createCell(a);
	c2 = createCell(b);
	c3 = createCell(c);
	c4 = createCell(d);	
	c5 = createCell(e);	
	
	
	r.append(c0);
	r.append(c1);
	r.append(c2);
	r.append(c3);
	r.append(c4);
	r.append(c5);
	
	t.append(r);
}

function addToTable() {

	text1 = document.getElementById('inputTime')
	text2 = document.getElementById('inputAD')
	text3 = document.getElementById('inputDest')
	text4 = document.getElementById('inputDur')
	text5 = document.getElementById('inputAirplane')
	
	if (text1.value && text2.value && text3.value && text4.value && text5.value){
		createRow(currentNumber, text1.value, ''+text2.value, ''+text3.value, ''+text4.value, ''+text5.value);
		text1.value = ''
		text2.value = ''
		text3.value = ''
		text4.value = ''
		text5.value = ''
		currentNumber++;
	}
	calculateAverages();
}

function deleteRow() {
	var inputDelete = document.getElementById("inputDelete");
	var rowToDelete = parseInt(inputDelete.value);

	var table = document.getElementById("tbl");
	var rowCount = table.rows.length;

	if (rowToDelete > 0 && rowToDelete < rowCount) {
		table.deleteRow(rowToDelete);
		currentNumber -= 1
		updateRowNumbers();
		calculateAverages(); // Recalculate the averages
	} else {
		alert("Invalid row number. Please enter a valid row number.");
	}
}

function deleteFirstNRows() {
	var inputDelete = document.getElementById("inputDelete");
	var rowsToDelete = parseInt(inputDelete.value);

	var table = document.getElementById("tbl");
	var rowCount = table.rows.length;

	if (rowsToDelete > 0 && rowsToDelete < rowCount) {
	for (var i = 0; i < rowsToDelete; i++) {
		table.deleteRow(1);
		currentNumber -= 1;
	}
		updateRowNumbers();
		calculateAverages(); // Recalculate the averages
	} else {
		alert("Invalid number of rows. Please enter a valid number.");
	}
}

function updateRowNumbers() {
	var table = document.getElementById("tbl");
	var rows = table.rows;

	for (var i = 1; i < rows.length; i++) {
		rows[i].cells[0].innerHTML = i; 
	}
}

function randomRows() {
	
	var numRows = parseInt(document.getElementById('inputNumRandomRows').value);
	
	if (0 < numRows && numRows < 251){
		for (var i = 0; i < numRows; i++) {
			// Generate random values in the specified ranges
			var randomHour = generateRandomTime(5, 22, 0, 59);
			var randomDur = generateRandomTime(1, 5, 0, 59);
			var randomArrDep = getRandomOption(["Arrival", "Departure"]);
			var randomAirplane = getRandomOption(["Airbus A320", "Airbus A350", "Boeing 737", "Boeing 777"]);
			var randomCity = getRandomOption(cities);

			createRow(currentNumber, randomHour, randomArrDep, randomCity, randomDur, randomAirplane);
			currentNumber++;
			calculateAverages();
		}
	}else{
		alert("Invalid number. Please enter a number between 1 and 250.");
	}
}

function calculateAverages() {
	var table = document.getElementById("tbl");
	var rows = table.rows;
	var totalDuration = 0;
	var rowCount = rows.length - 1; // Subtracting 1 to exclude the header row

	var earliestTime = Infinity; // Set the initial earliest time to a large value
	var latestTime = -Infinity; // Set the initial latest time to a small value
	
	var airplaneTypes = {};

	// Loop through the rows, excluding the header row
	for (var i = 1; i < rows.length; i++) {
		var durationCell = rows[i].getElementsByTagName("td")[4];
		var duration = durationCell.innerText;
		
		// Convert the duration from 'hh:mm' format to minutes
		var durationParts = duration.split(":");
		var durationMinutes = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
		totalDuration += durationMinutes;

		var timeCell = rows[i].getElementsByTagName("td")[1];
		var time = timeCell.innerText;
		
		// Compare the time with the earliest and latest values
		var currentTime = new Date('2000-01-01T' + time + ':00');
		if (currentTime < earliestTime) {
			earliestTime = currentTime;
		}
		if (currentTime > latestTime) {
			latestTime = currentTime;
		}
		
		var airplaneCell = rows[i].getElementsByTagName("td")[5];
		var airplaneType = airplaneCell.innerText;
		
		// Count the occurrences of each airplane type
		if (airplaneTypes[airplaneType]) {
			airplaneTypes[airplaneType]++;
		} else {
			airplaneTypes[airplaneType] = 1;
		}
	}

	// Calculate the average duration
	var averageDuration = totalDuration / rowCount;
	
	var mostFrequentAirplaneType = '';
	var maxCount = 0;
	for (var type in airplaneTypes) {
		if (airplaneTypes[type] > maxCount) {
			mostFrequentAirplaneType = type;
			maxCount = airplaneTypes[type];
		}
	}

	// Display the result in the last div element at the bottom of the website
	var para1 = document.getElementById("paragraph1");
	var para2 = document.getElementById("paragraph2");
	var para3 = document.getElementById("paragraph3");
	var para4 = document.getElementById("paragraph4");
	para1.textContent = "Average duration: " + Math.floor(averageDuration / 60) + " hours and " + (averageDuration % 60).toFixed(0) + " minutes";
	para2.textContent = "Earliest time: " + earliestTime.getHours().toString().padStart(2, '0') + ":" + earliestTime.getMinutes().toString().padStart(2, '0');
	para3.textContent = "Latest time: " + latestTime.getHours().toString().padStart(2, '0') + ":" + latestTime.getMinutes().toString().padStart(2, '0');
	para4.textContent = "Most frequent airplane type: " + mostFrequentAirplaneType;
}

function openPrintView() {
	const originalTable = document.getElementById("tbl");

	// Clone the table
	const clonedTable = originalTable.cloneNode(true);

	// Create a new window
	const printWindow = window.open('', '_blank');
	const printDocument = printWindow.document;
		
	const style = printDocument.createElement("style");
	style.textContent = `
		body {
			background-color: #a6dced;
			font-family: 'Tahoma';font-size: 22px;
		}
		table, td, th{
			border: 1px solid black;
			border-collapse: collapse;
			table-layout: fixed;
			width: 9.5vw;
			margin: 2vh 0;
			font-size: 1.2vw;
			background-color: #FFD580;
			text-align: center;
		}

		th{
			padding: 1vw;
		}

		th:first-child, td:first-child {
			width: 2vw;
		}
		
		.container{
			display: flex;
			background-color: #a6dced;
			justify-content: center;
		}

		h1{
			position: relative;
			text-align: center;
			font-size: 2vw;
		}
	
	`;
	
	// Create a div element to wrap the cloned table
	const tableContainer = printDocument.createElement("div");
	tableContainer.classList.add("container");
	tableContainer.appendChild(clonedTable);

	// Create a div element to wrap the title 
	const titleContainer = printDocument.createElement("div");
	titleContainer.classList.add("title-container");

	// Create a title element
	const titleElement = printDocument.createElement("h1");
	titleElement.textContent = "Airport";

	titleContainer.appendChild(titleElement);
	
	printDocument.head.appendChild(style);
	printDocument.body.appendChild(titleContainer);
	printDocument.body.appendChild(tableContainer);
	
	// Open the print window
	printWindow.print();
}
function idSubjects(){
	entireSubjectList = [];
	stationeryEndPos = [];
	stationeryList = [];
	quantityList = [];
	if (typeof(Storage) !== "undefined") {
		var selectedSubjects = $("input:checkbox:checked").map(function () {
			return this.id;
		}).get();
		getSubjects(selectedSubjects);
	}
	else {
		alert("Unfortunately your browser is too old to support making a list. Try again on a more modern device");
	}
}

function getSubjects(levelSubject){
	var tempYearSubject = levelSubject.join().split('*');
	var yearSubject = tempYearSubject.join().split(',');
	var year = [];
	var subject = [];

	for (var i = 0; i < yearSubject.length; i++) {
		if ((i % 2) == 0) {
			year.push(yearSubject[i]);
		}
		else {
			subject.push(yearSubject[i]);
		}
	}

	let difYearLevels = [...new Set(year)];
	var firstSubjectPos = 0;
	localStorage["difYearLevels"] = JSON.stringify(difYearLevels);

	var yearEndPos = []; // Number of subjects per year

	for (var i = 0; i < difYearLevels.length; i++) {
		var lastSubjectPos = year.lastIndexOf(difYearLevels[i]);
		yearEndPos.push(lastSubjectPos);
		var curSubjectList = [];

		for (var j = firstSubjectPos; j <= lastSubjectPos; j++) {
			curSubjectList.push(subject[j]);
		}
		firstSubjectPos = lastSubjectPos + 1;

        (function(i){
            $.ajax({
                type: "GET",
                url: "https://3mirvine.github.io/stationery/Year" + difYearLevels[i] + ".csv",
                async: false,
                dataType: "text",
                success: function(data) {findItems(data, curSubjectList);}, 
            })
        }) (i);
    }
    localStorage["yearEndPos"] = JSON.stringify(yearEndPos); //number of subjects
    localStorage["stationeryEndPos"] = JSON.stringify(stationeryEndPos);
    localStorage["stationeryList"] = JSON.stringify(stationeryList);
    localStorage["quantityList"] = JSON.stringify(quantityList); // var quantityList = JSON.parse(localStorage["quantityList"])
    localStorage["entireSubjectList"] = JSON.stringify(entireSubjectList);
} 

function findItems(allText, subjectList){
	var allTextLines = allText.split(/\r\n|\n/);
	var subjects = allTextLines[0].split(',');

	for (var i = 0; i < subjectList.length; i++) {
		var curSubjectIndex = subjects.indexOf(subjectList[i]);
		entireSubjectList.push(subjectList[i]);
		for (var j = 1; j < allTextLines.length; j++) {
			var tempLine = allTextLines[j].split(',')[curSubjectIndex];
			if (tempLine){
				quantityList.push(tempLine.split('x')[0]);
				stationeryList.push(tempLine.split('x')[1]);
			}
			else {
				j = allTextLines.length;
			}
		}
		stationeryEndPos.push(stationeryList.length);
	}
	// console.log(stationeryList.length);
	// for (var i = 0; i < stationeryList.length; i++) {
	// 	console.log("You need: " + quantityList[i] + " " + stationeryList[i]);
	// }
}

function getPrices(allText){
	var allTextLines = allText.split(/\r\n|\n/);
	var stationeryList = JSON.parse(localStorage["stationeryList"]);
	var priceList = [];

	for (var i = 0; i < stationeryList.length; i++) {
		for (var j = 0; j < allTextLines.length; j++) {
			if (allTextLines[j].split(',')[0] == stationeryList[i]) {
				priceList.push(allTextLines[j].split(',')[1]);
			}
		}
	}
	localStorage["priceList"] = JSON.stringify(priceList);
	displayItems();
}

function displayItems(){
	var difYearLevels = JSON.parse(localStorage["difYearLevels"]);
	var yearEndPos = JSON.parse(localStorage["yearEndPos"]); // start of next year
    var stationeryEndPos = JSON.parse(localStorage["stationeryEndPos"]); // Start of next subject
    var stationeryList = JSON.parse(localStorage["stationeryList"]);
	var quantityList = JSON.parse(localStorage["quantityList"]);
	var entireSubjectList = JSON.parse(localStorage["entireSubjectList"]);
	var priceList = JSON.parse(localStorage["priceList"]);
	var div = document.getElementById("stationeryItems");
	var yearPos = 1;
	var subjectPos = 0;
	var stationeryPos = 0;

	for (var i = 0; i < difYearLevels.length; i++) { // For each year
			var yearHeader = document.createElement("h1"); // Create Year heading
			//yearHeader.id = "year" + difYearLevels[i] + "Header";
			yearHeader.innerHTML = "Year " + difYearLevels[i];
			div.appendChild(yearHeader);

		for (var j = subjectPos; j <= yearEndPos[i]; j++) { // For each subject
			var subjectUl = document.createElement("ul");
			subjectUl.className = "subjectUl";
			div.appendChild(subjectUl);
			var subjectHeader = document.createElement("h2");
			//subjectHeader.id = difYearLevels[i] + entireSubjectList[j];
			subjectHeader.innerHTML = entireSubjectList[j];
			subjectUl.appendChild(subjectHeader);

			for (var k = stationeryPos; k < stationeryEndPos[j]; k++) { // for each stationery item
				var li = document.createElement("li");
				li.className = "stationeryTile";
				subjectUl.appendChild(li);
				var img = document.createElement("img");
				//img.id = difYearLevels[i] + entireSubjectList[j] + stationeryList[k] + "image";
				img.src = "tempIMG.svg";
				img.width = "170";
				img.height = img.width;
				li.appendChild(img);
				var p = document.createElement("p");
				//p.id = difYearLevels[i] + entireSubjectList[j] + stationeryList[k];
				p.innerHTML = quantityList[k] + " x " + stationeryList[k];
				p.className = "stationeryName";
				li.appendChild(p);
				p = document.createElement("p");
				p.innerHTML = "Total Cost: $" + (priceList[k] * quantityList[k]).toFixed(2);
				p.className = "stationeryPrice";
				li.appendChild(p);
			}
			stationeryPos = stationeryEndPos[j];
		}
		subjectPos = yearEndPos[i] + 1;
	}
}

function homeItems(allText){
	var allTextLines = allText.split(/\r\n|\n/);
	var itemIndex = [];
	var numItems = 6;
	var numRows = 2;
	var numCols = 3;
	var div = document.getElementById("recommended-items");
	var randomItem = 0;

	for (var i = 0; i < allTextLines.length; i++) {
		itemIndex.push(i);
	}

	for (var i = allTextLines.length; i > (allTextLines.length - numItems); i--) {
		if (((allTextLines.length - i) % numCols) == 0){
			var ul = document.createElement("ul");
			ul.className = "homeItemRows";
			div.appendChild(ul);
		}
		randomItem = Math.floor(Math.random() * i);
		itemIndex.splice(randomItem, 1);
		var li = document.createElement("li");
		li.className = "homeItems";
		ul.appendChild(li);
		var img = document.createElement("img");
		img.className = "homeItemImage";
		img.src = "tempIMG.svg";
		img.width = "170";
		img.height = img.width;
		li.appendChild(img);
		var p = document.createElement("p");
		p.innerHTML = allTextLines[randomItem].split(',')[0];
		p.className = "homeItemName";
		li.appendChild(p);
		p = document.createElement("p");
		p.innerHTML = "$" + allTextLines[randomItem].split(',')[1];
		p.className = "homeItemPrice";
		li.appendChild(p);
	}
}
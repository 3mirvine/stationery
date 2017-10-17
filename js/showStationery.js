function idSubjects(){
	stationeryEndPos = [];
	stationeryList = [];
	quantityList = [];
	if (typeof(Storage) !== "undefined") {
		var selectedSubjects = $("input:checkbox:checked").map(function () {
			return this.id;
		}).get();
		//localStorage["subjects"] = selectedSubjects;
		//alert(selectedSubjects);
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
    localStorage["quantityList"] = JSON.stringify(quantityList);
} 

function findItems(allText, subjectList){
	var allTextLines = allText.split(/\r\n|\n/);
	var subjects = allTextLines[0].split(',');

	for (var i = 0; i < subjectList.length; i++) {
		var curSubjectIndex = subjects.indexOf(subjectList[i]);
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
<<<<<<< HEAD:js/showStationery
	// console.log(stationeryList.length);
	// for (var i = 0; i < stationeryList.length; i++) {
	// 	console.log("You need: " + quantityList[i] + " " + stationeryList[i]);
	// }
}

function displayItems(){
	
}
=======
	console.log(stationeryList.length);
	for (var i = 0; i < stationeryList.length; i++) {
		console.log("You need: " + quantityList[i] + " " + stationeryList[i]);
	}
}
<<<<<<< HEAD:js/showStationery.js
>>>>>>> 4455f90dcb4deb796b8321a87f2005e706923033:js/showStationery.js
=======
>>>>>>> 4455f90dcb4deb796b8321a87f2005e706923033:js/showStationery.js

function openSubjectList() {
    for (var i = 9; i < 14; i++) {
       $.ajax({
        type: "GET",
        url: "https://3mirvine.github.io/stationery/Year" + i + ".csv",
        dataType: "text",
        success: function(data) {showSubjects(data, i);}
     }) 
    }
    
}

function showSubjects(allText, yearLevel) {
    var allTextLines = allText.split(/\r\n|\n/);
    var subjects = allTextLines[0].split(',');

    var div = document.getElementById("year" + yearLevel);
    for (var i = 0; i < subjects.length; i++) {
        var li = document.createElement("li");
        li.className = "subjects";
        div.appendChild(li);
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = subjects[i];
        checkbox.style = "margin-right: 10px";
        li.appendChild(checkbox);
        var label = document.createElement("label");
        label.htmlFor = subjects[i];
        label.appendChild(document.createTextNode(subjects[i]));
        li.appendChild(label);
    }
}

// var div = document.getElementById('year9')
//                 for (var i = 0; i < 6; i++) {
//                     var li = document.createElement("li");
//                     li.className = "subjects";
//                     div.appendChild(li);
//                     var checkbox = document.createElement('input');
//                     checkbox.type = "checkbox";
//                     checkbox.id = "Checkbox " + i;
//                     checkbox.style = "margin-right: 10px";
//                     li.appendChild(checkbox);
//                     var label = document.createElement('label');
//                     label.htmlFor = "Checkbox" + i;
//                     label.appendChild(document.createTextNode("Agriculture & Horticulture"));
//                     li.appendChild(label);  
//                 }
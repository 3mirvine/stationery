function openSubjectList() {
    for (var i = 9; i < 14; i++) {
        (function(i){
            $.ajax({
                type: "GET",
                url: "https://3mirvine.github.io/stationery/Lists/Year" + i + ".csv",
                dataType: "text",
                success: function(data) {showSubjects(data, i);} 
            })
        }) (i);
    }
    
}

function showSubjects(allText, yearLevel) {
    var allTextLines = allText.split(/\r\n|\n/);
    var subjects = allTextLines[0].split(',');
    var div = document.getElementById("year" + yearLevel);

    for (var i = 0; i < (subjects.length / 6); i++) {
        var ul = document.createElement("ul");
        ul.className = "subjectRows";
        ul.className += " subjectRow" + i;
        div.appendChild(ul)
        for (var j = (i * 6); j < ((i + 1) * 6); j++) {
            if (j >= subjects.length){
                return;
            }
            var li = document.createElement("li");
            li.className = "subjects";
            ul.appendChild(li);
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.style = "float:left"
            checkbox.id = yearLevel + '*' + subjects[j];
            li.appendChild(checkbox);
            var labelDiv = document.createElement("div");
            labelDiv.className = "checkboxLabel";
            li.appendChild(labelDiv);
            var label = document.createElement("label");
            label.htmlFor = yearLevel + '*' + subjects[j];
            label.style = "display:block";
            label.appendChild(document.createTextNode(subjects[j]));
            labelDiv.appendChild(label);
        }
    }
}
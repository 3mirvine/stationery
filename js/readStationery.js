function openSubjectList() {
    for (var i = 9; i < 14; i++) {
        (function(i){
            $.ajax({
                type: "GET",
                url: "https://3mirvine.github.io/stationery/Year" + i + ".csv",
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
        ul.id = "row" + i;
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
            checkbox.id = yearLevel + 'y' + subjects[j];
            checkbox.style = "margin-right: 10px";
            li.appendChild(checkbox);
            var label = document.createElement("label");
            label.htmlFor = subjects[j];
            label.appendChild(document.createTextNode(subjects[j]));
            li.appendChild(label);
        }
    }
}
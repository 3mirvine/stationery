function openList() {
    $.ajax({
        type: "GET",
        url: "https://3mirvine.github.io/stationery/Year9.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
};

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        console.log(data);
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(headers[j]+":"+data[j]);
            }
            lines.push(tarr);
        }
    }
     console.log(lines);
}

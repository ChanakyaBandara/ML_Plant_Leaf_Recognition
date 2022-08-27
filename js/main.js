var jsonData;

$.getJSON("./js/info.json", function (json) {
    jsonData = json;
});

$("form#fileForm").on("submit", function (e) {
    console.log(e)
    e.preventDefault();
    var formData = new FormData(this);
    console.log(formData)
    Spinner();
    Spinner.show();
    $.ajax({
        url: "PHP/backend.php",
        type: 'POST',
        data: formData,
        dataType: 'json',
        contentType: false,
        cache: false,
        processData: false,
    }).done(function (result) {
        Spinner.hide();
        console.log(result);
        processResult = processData(result.result);
        populateTable(processResult);
        //document.getElementById('test1').innerHTML = faction;
    })
});

function processData(result) {
    var selectedIndex;
    var selectedAccuracy = 0;
    var finalResult = [];
    result.forEach((accuracy, index) => {
        if (accuracy > 0.7 && accuracy > selectedAccuracy) {
            selectedIndex = index;
            selectedAccuracy = accuracy;
        }
        finalResult.push({ index, accuracy, name: jsonData[index].name, description: jsonData[index].description })
    });
    document.getElementById('leafName').innerHTML = finalResult[selectedIndex].name
    document.getElementById('leafAccuracy').innerHTML = "Accuracy : " + finalResult[selectedIndex].accuracy*100 + " %"
    document.getElementById('leafDescription').innerHTML = "Description : " + finalResult[selectedIndex].description
    return finalResult;
}

function populateTable(data){
    $("#resultTbl").empty();
    $("#resultTbl").append(
      "<thead><th>Index</th><th>Name</th><th>Accuracy</th></thead><tbody>"
    );
    data.forEach(row => {
        $("#resultTbl").append(
            "<tr><td>" +
              row.index +
              "</td><td>" +
              row.name +
              "</td><td>" +
              row.accuracy +
              "</td></tr>"
          );
    });
    $("#resultTbl").append("</tbody>");
}
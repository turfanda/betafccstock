var apikey;
var asd;

function getapikey() {
    $.ajax({
        url: "/apikey",
        type: "get",
        success: function(data) {
            apikey = data;
        }
    });

}

$(function() {
 if (!apikey)
        getapikey();

      $("#stockCreateForm").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "get",
            url: "https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols="+$('#stockCreateForm').children().val() + "&apikey=" + apikey,
            success: function(response) {
                $("input").val("");
                $(".resultDiv").empty();
                console.log(response);
              asd=response;
            },
            error: function(err) {
                $(".resultDiv").empty();
                $(".resultDiv").append(err.responseText);
            }
        });
    });
});
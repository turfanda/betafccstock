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
        
        let result={};
        
        $.ajax({
            type: "get",
            url: "https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols="+$('#stockCreateForm').children().val() + "&apikey=" + apikey,
            success: function(response) {
              result.stock=$('#stockCreateForm').children().val().toUpperCase();
              result.price=response["Stock Quotes"][0]["2. price"];
              $.ajax({
                type:"post",
                url:"/api/stock-prices",
                data:$('#stockCreateForm').serialize(),
                success: function(data) {
                console.log(data);
                }

              
              });

            },
            error: function(err) {
                $(".resultDiv").empty();
                $(".resultDiv").append(err.responseText);
            }
        });
    });
  
        $("#stockCompareForm").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "get",
            url: "https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols="+$('#stockCompareForm').children().val()+","+$("#stockCompareForm").children().eq(1).val() + "&apikey=" + apikey,
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
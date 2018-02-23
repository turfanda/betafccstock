var apikey;

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

  https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=MSFT,FB,AAPL&apikey='+process.env.ALPHA_API_KEY,
  
  
    $.ajax({
                url: "https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols="dataName + "&apikey=" + apikey,
                type: "get",
                success: function(data) {
                    stockVal=controlStockVal(stockVal, data, "add_with_obj");
                    $(".stockZone").append(drawStock(dataName));
                    chartyap(stockVal);
                }
            });
  
});
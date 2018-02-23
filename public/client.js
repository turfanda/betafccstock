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
        if(response["Stock Quotes"].length!==0){
          result.stock=$('#stockCreateForm').children().val().toUpperCase();
          result.price=response["Stock Quotes"][0]["2. price"];
          $.ajax({
            type:"post",
            url:"/api/stock-prices",
            data:$('#stockCreateForm').serialize(),
            success: function(data) {
              result.like=data;
              $(".resultDiv").empty();
              var ResultDiv = $("<div>");
              ResultDiv.append($("<div>").addClass("infoDiv").html("<p><em><b>Stock Name :</b></em>" + result.stock + "</p><p><em><b>Stock Price :</b></em>" + result.price +"<p><em><b>Stock Like :</b></em>"+ result.like));
              $(".resultDiv").append(ResultDiv);
            },
            error: function(err) {
              $(".resultDiv").empty();
              $(".resultDiv").append(err.responseText);
            }
          });
        }
        else{
          $(".resultDiv").empty();
          $(".resultDiv").append("invalid stock code");
        }
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
        if(response["Stock Quotes"].length!==2){
          $(".resultDiv").empty();
          $(".resultDiv").append("invalid stock code");
        }
        else{
          let result={};
          result.stock1=$('#stockCompareForm').children().val().toUpperCase();
          result.price1=response["Stock Quotes"][0]["2. price"];
          result.stock2=$('#stockCompareForm').children().eq(1).val().toUpperCase();
          result.price2=response["Stock Quotes"][1]["2. price"];
          $.ajax({
            type:"post",
            url:"/api/stock-prices-compare",
            data:$('#stockCompareForm').serialize(),
            success: function(data) {
              console.log(data);
              $(".resultDiv").empty();
              var ResultDiv = $("<div>");
              ResultDiv.append($("<div>").addClass("infoDiv").html("<p><em><b>Stock Name :</b></em>" + result.stock + "</p><p><em><b>Stock Price :</b></em>" + result.price +"<p><em><b>Stock Like :</b></em>"+ result.like));
              $(".resultDiv").append(ResultDiv);
            },
            error: function(err) {
              $(".resultDiv").empty();
              $(".resultDiv").append(err.responseText);
            }
          });
        }
      },
      error: function(err) {
        $(".resultDiv").empty();
        $(".resultDiv").append(err.responseText);
      }
    });
  });
});
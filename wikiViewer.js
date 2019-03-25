$(document).ready(function() {
    $('.form').submit(function() {
      $('#res').html(" ");
      fetchApi();
      return false;
    })
    $("#query").keypress(function(event) {
      if(event.which == 13) {
        $('#res').html(" ");  
        fetchApi();
      };
    });
    $("#search").on("click", function(){
        $('#res').html(" ");  
        fetchApi();
    });

function fetchApi() {
    var queryTerm = $("#query").val();
    var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+queryTerm+"&callback=?";
    $.ajax({
      url:url,
      type: 'POST',
      dataType: 'jsonp',
      success: function(result) {
        var data = result.query.pages;
        render(data);
      },
      error: function(err) {
        console.log(err);
        alert('Oops, something is amiss! Please try again.');
      }
    });
  }

  function render(data) {
    var pageurl="https://en.wikipedia.org/?curid=";
    for(var i in data) {
      $('#res').append("<div id='resultdiv'><a target='_blank' href='"+pageurl+data[i].pageid+"'><h3>"+data[i].title+"</h3><p>"+data[i].extract+"</p></a></div>");
    }
  }
});

$(document).ready(function() {

  var request = "",
    api = "";

  function wikiThat() {
    $.getJSON(api, function(json) {

      var list = json['query']['search'];
      
      if (list.length > 0) {
        list.forEach(function(listing) {
          $("#wiki-list").append("<li class='list-group-item'><a href='http://en.wikipedia.org/wiki/" + listing['title'] + "' target='_blank' rel='noopener noreferrer'><h4>" + listing['title'] + "</h4><p>" + listing['snippet'] + "</p></a></li>");
        }); //end json.foreach
      } else {
        $("#wiki-list").append("<li class='list-group-item'><h3>Nothing came up... try something else...</h3></li>");
      }

    }); //end getJSON
  }

  $("#search-field").keydown(function(event) {
    if (event.which == 13) {
      request = $("#search-field").val();

      $("#search-field").val("");

      if (request !== "") {
        api = "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&list=search&utf8=1&srsearch=" + request.replace(/\s/g, "%20") + "&origin=*";

        wikiThat();

        $("#search-section").addClass("hide");
        $("#results-section").removeClass("hide");

      }

    }
  }); //end #search-form submit
  
  $("#search-field").focusin(function(){
    $("#magnifying-glass").addClass("glass-focus");
  });
  $("#search-field").focusout(function(){
    $("#magnifying-glass").removeClass("glass-focus");
  });

  $("#results-close").click(function() {
    $("#wiki-list").html("");
    $("#results-section").addClass("hide");
    $("#search-section").removeClass("hide");
  });

}); //document ready
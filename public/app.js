
  
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        Notes: $("#Notes").val(),
    
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#Notes").empty();
      });
  

  });
  

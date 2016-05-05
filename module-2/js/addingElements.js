$(function() {
  $('#new-element').val('<div id="demo"></div');
  $('#target-id').val('starter');
  updateButtons();

  $('input:text').on('input', updateButtons);

  $('.btn').click(function() {
    // Reset the ending HTML
    resetHtml();
    // Clear the starting HTML
    $('#html-content-starting').empty();
    // Make a copy of the 'before' state
    $beforeRun = $('#html-content').clone();
    // Run the code
    eval($(this).text());
    // Make a copy of the 'after' state
    $startingHtml = $('#html-content').clone();
    // Prettify the 'after' state
    displayHtml('#html-content');
    // Create and prettify the before state
    $('#html-content-starting').append($beforeRun.children());
    displayHtml('#html-content-starting');
    // Display the code that was executed
    $('#output').text($(this).text());
  });
});

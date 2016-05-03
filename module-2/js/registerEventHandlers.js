$(function() {
  // display the ids and classes on buttons
  updateButtonDisplay();

  // execute the code inside the pre element when clicked
  $('pre').one('click', function() {
    var codeBlock = $(this);

    // eval will run a string as JavaScript
    eval(codeBlock.text());

    // Update the display
    codeBlock.append('<div class="text-center"><strong>code executed</strong></div>');
    codeBlock.removeClass('code').addClass('code-executed');


    updateButtonDisplay();
  });
});

function appendDisplay() {
  // Get a jQuery wrapper for the clicked button
  var button = $(this);
  // Find the item with the display class
  var display = button.nextAll('.display');
  // Add a new list item with text Clicked
  display.append('<li>Clicked</li>');
}

function updateButtonDisplay() {
  $('button').each(function() {
    var button = $(this);
    button.empty();

    // if there's an ID, display it
    if(this.id.length > 0) button.append('#' + this.id);

    // retrieve all classes
    var classes = button.attr('class');

    // remove any Bootstrap classes
    $.each(classes.split(' '), function() {
      if(this.indexOf('btn') == -1) button.append('<div>.' + this + '</div>')
    });
  });
};

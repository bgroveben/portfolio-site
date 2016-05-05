// Begin HTML display utilities file:
var $startingHtml = null;
$(function() {
  // Grab a copy of the initial state.
  $startingHtml = $('#html-content').clone();
  displayHtml();
});

function resetHtml() {
  // Replace the current content with a copy of the initial state
  $('#html-content').replaceWith($startingHtml.clone());
}

function displayHtml(data) {
  // default to the entire group
  if (data === undefined) data = '#html-content';

  // loop through all data
  $.each($(data).children(), function() {
    createHtml(this);
  });
}

function createHtml(element) {
  // ensure it's a jQuery object
  element = $(element);

  // if there are children, recurse
  if (element.children().length > 0) {
    displayHtml(element);
  }

  var startingTag = element.prop('outerHTML').substring(0, element.prop('outerHTML').indexOf('>') + 1);
  var tagName = '';
  if (startingTag.indexOf(' ') > -1)
    tagName = startingTag.substring(1, startingTag.indexOf(' '));
  else
    tagName = startingTag.substring(1, startingTag.indexOf('>'));
  var formattedTag = '&lt;<span class="tag">' + tagName + '</span>attributes&gt;';

  var attributesString = '';
  $.each(element.prop('attributes'), function() {
    attributesString += ' ' + this.nodeName + '=';
    attributesString += '<span class="attribute-value">"' + this.nodeValue + '"</span>';
  });

  startingTag = formattedTag.replace('attributes', attributesString);
  element.prepend(startingTag);
  element.append(formattedTag.replace('attributes', '').replace('&lt;', '&lt;/'));

  element.css('padding-left', '20px');
}

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

function updateButtons() {
  var newElement = $('#new-element').val().replace("'", '"');
  var targetId = $('#target-id').val();

  $('#btn-before').text("$('#" + targetId + "').before('" + newElement + "');");
  $('#btn-insertBefore').text("$('" + newElement + "').insertBefore('#" + targetId + "');");

  $('#btn-after').text("$('#" + targetId + "').after('" + newElement + "');");
  $('#btn-insertAfter').text("$('" + newElement + "').insertAfter('#" + targetId + "');");

  $('#btn-prepend').text("$('#" + targetId + "').prepend('" + newElement + "');");
  $('#btn-prependTo').text("$('" + newElement + "').prependTo('#" + targetId + "');");

  $('#btn-append').text("$('#" + targetId + "').append('" + newElement + "');");
  $('#btn-appendTo').text("$('" + newElement + "').appendTo('#" + targetId + "');");
}

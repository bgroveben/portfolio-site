// This code will display the html tags of the code in your browser
// Perfect for those who are too lazy to open their developer tools and view the elements
// Make sure that the parent element of the code you wish to display has an ID of 'html-content'
// This code is cloned from Christopher Harrison's CodePen titled 'HTML display utilities' http://codepen.io/GeekTrainer/pen/xGBvYK

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
  if(data === undefined) data = '#html-content';

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
  if(startingTag.indexOf(' ') > -1)
    tagName = startingTag.substring(1, startingTag.indexOf(' '));
  else
    tagName = startingTag.substring(1, startingTag.indexOf('>'));
  var formattedTag = '&lt;<span class="tag">' + tagName + '</span>attributes&gt;';

  attributesString = '';
  $.each(element.prop('attributes'), function() {
    attributesString += ' ' + this.nodeName + '=';
    attributesString += '<span class="attribute-value">"' + this.nodeValue + '"</span>';
  });

  startingTag = formattedTag.replace('attributes', attributesString);
  element.prepend(startingTag);
  element.append(formattedTag.replace('attributes', '').replace('&lt;', '&lt;/'));

  element.css('padding-left', '20px');
}

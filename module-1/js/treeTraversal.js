// This code comes courtesy of Christopher Harrison and can be found at http://codepen.io/GeekTrainer/pen/xGBvYK?editors=0010
// Let's write some code to display the HTML on our demo page.
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
  // default to the entire group of HTML elements
  if(data === undefined) data = '#html-content';
  // loop through all data
  $.each($(data).children(), function() {
    createHtml(this);
  });
}

function createHtml(element) {
  // ensure it's a jQuery object
  element = $(element);
  // if there are children, use recursion to iterate through them
  if (element.children().length > 0) {
    displayHtml(element);
  }

  var startingTag = element.prop('outerHTML').substring(0, element.prop('outerHTML').indexOf('>') + 1);
  var tagName = '';
  if(startingTag.indexOf(' ') > -1) {
    tagName = startingTag.substring(1, startingTag.indexOf(' '));
  } else {
    tagName = startingTag.substring(1, startingTag.indexOf('>'));
  }
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

// Now we write some code that will highlight the HTML elements jQuery interacts with when their designated buttons are clicked.
$(function() {
  $('#next-button').click(function() {
    resetHtml();
    $('#target').next().addClass('highlight');
    displayHtml();
  })
  $('#prev-button').click(function() {
    resetHtml();
    $('#target').prev().addClass('highlight');
    displayHtml();
  })

  $('#next-all-button').click(function() {
    resetHtml();
    $('#target').nextAll().addClass('highlight');
    displayHtml();
  })
  $('#prev-all-button').click(function() {
    resetHtml();
    $('#target').prevAll().addClass('highlight');
    displayHtml();
  })

  $('#next-until-button').click(function() {
    resetHtml();
    $('#target').nextUntil('.flag').addClass('highlight');
    displayHtml();
  })
  $('#prev-until-button').click(function() {
    resetHtml();
    $('#target').prevUntil('.flag').addClass('highlight');
    displayHtml();
  })
});

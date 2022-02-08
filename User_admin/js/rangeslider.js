

$(function() {

  // Initiate Slider
  $('#slider-range').slider({
    range: true,
    min: 0,
    max: 100,
    step: 20,
    values: [0, 40]
  });

  // Move the range wrapper into the generated divs
  $('.ui-slider-range').append($('.range-wrapper'));

  // Apply initial values to the range container



    rangeWidth = $('.ui-slider-range').css('width');


  // Prevent the range container from moving the slider
  $('.range, .range-alert').on('mousedown', function(event) {
    event.stopPropagation();
  });

});



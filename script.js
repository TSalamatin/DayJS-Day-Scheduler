// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var today = dayjs()


$(document).ready(function () {

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $('.btn').click(function(){
         
    console.log($(this).closest("[id^='hour-']").attr('id'))
    localStorage.setItem($(this).closest("[id^='hour-']").attr('id'), ($(this).siblings(".description").val()))
  })

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?  
  $('.time-block').each(function() {
    
    //Grab the ID and slice off hour- to get the number
    var listedTime = parseInt($(this).attr('id').slice(5))
    console.log(listedTime + " Listed hour")
    // Grab the current Hour
    var currentHour =
    parseInt(today.hour())
    console.log(currentHour + " Current Hour")
    //Compare the variables, and remove/apply classes as needed
    if (currentHour == listedTime) {
      $(this).removeClass("future")
      $(this).removeClass("past")
      $(this).addClass("present")

    } else if (currentHour < listedTime) {
      $(this).removeClass("present")
      $(this).removeClass("past")
      $(this).addClass("future")

    } else if (currentHour > listedTime) {
      $(this).removeClass("present")
      $(this).removeClass("future")
      $(this).addClass("past")
    } 
    
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
    
    var hourDesc = $(this).closest("[id^='hour-']").find('.description');
    $(hourDesc).val(localStorage.getItem($(this).closest("[id^='hour-']").attr('id')));
    console.log($(hourDesc).val());
   
  //localStorage.getItem($(this).closest("[id^='hour-']").attr('id'))
  // TODO: Add code to display the current date in the header of the page.
  $('#currentDay').text(today.format('MMM D, YYYY'))
  })();
});

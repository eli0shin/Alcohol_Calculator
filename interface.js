//Adds a drink to the drunk and drinks array and displays drunk values on page
function addNewDrunk(name, percentage, vol){
  var drinkNames = "";
  addDrunk(name, percentage, vol);
  for(var i = 0; i < drunk.length; i++){
    if (drinkNames.length < 2) drinkNames += drunk[i].drink;
    else drinkNames += '<div>' + drunk[i].drink;
    drinkNames += ' : ' + drunk[i].number + '</div>';
    $('#display-data').html(drinkNames);
    displayDrinkList();
  }
}
//called when new drink form is submitted grabs data from form and passes to addNewDrunk, clears form
function addNewDrink() {
  addNewDrunk($('#new-drink-name').val(), $('#new-drink-percent').val(), $('#new-drink-volume').val());
  $.ajax({
	  type: 'POST',
	  url: 'drinks.php',
	  data: { "drinkName" : $('#new-drink-name').val(), "alcoholPercent" : $('#new-drink-percent').val(), "drinkVolume" : $('#new-drink-volume').val()},
	  success: function() { console.log('ajax success'); },
	  error: function () { console.log('ajax error'); }
  });
  $('#new-drink-name').val('');
  $('#new-drink-percent').val('');
  $('#new-drink-volume').val('');
}
//display values from drinks array as buttons to add drinks
function displayDrinkList(){
  var drinkList = '';
  $.each(drinks, function(){
    drinkList += '<li id ="' + this.drink + '">' + this.drink + '</li>';
  });
  $('#drink-list').html(drinkList);
  $('#drink-list li').click(function(){addNewDrunk(this.id)});
}

//form event handlers
$('#submit').click(addNewDrink);
$('#custom-drink').on('keydown', function(){if (event.keyCode == 13) addNewDrink()});
//display drink lists on load
$(displayDrinkList());

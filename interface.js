function addNewDrink() {
  addNewDrunk($('#new-drink-name').val(), $('#new-drink-percent').val(), $('#new-drink-volume').val());
  $('#new-drink-name').val('');
  $('#new-drink-percent').val('');
  $('#new-drink-volume').val('');
}
$('#submit').click(addNewDrink);
$('#custom-drink').on('keydown', function(){if (event.keyCode == 13) addNewDrink()});

/*  for (var i = 0; i < drinks.length; i++) {
    $('#drink-list').innerHTML += '<li id="' + drinks[i].drink + '">' + drinks[i].drink + '</li>';
    $('#' + drinks[i].drink).addEventListener('click', addNewDrunk(drinks[i].drink));
  }*/


function addNewDrunk(name, percentage, vol){
  var drinkNames = "";
  addDrunk(name, percentage, vol);
  for(var i = 0; i < drunk.length; i++){
    if (drinkNames.length < 2) drinkNames += drunk[i].drink;
    else drinkNames += '<div>' + drunk[i].drink;
    drinkNames += ' : ' + drunk[i].number + '</div>';
    $('#display-data').html(drinkNames);
  }
}

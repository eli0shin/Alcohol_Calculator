function $(identifier) {
    if (identifier.charAt(0) == "#") {
        return document.getElementById(identifier.slice(1));
    } else if (identifier.charAt(0) == ".") {
        return document.getElementsByClassName(identifier.slice(1));
    } else {
        return document.getElementsbyTagName(identifier);
    }
}

function addNewDrink() {
  addNewDrunk($('#new-drink-name').value, $('#new-drink-percent').value, $('#new-drink-volume').value);
  $('#new-drink-name').value = '';
  $('#new-drink-percent').value = '';
  $('#new-drink-volume').value = '';
}
$('#submit').addEventListener('click', addNewDrink);
$('#custom-drink').addEventListener('keydown', function(){if (window.event.keyCode == 13) addNewDrink();});

/*  for (var i = 0; i < drinks.length; i++) {
    $('#drink-list').innerHTML += '<li id="' + drinks[i].drink + '">' + drinks[i].drink + '</li>';
    $('#' + drinks[i].drink).addEventListener('click', addNewDrunk(drinks[i].drink));
  }*/

function addNewDrunk(name, percentage, vol){
  var drinkNames = "";
  addDrunk(name, percentage, vol);
  for(var i = 0; i < drunk.length; i++){
    if (drinkNames.length < 2) drinkNames += drunk[i].drink;
    else drinkNames += ', ' + drunk[i].drink;
    drinkNames += ' : ' + drunk[i].number;
  }
  $('#display-data').innerHTML= drinkNames;
}

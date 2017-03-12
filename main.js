var drunk = [];
var drinks = [];
//get drinks list from server and populate array then diaplay drinks list
$.get('drinks.php', function(data, status) {
    if (status === 'success') {
        drinks = JSON.parse(data);
				displayDrinkList();
    } else {
      	console.log('could not retreive drink list');
    }
});
//form event handlers
$('#submit').click(addNewDrink);
$('#custom-drink').on('keydown', function() {
    if (event.keyCode == 13) addNewDrink();
});
$('#compare-drinks').click(compare);
//called when new drink form is submitted grabs data from form adds it to drinks database, and passes it to addNewDrunk, clears form
function addNewDrink() {
  var name = $('#new-drink-name').val();
  var type = $('#new-drink-type').val();
  var percent = $('#new-drink-percent').val();
  var volume = $('#new-drink-volume').val();
    //check form is filled out completely or contains drink name that is in drinks array
    if (( name === '' ||
            percent === '' ||
             volume === '') &&
        (isNewDrink(drinks, name.toString()) === false)) {
        $('#form-error').text('Please fill out the form');
    } else {
        addNewDrunk(name, type, percent, volume);
        if (percent !== '' && volume !== '') {
          $.ajax({
              type: 'POST',
              url: 'drinks.php',
              data: {
                  "drinkName": name,
                  "drinkType": type,
                  "alcoholPercent": percent,
                  "drinkVolume": volume
              },
              error: function() {
                  console.log('ajax error');
              }
          });
        }
        $('#new-drink-name').val('');
        $('#new-drink-percent').val('');
        $('#new-drink-volume').val('');
        $('#form-error').text('');
        displayDrinkList();
    }
}
//Adds a drink to the drunk and drinks array and displays drunk values on page
function addNewDrunk(name, type, percent, vol) {
    var drinkNames = "";
    addDrunk(name, type, percent, vol);
    for (var i = 0; i < drunk.length; i++) {
        drinkNames += '<div>' + drunk[i].drinkName + ' : ' + drunk[i].number + '</div>';
        $('#display-data').html(drinkNames);
        displayDrinkList();
    }
}
//display values from drinks array as buttons to add drinks
function displayDrinkList() {
    var drinkList = '';
    $.each(drinks, function() {
        drinkList += '<li id ="' + this.drinkName + '">' + this.drinkName + '</li>';
    });
    $('#drink-list').html(drinkList);
    $('#form-error').text('');
    $('#drink-list li').click(function() {
        addNewDrunk(this.id);
      });
}
//check if inputted drink is present in drinks array
function isNewDrink(arr, name) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].drinkName === name) {
            return [true, i];
        }
    }
    return false;
}
//add drink to drunk array
function addDrunk(name, type, percent, vol) {
    var drunkBool = isNewDrink(drunk, name);
    var drinkBool = isNewDrink(drinks, name);
    if (drunkBool[0]) {
        drunk[drunkBool[1]].number++;
    } else if (drinkBool[0]) {
        drunk.push(drinks[drinkBool[1]]);
        drunk[drunk.length - 1].number = 1;
    } else {
        drunk.push({
            "drinkName": name,
            "drinkType": type,
            "alcoholPercent": percent,
            "drinkVolume": vol,
            "number": 1
        });
        drinks.push({
            "drinkName": name,
            "drinkType": type,
            "alcoholPercent": percent,
            "drinkVolume": vol,
        });
    }
}
//Compare alcohol content of all drinks drunk and return drink equivalency object
function compare() {

    var tac = 0;
    var otherDrinks = [];
    var equiv = 0;

    for (var i = 0; i < drunk.length; i++) {
        tac += drunk[i].number * (drunk[i].alcoholPercent / 100) * drunk[i].drinkVolume;
    }

    for (var b = 0; b < drinks.length; b++) {
        equiv = tac / (drinks[b].alcoholPercent / 100 * drinks[b].drinkVolume);
        otherDrinks.push({
            "drinkName": drinks[b].drinkName,
            "number": equiv.toString().slice(0, 3)
        });
    }
    console.log(otherDrinks);
    return otherDrinks;
}

function standardDrink(){
  var tac = 0;

  /*for (var i = 0; i < drunk.length; i++) {
      tac += drunk[i].number * (drunk[i].alcoholPercent / 100) * drunk[i].drinkVolume;
  }*/
  $.each(drunk, function() {
    tac += this.number * (this.alcoholPercent / 100) * this.drinkVolume;
  });
  return (tac / 0.6).toString().slice(0,4);
}

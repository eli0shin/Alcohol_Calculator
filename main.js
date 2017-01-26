var drunk = [];
var drinks = [];
//get drinks list from server and populate array then diaplay drinks list
$.get("drinks.php", function(data, status) {
    if (status === 'success') {
        drinks = JSON.parse(data);
				displayDrinkList();console.log(drinks);
    } else {
      	console.log('could not retreive drink list');
    }
});

function addDrink(name, percentage, vol) {
    drinks.push({
        "drinkName": name,
        "alcoholPercent": percentage,
        "drinkVolume": vol
    });
    cosnole.log('addDrink');
}

function isNewDrink(arr, name) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].drinkName === name) {
            return [true, i];
        }
    }
    return false;
}

function addDrunk(name, percentage, vol) {
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
            "alcoholPercent": percentage,
            "drinkVolume": vol,
            "number": 1
        });
        drinks.push({
            "drinkName": name,
            "alcoholPercent": percentage,
            "drinkVolume": vol
        });
    }
}

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
    return otherDrinks;
}

var drunk = [];
var drinks = [
	{
		drink : 'wine',
		percent : 10,
		volume : 6
	},
	{
		drink : 'beer',
		percent : 5,
		volume : 12
	},
	{
		drink : 'whiskey',
		percent : 40,
		volume : 1.5
	}
	];
function addDrink(name, percentage, vol) {
 drinks.push({drink : name, percent : percentage, volume : vol});	
}

function isNewDrink(arr, name) {
	for(var i= 0; i < arr.length; i++) {
		if (arr[i].drink === name) {
			return [true, i];
		}
	}
	return false;
}

function addDrunk (name, percentage, vol) {
	var drunkBool = isNewDrink(drunk, name);
	var drinkBool = isNewDrink(drinks, name);
	if (drunkBool[0]) {
		drunk[drunkBool[1]].number++;
	}  else if (drinkBool[0]) {
		drunk.push(drinks[drinkBool[1]]);
		drunk[drunk.length - 1].number  = 1;
	}else {
		drunk.push({drink : name, percent : percentage, volume : vol, number : 1});
		drinks.push({drink : name, percent : percentage, volume : vol});
	}
}

function compare () {
	
	var tac = 0;
	var otherDrinks = [];
	var equiv = 0;
	
	for(var i = 0; i < drunk.length; i++) {
		tac += drunk[i].number * (drunk[i].percent / 100) * drunk[i].volume;
	}

	for(var b = 0; b < drinks.length; b++) {
		equiv = tac / (drinks[b].percent / 100 * drinks[b].volume);
		otherDrinks.push({drink : drinks[b].drink, number : equiv.toString().slice(0,3)});
	}
	return otherDrinks;
}
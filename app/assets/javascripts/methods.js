
//titleize function
String.prototype.titleize = function() {
  var words = this.split(' ');
  var array = [];
  for (var i=0; i<words.length; ++i) {
    array.push(words[i].charAt(0).toUpperCase() + words[i].toLowerCase().slice(1));
  }
  return array.join(' ');
};

//returns a string that describes the median income
function medianIncome(data, hood, city, state){
  var hoodMedianIncome = parseInt(data[2]["tables"]['table'][0]["data"]["attribute"][0]["values"]["neighborhood"]["value"]);
  var cityMedianIncome = parseInt(data[2]["tables"]["table"][0]["data"]["attribute"][0]["values"]["city"]["value"]);
  var nationMedianIncome =  parseInt(data[2]["tables"]["table"][0]["data"]["attribute"][0]["values"]["nation"]["value"]);

  var hoodvscityMedianIncome
  if(hoodMedianIncome < cityMedianIncome){
    hoodvscityMedianIncome = parseInt(Math.floor(((cityMedianIncome - hoodMedianIncome)/cityMedianIncome)*100)) + "% less"
  }else{
    hoodvscityMedianIncome = parseInt(Math.floor(((hoodMedianIncome - cityMedianIncome)/cityMedianIncome)*100)) + "% more"
  }
  var hoodvsnationMedianIncome
  if(hoodMedianIncome < nationMedianIncome){
    hoodvsnationMedianIncome = parseInt(Math.floor(((nationMedianIncome - hoodMedianIncome)/nationMedianIncome)*100)) + "% less"
  }else{
    hoodvsnationMedianIncome = parseInt(Math.floor(((hoodMedianIncome - nationMedianIncome)/nationMedianIncome)*100)) + "% more"
  }


  var compareMedianIncome = "The median household income of " + hood + " is " + hoodvscityMedianIncome + " than " + city + " and " + hoodvsnationMedianIncome + " than the nation."
  return compareMedianIncome
}

function homesWithKids(data, hood, city, state){
  var hoodHWK = parseFloat(data[2]["tables"]["table"][0]["data"]["attribute"][4]["values"]["neighborhood"]["value"]);
  var cityWK = parseFloat(data[2]["tables"]["table"][0]["data"]["attribute"][4]["values"]["city"]["value"]);
  var nationHWK =  parseFloat(data[2]["tables"]["table"][0]["data"]["attribute"][4]["values"]["nation"]["value"]);
  debugger
  var hoodvscityWK
  if(hoodHWK < cityWK){
    hoodvscityWK = parseInt(Math.floor(((cityWK - hoodHWK)/cityWK)*100)) + "% less"
  }else{
    hoodvscityWK = parseInt(Math.floor(((hoodHWK - cityWK)/cityWK)*100)) + "% more"
  }
  var hoodvsnationHWK
  if(hoodHWK < nationHWK){
    hoodvsnationHWK = parseInt(Math.floor(((nationHWK - hoodHWK)/nationHWK)*100)) + "% less"
  }else{
    hoodvsnationHWK = parseInt(Math.floor(((hoodHWK - nationHWK)/nationHWK)*100)) + "% more"
  }


  var compareHWK = "The number of household with kids in " + hood + " is " + hoodvscityWK + " than " + city + " and " + hoodvsnationHWK + " than the nation."
  return compareHWK
}

$(function() {
  $('#pills a').on('click', function(e) {
    e.preventDefault();
    $(this).tab('show');
    $(this).addClass('active');
   });
 });

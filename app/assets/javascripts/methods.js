

    //returns a string that describes the median income
    function medianIncome(data, city, hood, state){
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

  $(function() {
    $('#pills a').on('click', function(e) {
      e.preventDefault();
      $(this).tab('show');
      $(this).addClass('active');
     });
   });

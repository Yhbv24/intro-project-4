//*****BACK-END*****

function Pizza(crust, toppings, size) {
  this.crust = crust;
  this.toppings = toppings;
  this.size = size;
  this.price = 0;
};

Pizza.prototype.price = function() { // Builds price for pizza based on customer's selections
  if (pizzaSize === "small") {
    this.price = 8;
  } else if (pizzaSize === "medium") {
    this.price = 11;
  } else {
    this.price = 14;
  }

  if (pizzaCrust = "gluten_free") { // Adds 50¢ for the gluten-free option
    this.price += .5
  };

  for (var i = 1; i < this.toppings.length; i++) { // Checks how many toppings the pizza has, but skips the option for no toppings
    this.price += .75 * [i]
  };

  return this.price
};

//*****FRONT-END*****

$(function() {
  $("#pizza_submit").submit(function(event) {
    event.preventDefault();

    var pizzaCrust = $("#crust_style").val();
    var pizzaToppings = [];
    var pizzaSize = $("input[name=\"size\"]:checked");

    $.each($("input[name=\"toppings\"]:checked"), function() { // Adds checked toppings to pizzaToppings array
      pizzaToppings.push($(this).val());
    });


  });
});

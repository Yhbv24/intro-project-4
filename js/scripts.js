//*****BACK-END*****

function Pizza(crust, toppings, size) {
  this.crust = crust;
  this.toppings = toppings;
  this.size = size;
};

Pizza.prototype.price = function() { // Builds price for pizza based on customer's selections
  this.price = 0;

  if (this.size === "small") {
    this.price += 8
  } else if (this.size === "medium") {
    this.price += 11
  } else if (this.size === "large") {
    this.price += 14
  };

  if (this.crust === "gluten_free") { // Adds 50¢ for the gluten-free option
    this.price += .5
  };

  this.price += .75 * this.toppings.length; // Adds 75¢ for each ingredient

  return this.price;
};

Pizza.prototype.capitalize = function() {
  return this.crust.charAt(0).toUpperCase() + this.slice(1);
};

//*****FRONT-END*****

$(function() {
  $("#pizza_submit").submit(function(event) {
    event.preventDefault();

    var pizzaCrust = $("#crust_style").val();
    var pizzaToppings = [];
    var pizzaSize = $("input[name=size]:checked").val();

    $.each($("input[name=toppings]:checked"), function() { // Adds checked toppings to pizzaToppings array
      pizzaToppings.push($(this).val());
    });

    var newPizzaOrder = new Pizza(pizzaCrust, pizzaToppings, pizzaSize);
    var newPizzaPrice = newPizzaOrder.price();

    $("#menu").fadeOut(500);
    $("#receipt_list").append("<li>" + newPizzaOrder.capitalize() + "</li>")
    $("#receipt").fadeIn(500);
  });
});

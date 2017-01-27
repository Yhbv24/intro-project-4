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

var sizeChecker = function(pizzaSize) { // Checks to see whether the customer picked a pizza size
  if (!pizzaSize) {
    alert("Please make sure to choose a size before moving forward.")
    stopLoad; // Purposely causing error to prevent form from being submitted; error will not matter if user selects a size
  };
};

//*****FRONT-END*****

$(function() {
  $("#pizza_submit").submit(function(event) {
    event.preventDefault();

    var pizzaCrust = $("#crust_style").val();
    var pizzaToppings = [];
    var pizzaSize = $("input[name=size]:checked").val();

    sizeChecker(pizzaSize);

    $.each($("input[name=toppings]:checked"), function() { // Adds checked toppings to pizzaToppings array
      pizzaToppings.push($(this).val());
    });

    var newPizzaOrder = new Pizza(pizzaCrust, pizzaToppings, pizzaSize);
    var newPizzaPrice = newPizzaOrder.price();

    $("#menu").hide();
    $("#receipt_div").fadeIn(500);

    if (pizzaCrust === "gluten_free") {
      $("#output_crust").append("<li>Gluten-Free</li>")
    } else {
      $("#output_crust").append("<li>" + newPizzaOrder.crust + "</li>")
    };

    $("#output_size").append("<li>" + newPizzaOrder.size + "</li>");

    if (newPizzaOrder.toppings.length === 0) {
      $("#output_toppings").append("<li>You didn't choose any toppings.</li>");
    } else {
      newPizzaOrder.toppings.forEach(function(topping) { // Displays each topping in the array as its own LI
        $("#output_toppings").append("<li>" + topping + "</li>");
      });
    };

    $("#total_price").text("$" + newPizzaOrder.price.toFixed(2)); // Outputs total price of pizza selection
  });
});

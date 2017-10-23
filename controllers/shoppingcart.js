'use strict';
var TableController = rootRequire('controllers/table');
var Shoppingcart = rootRequire('models/shoppingcart');

class ShoppingcartController extends TableController {
  constructor(){
    var shoppingcart = new Shoppingcart();
    super(shoppingcart);
  }
}

module.exports = ShoppingcartController;

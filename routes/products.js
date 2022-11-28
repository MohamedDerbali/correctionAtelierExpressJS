var express = require("express");

var router = express.Router();
const products = require("../products.json");
/* GET home page. */
router.get("/", function (req, res, next) {
  try {
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
router.get("/:id", function(req, res, next) {
  const { id } = req.params;
  res.status(200).json(products[id]);
})
router.get("/instock/:qt", function(req, res, next) {
  const {qt} = req.params;
  let productsInStock = [];
  for(i in products){
    if(products[i].stock >= qt){
      productsInStock.push(products[i]); 
    }
  }
  res.status(200).json(productsInStock);
})
router.get("/:id/:qt", function(req, res, next) {
const { id, qt } = req.params;
const selectedProduct = products[id];
console.log(selectedProduct)
let productToBuy = {
  id: id,
  qt: parseInt(qt),
  unit_price: parseInt(selectedProduct.price),
  total_price: parseInt(selectedProduct.price * qt),
}
res.status(200).json(productToBuy)
});

module.exports = router;

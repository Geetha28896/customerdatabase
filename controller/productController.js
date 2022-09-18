const fs = require("fs");
const { v4: uuid4 } = require("uuid");
const { response } = require("../app");
const utils = require("../utils/task-schema");

exports.getProducts = function (req, res) {
  try {
    fs.readFile("./products.json", "utf-8", (err, data) => {
      if (err) return console.log(err);

      let products = JSON.parse(data);

      res.send(products);
    });
  } catch (e) {
    console.log(e.message);
  }
};
exports.createProducts = function (req, res) {
  try {
    const id = uuid4();

    const { product_name, price, available_quantity, description, offers } =
      req.body;

    //console.log(Object.getOwnPropertyNames(req.body).length + "req");

    if (Object.getOwnPropertyNames(req.body).length != 5)
      return res
        .status(400)
        .send("The Request field not Match please Enter valid Input!");

    const myProduct = {
      productId: id,
      product_name: product_name,
      price: parseFloat(price).toFixed(2),
      available_quantity: available_quantity,
      description: description,
      offers: offers,
    };

    fs.readFile("products.json", "utf-8", function (err, data) {
      let object = JSON.parse(data);

      // console.log(myProduct.length+"my");
      // console.log(data.length+"data");
      // console.log(object.length+"obj");
      object.push(myProduct);

      fs.writeFile(
        "products.json",
        JSON.stringify(object, null, 2),
        function (err) {
          if (err) return console.log(err);
          res.send("Products added successfully!!");
          res.end();
        }
      );
    });
  } catch (e) {
    console.log(e.message);
  }
};

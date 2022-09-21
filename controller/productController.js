const fs = require("fs");
const Joi = require("joi");
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

    //console.log(Object.getOwnPropertyNames(req.body).length + "req");

    //console.log(req.body+"reqBody");

    if (Object.getOwnPropertyNames(req.body).length != 5)
      return res
        .status(400)
        .send("The Request field does not Match please Enter valid Input!");
    // const { error }=utils.validateTask1(req.body);
    // if(error) return res.status(400).send('The Request field does not Match please Enter valid Input!')
    const myProduct = {
      productId: id,
      product_name: req.body.product_name,
      price: req.body.price,
      available_quantity: req.body.available_quantity,
      description: req.body.description,
      offers: req.body.offers,
    };

    fs.readFile("products.json", "utf-8", function (err, data) {
      let object = JSON.parse(data);

      object.push(myProduct);

      fs.writeFile(
        "products.json",
        JSON.stringify(object, null, 2),
        function (err) {
          if (err) return console.log(err);
          res.status(200).send(object);
          //res.send("Products added successfully!!");
          res.end();
        }
      );
    });
  } catch (e) {
    console.log(e.message);
  }
};

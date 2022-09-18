const fs = require("fs");
const timestamp = require("time-stamp");
const utils = require("../utils/task-schema");

exports.getOrders = function (req, res) {
  try {
    fs.readFile("./orders.json", "utf-8", (err, data) => {
      if (err) return console.log(err);

      let orders = JSON.parse(data);
      res.send(orders);
    });
  } catch (e) {
    console.log(e.message);
  }
};

//generate orders

exports.createOrders = function (req, res) {
  try {
    const { userId, productId, quantity } = req.body;

    if (Object.getOwnPropertyNames(req.body).length != 3)
      return res
        .status(400)
        .send("The Request field not Match please Enter valid Input!");

    

    fs.readFile("orders.json", "utf-8", function (err, data) {
      if (err) return console.log(err);
      let obj = JSON.parse(data);

      const sortByDate = (obj) => {
        const sorter = (a, b) => {
          return (
            new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
          );
        };
        obj.sort(sorter);
      };
      sortByDate(obj);
      // console.log(obj[0].orderId);

      const myOrders = {
        userId: userId,
        orderId: obj[0].orderId + 1,
        productId: productId,
        quantity: quantity,
        timeStamp: timestamp.utc("YYYY/MM/DD:HH:mm:ss"),
      };

      fs.readFile("orders.json", "utf-8", function (err, data) {
        if (err) return console.log(err);
        let objectOrd = JSON.parse(data);
  

      fs.readFile("products.json", "utf-8", function (err, data) {
        if (err) return console.log(err);

        let objectProd = JSON.parse(data);
        let currIndexProd = objectProd.findIndex(
          (data) => data.productId == myOrders.productId
        );
        
        // console.log(
        //   objectProd[currIndexProd].available_quantity + "quantity"
        // );

        if (objectProd[currIndexProd].available_quantity >= myOrders.quantity) {
          objectProd[currIndexProd].available_quantity =
            objectProd[currIndexProd].available_quantity - myOrders.quantity;

          myOrders.orderPrice = Number.parseFloat(
            objectProd[currIndexProd].price * myOrders.quantity
          ).toFixed(2);

          objectOrd.push(myOrders);

          fs.writeFile(
            "products.json",
            JSON.stringify(objectProd, null, 2),
            function (err) {
              if (err) return console.log(err);

              fs.writeFile(
                "orders.json",
                JSON.stringify(objectOrd, null, 2),
                function (err) {
                  if (err) return console.log(err);
                  res.send("orders added successfully!!");
                  res.end();
                }
              );
            }
          );
        } else {
          res.status(403).send({
            msg:
              "Sorry!! Minimum Order Quantity Only Available Here /n Available Quantity : " +
              objectProd[currIndexProd].available_quantity,
          });
        }
      });
    });

    });
  } catch (e) {
    console.log(e.message);
  }
};

//getUserById
exports.getOrdersByID = function (req, res) {
  try {
    let id = req.params.id;
    fs.readFile("orders.json", "utf-8", function (err, data) {
      let object = JSON.parse(data);
      let ordersId = object.filter((data) => data.userId == id);
      //console.log(ordersId);

      if (ordersId.length == 0)
        return res.send("The User data with the provided Id does not Exist!!");
      res.send(ordersId);
    });
  } catch (e) {
    console.log(e.message);
  }
};

//get user details and product details

exports.allUserDetails = function (req, res) {
  try {
    let id = req.params.id;
    fs.readFile("orders.json", "utf-8", function (err, data) {
      if (err) return console.log(err.message);
      let objOrder = JSON.parse(data);
      fs.readFile("products.json", "utf-8", function (err, data) {
        if (err) return console.log(err.message);
        const objProduct = JSON.parse(data);
        const userData = objOrder.filter((data) => data.userId == id);

        let total = 0;
        let result = 0;
        for (let i = 0; i < userData.length; i++) {
          total = total + Number(userData[i].orderPrice);
          result = Number.parseFloat(total).toFixed(2);
        }
        let userProductDetails = userData.map((userProduct) => {
          userProduct.productDetails = objProduct.find((prod) => {
            if (prod.productId == userProduct.productId) {
              return prod;
            }
          });
          return userProduct;
        });

        //userProductDetails.push("TotalBillAmount= " + result);
        //console.log(userProductDetails.length+"val");
        if (userProductDetails.length == 0)
        return res.send("The User data with the provided Id does not Exist!!");
        res.send(200,userProductDetails);
        res.end();
      });
    });
  } catch (e) {
    console.log(e.message);
  }
};

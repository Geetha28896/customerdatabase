const chai = require("chai");
const chaiHttp = require("chai-http");
const { array } = require("joi");
const server = require("../app");

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe("REST APIS", () => {
  /**
   * Get API for Products
   */

  describe("GET /products/", () => {
    it("It should Get all the Products ", (done) => {
      chai
        .request(server)
        .get("/products")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(2);
          done();
        });
    });

    it("It should Not Get all the Products ", (done) => {
      chai
        .request(server)
        .get("/prod")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Get API for orders
   */

  describe("GET /orders/", () => {
    it("It should Get all the Orders ", (done) => {
      chai
        .request(server)
        .get("/orders")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });

    it("It should Not Get all the Orders ", (done) => {
      chai
        .request(server)
        .get("/order")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Get orderBy Id API
   */

  describe("GET /orders/:id", () => {
    it("It should GET a Orders by UserID ", (done) => {
      const uId = 102;
      chai
        .request(server)
        .get("/orders/" + uId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          const result = response.body;

          result
            .map((e) => e.userId)
            .every((userId) => userId.should.equal(102));
          result.map((e) => e.should.have.property("userId"));
          result.map((e) => e.should.have.property("orderId"));
          result.map((e) => e.should.have.property("productId"));
          result.map((e) => e.should.have.property("quantity"));
          result.map((e) => e.should.have.property("timeStamp"));
          result.map((e) => e.should.have.property("orderPrice"));

          done();
        });
    });

    it("It should  Not GET a Orders by UserID ", (done) => {
      const uId = 123;
      chai
        .request(server)
        .get("/orders/" + uId)
        .end((err, response) => {
          response.text.should.be.eq(
            "The User data with the provided Id does not Exist!!"
          );

          done();
        });
    });
  });

  // /**
  //  * POST API for Products
  //  */

  describe("POST /products/", () => {
    it("It should POST a new field in Products ", (done) => {
      const myProduct = {
        product_name: "keyboard",
        price: 500.0,
        available_quantity: 30,
        description: "Zeb-4, color-black, keyboard-External",
        offers: [
          "First User Offers: 20%",
          "Sunday Offers: 10%",
          "Great Indian Festival Sale Offers 50%",
        ],
      };
      //console.log(myProduct);
      chai
        .request(server)
        .post("/products")
        .send(myProduct)
        .end((err, response) => {
          response.text.should.be.eq("Products added successfully!!");
          done();
        });
    });

    it("It should NOT POST a new field in Products Some fields are missing ", (done) => {
      const myProduct = {
        //product_name: "keyboard",
        price: 500.0,
        available_quantity: 30,
        description: "Zeb-4, color-black, keyboard-External",
        offers: [
          "First User Offers: 20%",
          "Sunday Offers: 10%",
          "Great Indian Festival Sale Offers 50%",
        ],
      };
      //console.log(myProduct);
      chai
        .request(server)
        .post("/products")
        .send(myProduct)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq(
            "The Request field not Match please Enter valid Input!"
          );
          done();
        });
    });
  });

  /**
   * POST API for Orders
   */

  describe("POST /orders/", () => {
    it("It should POST a new field in orders ", (done) => {
      const myOrders = {
        userId: 103,
        productId: "687281a6-e845-4b6a-bb57-78afdeade57e",
        quantity: 3,
      };
      //console.log(myOrders);
      chai
        .request(server)
        .post("/orders")
        .send(myOrders)
        .end((err, response) => {
          response.text.should.be.eq("orders added successfully!!");
          done();
        });
    });
    it("It should Not POST a new field in orders ", (done) => {
      const myOrders = {
        //  userId: 103,
        productId: "687281a6-e845-4b6a-bb57-78afdeade57e",
        quantity: 3,
      };
      //console.log(myOrders);
      chai
        .request(server)
        .post("/orders")
        .send(myOrders)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq(
            "The Request field not Match please Enter valid Input!"
          );
          done();
        });
    });
  });

  /**
   * Get orders by users Id includes products details
   */

  describe("GET /orders/users/:id", () => {
    it("It should GET a Orders by UserID which includes Product details", (done) => {
      const uId = 102;
      chai
        .request(server)
        .get("/orders/users/" + uId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          const result = response.body;

          // console.log(result[0].userId+"  idValue")

          result
            .map((e) => e.userId)
            .every((userId) => userId.should.equal(102));
          result.map((e) => e.should.have.property("userId"));
          result.map((e) => e.should.have.property("orderId"));
          result.map((e) => e.should.have.property("productId"));
          result.map((e) => e.should.have.property("quantity"));
          result.map((e) => e.should.have.property("timeStamp"));
          result.map((e) => e.should.have.property("orderPrice"));
          result.map((e) => e.should.have.property("productDetails"));

          done();
        });
    });

    it("It should  Not GET a Orders by UserID with includes Products details ", (done) => {
      const uId = 123;
      chai
        .request(server)
        .get("/orders/users" + uId)
        .end((err, response) => {
          response.text.should.be.eq(
            "The User data with the provided Id does not Exist!!"
          );

          done();
        });
    });
  });
});

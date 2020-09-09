//Improt externall packages - CommonJS
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { request } = require("http");
const { response } = require("express");

//Creating my server
const app = express();

// Install the body-parser middleware
//Allow us to read json from requests
app.use(bodyParser.json());

//Read in JSSON FILE (MOCK database)
let products = [];

try {
  products = JSON.parse(fs.readFileSync("products.json")).products;
} catch (error) {
  console.log("No existing file.");
}

//Defining our HTTP Resourse Methods
//API Endpoints
//Routes

//GET ALL PRODUCTS
//GET //api/prodeucts
app.get("/api/products", (request, response) => {
  response.send(products);
});

//GET A SPECIFIC PRODUCT BY ID
//GET /api/products/:id

//CREATE A NEW PRODUCT
//POST / api/products {id:"123", name:"Apples", price: 1.99}
app.post("/api/products", (request, response) => {
  //read the json body from the request
  const body = request.body;
  console.log(body);
  //validate the json body to have required properties
  /*Required Properties:
  -id
  -name
  -price
  */
  if (!body.id || !body.name || !body.price) {
    response.send("Bad request. Validation Error. Missing id,name or price!");
    return;
  }
  //add the new product to our existing products array

  products.push(body);

  //commit the new proudcts array to the data base(json file)
  const jsonPayLoad = {
    products,
  };
  fs.writeFileSync("products.json", JSON.stringify(jsonPayLoad));

  response.send();
});
//UPDATE EXISTING PRODUCT BY ID
//PUT /api/products/:id   {id:"123", name:"Apples", price: 5.99}

//DELETE EXISTING PRODUCT BY ID
//DELETE /api/products:id

//Starting My Server

app.listen(3000, () => {
  console.log("Grocery API Server Started!");
});

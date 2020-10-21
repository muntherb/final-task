module.exports = app => {
    const flights = require("../controllers/flight.controller.js");

    var router = require("express").Router();
  
    // Create a new flight
    router.post("/", flights.create);
  
    // Retrieve all flights
    router.get("/", flights.findAll);
  
    // Retrieve all taken off flights
    router.get("/takeoff", flights.findAlltakeoff);
  
    // Retrieve a single flight with id
    router.get("/:id", flights.findOne);
  
    // Update a flight with id
    router.put("/:id", flights.update);
  
    // Delete a flight with id
    router.delete("/:id", flights.delete);
  
    // Delete all flights
    router.delete("/", flights.deleteAll);
  
    app.use('/api/flights', router);
  };

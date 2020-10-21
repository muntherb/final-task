const db = require("../models");
const Flight = db.flights;
const Op = db.Sequelize.Op;

// Create and Save a new Flight
exports.create = (req, res) => {
  //Validate request first
  if (!req.body.flightN) {
      res.status(400).send({
          message: "Write a flight name!"
      });
      return;
  }
  //Create the flight
  const flight = {
      flightN: req.body.flightN,
      flightD: req.body.flightD,
      takeoff: req.body.takeoff ? req.body.takeoff: false,
      arrival: req.body.arrival
  };
  //Save flight in database
  Flight.create(flight)
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "Error occured while creating Flight."
        });
    });
};

// Retrieve all Flights from the database.
exports.findAll = (req, res) => {
    const flightN = req.query.flightN;
    var condition = flightN ? { flightN: { [Op.like]: `%${flightN}%` } } : null;

    Flight.findAll({ where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occured while trying to retrieve flights."
            });
        });
};


// Find a single Flight with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Flight.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Flight with id=" + id
      });
    });
};


// Update a Flight by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Flight.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Flight was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Flight with id=${id}. Maybe Flight was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Flight with id=" + id
      });
    });
};


// Delete a Flight with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Flight.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Flight was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Flight with id=${id}. Maybe Flight was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Flight with id=" + id
        });
      });
  };


// Delete all Flights from the database.
exports.deleteAll = (req, res) => {
  const id = req.params.id;

  Flight.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Flights were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Flights."
      });
    });
};

// Find all taken off Flights
exports.findAlltakeoff = (req, res) => {
  Flight.findAll({ where: { takeoff: true }})
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Error while retrieving takenoff flights."
        })
    })
};
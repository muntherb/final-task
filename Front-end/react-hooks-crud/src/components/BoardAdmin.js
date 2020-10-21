import React, { useState } from "react";
import FlightDataService from "../services/FlightService";

const AddFlight = () => {
  const initialFlightState = {
    id: null,
    flightN: "",
    flightD: "",
    takeoff: false
  };
  const [flight, setFlight] = useState(initialFlightState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFlight({ ...flight, [name]: value });
  };

  const saveFlight = () => {
    var data = {
      flightN: flight.flightN,
      flightD: flight.flightD
    };

    FlightDataService.create(data)
      .then(response => {
        setFlight({
          id: response.data.id,
          flightN: response.data.flightN,
          flightD: response.data.flightD,
          takeoff: response.data.takeoff
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newFlight = () => {
    setFlight(initialFlightState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newFlight}>
            Add
              </button>
        </div>
      ) : (
          <div>
            <div className="form-group">
              <label htmlFor="flightN">Flight number:</label>
              <input
                type="text"
                className="form-control"
                id="flightN"
                required
                value={flight.flightN}
                onChange={handleInputChange}
                name="flightN"
              />
            </div>

            <div className="form-group">
              <label htmlFor="flightD">Flight Description</label>
              <input
                type="text"
                className="form-control"
                id="flightD"
                required
                value={flight.flightD}
                onChange={handleInputChange}
                name="flightD"
              />
            </div>

            <button onClick={saveFlight} className="btn btn-success">
              Submit
              </button>
          </div>
        )}
    </div>
  );
};

export default AddFlight;